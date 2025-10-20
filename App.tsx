
import React, { useState, useCallback } from 'react';
import { ImageFile } from './types';
import { generateEditingPrompts, editImageWithNanoBanana } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import EditorInterface from './components/EditorInterface';
import WelcomeScreen from './components/WelcomeScreen';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [generatedPrompts, setGeneratedPrompts] = useState<string[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setOriginalImage({
        base64: base64String,
        mimeType: file.type,
        name: file.name,
      });
      setEditedImage(null);
      setGeneratedPrompts([]);
      setCurrentPrompt('');
      setError(null);
    };
    reader.onerror = () => {
      setError('Failed to read the image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleGeneratePrompts = useCallback(async () => {
    setIsLoading(true);
    setLoadingMessage('Generating creative ideas...');
    setError(null);
    try {
      const prompts = await generateEditingPrompts();
      setGeneratedPrompts(prompts);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleEditImage = useCallback(async () => {
    if (!originalImage || !currentPrompt.trim()) {
      setError('Please upload an image and provide a prompt.');
      return;
    }
    setIsLoading(true);
    setLoadingMessage('Applying AI magic...');
    setError(null);
    setEditedImage(null);
    try {
      // The Gemini API requires the base64 string without the data URL prefix
      const base64Data = originalImage.base64.split(',')[1];
      const newImage = await editImageWithNanoBanana(base64Data, originalImage.mimeType, currentPrompt);
      setEditedImage(newImage);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, currentPrompt]);

  const handleReset = () => {
    setOriginalImage(null);
    setEditedImage(null);
    setGeneratedPrompts([]);
    setCurrentPrompt('');
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col">
        {!originalImage ? (
          <WelcomeScreen>
            <ImageUploader onImageUpload={handleImageUpload} />
          </WelcomeScreen>
        ) : (
          <EditorInterface
            originalImage={originalImage}
            editedImage={editedImage}
            currentPrompt={currentPrompt}
            setCurrentPrompt={setCurrentPrompt}
            generatedPrompts={generatedPrompts}
            onGeneratePrompts={handleGeneratePrompts}
            onEditImage={handleEditImage}
            onReset={handleReset}
            isLoading={isLoading}
            loadingMessage={loadingMessage}
            error={error}
          />
        )}
      </main>
    </div>
  );
};

export default App;
