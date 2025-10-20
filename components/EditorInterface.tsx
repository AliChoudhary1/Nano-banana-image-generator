
import React from 'react';
import type { ImageFile } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface EditorInterfaceProps {
  originalImage: ImageFile;
  editedImage: string | null;
  currentPrompt: string;
  setCurrentPrompt: (prompt: string) => void;
  generatedPrompts: string[];
  onGeneratePrompts: () => void;
  onEditImage: () => void;
  onReset: () => void;
  isLoading: boolean;
  loadingMessage: string;
  error: string | null;
}

const EditorInterface: React.FC<EditorInterfaceProps> = ({
  originalImage,
  editedImage,
  currentPrompt,
  setCurrentPrompt,
  generatedPrompts,
  onGeneratePrompts,
  onEditImage,
  onReset,
  isLoading,
  loadingMessage,
  error,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-grow">
      {/* Control Panel */}
      <div className="flex flex-col space-y-6 bg-base-200 p-6 rounded-lg shadow-xl">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-white">Editing Controls</h2>
          <button
            onClick={onReset}
            className="text-sm bg-gray-600 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Start Over
          </button>
        </div>

        <div>
          <img src={originalImage.base64} alt="Original" className="w-48 h-48 object-cover rounded-lg mx-auto shadow-md" />
        </div>
        
        {/* Prompt Generation */}
        <div className="space-y-3">
          <h3 className="font-semibold text-lg">Don't know where to start?</h3>
          <button
            onClick={onGeneratePrompts}
            disabled={isLoading}
            className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            {isLoading && loadingMessage === 'Generating creative ideas...' ? 'Generating...' : '✨ Get AI Prompt Ideas'}
          </button>
          {generatedPrompts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              {generatedPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPrompt(prompt)}
                  className="text-left text-sm p-2 bg-base-300 hover:bg-brand-primary rounded-md transition-colors text-gray-300"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Prompt Input */}
        <div className="flex-grow flex flex-col space-y-3">
          <label htmlFor="prompt-input" className="font-semibold text-lg">
            Your Editing Prompt
          </label>
          <textarea
            id="prompt-input"
            rows={4}
            value={currentPrompt}
            onChange={(e) => setCurrentPrompt(e.target.value)}
            placeholder="e.g., 'Add a robot cat sitting on the roof'"
            className="w-full p-3 bg-base-300 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition text-gray-200"
          />
        </div>

        <button
          onClick={onEditImage}
          disabled={isLoading || !currentPrompt.trim()}
          className="w-full bg-gradient-to-r from-brand-primary to-brand-secondary text-white font-extrabold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading && loadingMessage === 'Applying AI magic...' ? 'Editing...' : 'Apply Magic Edit'}
        </button>
        
        {error && <p className="text-red-400 text-center font-semibold">{error}</p>}
      </div>

      {/* Result Display */}
      <div className="bg-base-200 p-6 rounded-lg shadow-xl flex items-center justify-center relative min-h-[400px] lg:min-h-0">
        {isLoading && <LoadingSpinner message={loadingMessage}/>}
        {!editedImage && !isLoading && (
          <div className="text-center text-gray-400">
            <h3 className="text-2xl font-bold">Your masterpiece awaits...</h3>
            <p className="mt-2">The edited image will appear here.</p>
          </div>
        )}
        {editedImage && (
          <img
            src={editedImage}
            alt="Edited"
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default EditorInterface;
