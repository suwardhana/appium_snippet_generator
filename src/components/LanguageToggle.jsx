export default function LanguageToggle({ language, setLanguage }) {
  return (
    <div className="flex gap-2 p-2">
      <button onClick={() => setLanguage('javascript')} className={`px-4 py-2 rounded ${language === 'javascript' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>JavaScript</button>
      <button onClick={() => setLanguage('python')} className={`px-4 py-2 rounded ${language === 'python' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Python</button>
    </div>
  );
}