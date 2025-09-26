import React from 'react';

export default function SnippetOutput({ code }) {
  return (
    <div className="bg-gray-900 text-green-300 p-4 rounded font-mono whitespace-pre">
      {code}
    </div>
  );
}