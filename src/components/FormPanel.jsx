import React from 'react';

export default function FormPanel({ formData, setFormData }) {
  const platforms = ['Android', 'iOS'];
  const elementTypes = ['Button', 'Input', 'TextView'];
  const locatorStrategies = ['id', 'xpath', 'accessibilityId'];
  const actions = ['click', 'sendKeys', 'clear'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid gap-4 p-4 bg-white rounded shadow">
      <select name="platform" onChange={handleChange} value={formData.platform} className="p-2 border rounded">
        {platforms.map(p => <option key={p}>{p}</option>)}
      </select>
      <select name="elementType" onChange={handleChange} value={formData.elementType} className="p-2 border rounded">
        {elementTypes.map(e => <option key={e}>{e}</option>)}
      </select>
      <select name="locator" onChange={handleChange} value={formData.locator} className="p-2 border rounded">
        {locatorStrategies.map(l => <option key={l}>{l}</option>)}
      </select>
      <select name="action" onChange={handleChange} value={formData.action} className="p-2 border rounded">
        {actions.map(a => <option key={a}>{a}</option>)}
      </select>
      <input name="value" placeholder="Locator value" onChange={handleChange} value={formData.value} className="p-2 border rounded" />
    </div>
  );
}