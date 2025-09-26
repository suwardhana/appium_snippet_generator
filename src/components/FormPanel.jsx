import React, { useState } from 'react';

export default function FormPanel({ formData, setFormData, index, isCollapsed, onToggleCollapse }) {
  const elementTypes = ['Button', 'Input', 'TextView', 'Image', 'Switch', 'Slider'];
  const locatorStrategies = ['id', 'xpath', 'accessibilityId', 'className', 'name', 'uiAutomator', 'iOSPredicate'];
  const actions = [
    'click', 'sendKeys', 'clear', 'getText', 'isDisplayed',
    'swipe', 'scroll', 'longPress', 'doubleTap', 'pinch', 'zoom',
    'hideKeyboard', 'pressBack', 'shake', 'rotate', 'waitForElement'
  ];
  const waitTypes = ['implicit', 'explicit', 'fluent'];
  const gestureDirections = ['up', 'down', 'left', 'right'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isGestureAction = ['swipe', 'scroll', 'pinch', 'zoom'].includes(formData.action);
  const isWaitAction = formData.action === 'waitForElement';
  const needsText = ['sendKeys'].includes(formData.action);
  const needsCoordinates = ['swipe', 'longPress', 'doubleTap'].includes(formData.action);

  return (
    <div className="bg-white rounded-lg shadow-lg space-y-4">
      <div className="p-4 border-b cursor-pointer" onClick={onToggleCollapse}>
        <h2 className="text-xl font-semibold text-gray-800 flex justify-between items-center">
          Action {index + 1}
          <span className="text-sm">{isCollapsed ? '▼' : '▲'}</span>
        </h2>
      </div>
      {!isCollapsed && (
        <div className="p-6 space-y-4">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Element Type</label>
        <select name="elementType" onChange={handleChange} value={formData.elementType} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
          {elementTypes.map(e => <option key={e} value={e}>{e}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Locator Strategy</label>
          <select name="locator" onChange={handleChange} value={formData.locator} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            {locatorStrategies.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
          <select name="action" onChange={handleChange} value={formData.action} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            {actions.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Locator Value</label>
        <input
          name="value"
          placeholder="Enter locator value"
          onChange={handleChange}
          value={formData.value}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {needsText && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Text Input</label>
          <input
            name="textInput"
            placeholder="Text to send"
            onChange={handleChange}
            value={formData.textInput || ''}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      )}

      {isGestureAction && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
          <select name="direction" onChange={handleChange} value={formData.direction || 'up'} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            {gestureDirections.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      )}

      {needsCoordinates && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">X Coordinate</label>
            <input
              name="xCoord"
              type="number"
              placeholder="X"
              onChange={handleChange}
              value={formData.xCoord || ''}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Y Coordinate</label>
            <input
              name="yCoord"
              type="number"
              placeholder="Y"
              onChange={handleChange}
              value={formData.yCoord || ''}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}

      {isWaitAction && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Wait Type</label>
            <select name="waitType" onChange={handleChange} value={formData.waitType || 'explicit'} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              {waitTypes.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Timeout (seconds)</label>
            <input
              name="timeout"
              type="number"
              placeholder="10"
              onChange={handleChange}
              value={formData.timeout || ''}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      )}
        </div>
      )}
    </div>
  );
}