import { useState, useEffect } from "react";
import FormPanel from "./components/FormPanel.jsx";
import SnippetOutput from "./components/SnippetOutput.jsx";
import LanguageToggle from "./components/LanguageToggle.jsx";
import { generateSnippet } from "./utils/generateSnippet";

function App() {
  const [formData, setFormData] = useState({
    platform: "Android",
    elementType: "Button",
    locator: "id",
    action: "click",
    value: "",
  });

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(generateSnippet({ ...formData, language }));
  }, [formData, language]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Appium Test Snippet Generator</h1>
          <p className="text-gray-600">Generate mobile automation test code snippets</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <LanguageToggle language={language} setLanguage={setLanguage} />
            <FormPanel formData={formData} setFormData={setFormData} />
          </div>
          <div>
            <SnippetOutput code={code} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
