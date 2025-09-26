import { Button } from "./ui/button";

export default function LanguageToggle({ language, setLanguage, onAddPanel }) {
  return (
    <div className="flex gap-2 p-2 justify-between items-center">
      <div className="flex gap-2">
        <Button 
          onClick={() => setLanguage('javascript')} 
          variant={language === 'javascript' ? 'default' : 'outline'}
        >
          JavaScript
        </Button>
        <Button 
          onClick={() => setLanguage('python')} 
          variant={language === 'python' ? 'default' : 'outline'}
        >
          Python
        </Button>
      </div>
      <Button onClick={onAddPanel} size="icon">+</Button>
    </div>
  );
}