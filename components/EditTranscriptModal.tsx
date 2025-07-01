
import React, { useState, useEffect } from 'react';
import { BUTTON_PRIMARY_CLASS, BUTTON_SECONDARY_CLASS, INPUT_CLASS, BRAND_CONFIG } from '../constants';
import { XMarkIcon } from './icons/ActionIcons';

interface EditTranscriptModalProps {
  isOpen: boolean;
  initialTranscript: string;
  onClose: () => void;
  onProcess: (transcript: string) => void;
}

export const EditTranscriptModal: React.FC<EditTranscriptModalProps> = ({ isOpen, initialTranscript, onClose, onProcess }) => {
  const [editedTranscript, setEditedTranscript] = useState(initialTranscript);

  useEffect(() => {
    setEditedTranscript(initialTranscript);
  }, [initialTranscript, isOpen]); // Reset if initialTranscript changes or modal reopens

  if (!isOpen) return null;

  const handleSubmit = () => {
    onProcess(editedTranscript);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-gray-800 p-6 rounded-lg shadow-2xl w-full max-w-lg text-gray-200 transform transition-all duration-300 scale-100 opacity-100">
        <div className={`flex justify-between items-center mb-4 pb-3 border-b border-[${BRAND_CONFIG.colors.primary}]`}>
          <h2 className={`text-xl font-semibold text-[${BRAND_CONFIG.colors.primary}]`}>Edit Voice Transcript</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-400 transition-colors">
            <XMarkIcon className="w-7 h-7" />
          </button>
        </div>

        <p className="text-sm text-gray-300 mb-3">
          Review and edit the transcribed text below before processing it to populate the invoice.
        </p>

        <textarea
          value={editedTranscript}
          onChange={(e) => setEditedTranscript(e.target.value)}
          rows={8}
          className={`${INPUT_CLASS} mb-6 bg-gray-700 border-gray-600 focus:ring-[${BRAND_CONFIG.colors.primary}] focus:border-[${BRAND_CONFIG.colors.primary}]`}
          placeholder="Your transcribed text will appear here..."
        />

        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className={BUTTON_SECONDARY_CLASS}>
            Cancel
          </button>
          <button onClick={handleSubmit} className={BUTTON_PRIMARY_CLASS}>
            Process Text
          </button>
        </div>
      </div>
    </div>
  );
};
