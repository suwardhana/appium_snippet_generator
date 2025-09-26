import React, { useState } from 'react';

export default function SnippetOutput({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative">
      <div className="bg-gray-900 text-green-300 p-4 rounded font-mono whitespace-pre-wrap break-all overflow-x-auto">
        {code}
      </div>
      <button 
        onClick={handleCopy}
        className="absolute top-2 right-2 px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}