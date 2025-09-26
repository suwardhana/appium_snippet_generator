import { useState, useEffect } from "react";
import FormPanel from "./components/FormPanel.jsx";
import SnippetOutput from "./components/SnippetOutput.jsx";
import LanguageToggle from "./components/LanguageToggle.jsx";
import { generateSnippet } from "./utils/generateSnippet";

function App() {
  const [formPanels, setFormPanels] = useState([
    {
      elementType: "Button",
      locator: "id",
      action: "click",
      value: "",
    },
  ]);
  const [collapsedPanels, setCollapsedPanels] = useState<boolean[]>([]);

  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");

  const addPanel = () => {
    setFormPanels([
      ...formPanels,
      {
        elementType: "Button",
        locator: "id",
        action: "click",
        value: "",
      },
    ]);
    setCollapsedPanels([
      ...Array(formPanels.length).fill(true),
      false,
    ]);
  };

  const removePanel = (index: number) => {
    const updated = formPanels.filter((_, i) => i !== index);
    setFormPanels(updated);
    const updatedCollapsed = collapsedPanels.filter((_, i) => i !== index);
    setCollapsedPanels(updatedCollapsed);
  };

  const updateFormData = (index: number, newData: any) => {
    const updated = [...formPanels];
    updated[index] = newData;
    setFormPanels(updated);
  };

  const toggleCollapse = (index: number) => {
    const updated = [...collapsedPanels];
    updated[index] = !updated[index];
    setCollapsedPanels(updated);
  };

  useEffect(() => {
    const snippets = formPanels.map((formData) =>
      generateSnippet({ ...formData, language })
    );
    setCode(snippets.join("\n\n"));
  }, [formPanels, language]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-gray-100 p-6">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Appium Test Snippet Generator
          </h1>
          <p className="text-gray-600">
            Generate mobile automation test code snippets
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <LanguageToggle
              language={language}
              setLanguage={setLanguage}
              onAddPanel={addPanel}
            />
            {formPanels.map((formData, index) => (
              <FormPanel
                key={index}
                formData={formData}
                setFormData={(newData: any) => updateFormData(index, newData)}
                index={index}
                isCollapsed={collapsedPanels[index] || false}
                onToggleCollapse={() => toggleCollapse(index)}
                onRemove={() => removePanel(index)}
                showRemove={formPanels.length > 1}
              />
            ))}
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
