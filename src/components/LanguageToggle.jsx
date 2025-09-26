export default function LanguageToggle({ language, setLanguage, onAddPanel }) {
  return (
    <div className="flex gap-2 p-2 justify-between items-center">
      <div className="flex gap-2">
        <button onClick={() => setLanguage('javascript')} className={`px-4 py-2 rounded ${language === 'javascript' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>JavaScript</button>
        <button onClick={() => setLanguage('python')} className={`px-4 py-2 rounded ${language === 'python' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Python</button>
      </div>
      <button onClick={onAddPanel} className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 font-bold">+</button>
    </div>
  );
}