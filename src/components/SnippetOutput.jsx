import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

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
    <Card className="relative">
      <CardContent className="bg-gray-900 text-green-300 p-4 font-mono whitespace-pre-wrap break-all overflow-x-auto">
        {code}
      </CardContent>
      <Button 
        onClick={handleCopy}
        size="sm"
        className="absolute top-2 right-2"
      >
        {copied ? 'Copied!' : 'Copy'}
      </Button>
    </Card>
  );
}