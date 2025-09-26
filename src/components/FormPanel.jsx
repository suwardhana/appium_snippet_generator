import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';

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
    <Card>
      <CardHeader className="cursor-pointer" onClick={onToggleCollapse}>
        <CardTitle className="flex justify-between items-center">
          Action {index + 1}
          <span className="text-sm">{isCollapsed ? '▼' : '▲'}</span>
        </CardTitle>
      </CardHeader>
      {!isCollapsed && (
        <CardContent className="space-y-4">

      <div className="space-y-2">
        <Label>Element Type</Label>
        <Select name="elementType" value={formData.elementType} onValueChange={(value) => setFormData({ ...formData, elementType: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {elementTypes.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Locator Strategy</Label>
          <Select name="locator" value={formData.locator} onValueChange={(value) => setFormData({ ...formData, locator: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {locatorStrategies.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Action</Label>
          <Select name="action" value={formData.action} onValueChange={(value) => setFormData({ ...formData, action: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {actions.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Locator Value</Label>
        <Input
          name="value"
          placeholder="Enter locator value"
          onChange={handleChange}
          value={formData.value}
        />
      </div>

      {needsText && (
        <div className="space-y-2">
          <Label>Text Input</Label>
          <Input
            name="textInput"
            placeholder="Text to send"
            onChange={handleChange}
            value={formData.textInput || ''}
          />
        </div>
      )}

      {isGestureAction && (
        <div className="space-y-2">
          <Label>Direction</Label>
          <Select name="direction" value={formData.direction || 'up'} onValueChange={(value) => setFormData({ ...formData, direction: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {gestureDirections.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      )}

      {needsCoordinates && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>X Coordinate</Label>
            <Input
              name="xCoord"
              type="number"
              placeholder="X"
              onChange={handleChange}
              value={formData.xCoord || ''}
            />
          </div>
          <div className="space-y-2">
            <Label>Y Coordinate</Label>
            <Input
              name="yCoord"
              type="number"
              placeholder="Y"
              onChange={handleChange}
              value={formData.yCoord || ''}
            />
          </div>
        </div>
      )}

      {isWaitAction && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Wait Type</Label>
            <Select name="waitType" value={formData.waitType || 'explicit'} onValueChange={(value) => setFormData({ ...formData, waitType: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {waitTypes.map(w => <SelectItem key={w} value={w}>{w}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Timeout (seconds)</Label>
            <Input
              name="timeout"
              type="number"
              placeholder="10"
              onChange={handleChange}
              value={formData.timeout || ''}
            />
          </div>
        </div>
      )}
        </CardContent>
      )}
    </Card>
  );
}