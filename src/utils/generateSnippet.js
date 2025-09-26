export function generateSnippet(formData) {
  const { platform, elementType, locator, action, language, value, textInput, direction, xCoord, yCoord, waitType, timeout } = formData;
  
  const templates = {
    javascript: generateJavaScript,
    python: generatePython
  };

  return templates[language]?.(formData) || 'Unsupported language';
}

function generateJavaScript(formData) {
  const { platform, elementType, locator, action, value, textInput, direction, xCoord, yCoord, waitType, timeout } = formData;
  
  if (isDeviceAction(action)) {
    return getDeviceActionCode(action, 'javascript', formData);
  }
  
  if (isGestureAction(action)) {
    return getGestureCode(action, 'javascript', formData);
  }
  
  if (action === 'waitForElement') {
    return getWaitCode('javascript', formData);
  }
  
  const element = `await driver.${getLocatorMethod(locator, 'javascript')}("${value}")`;
  return getActionCode(action, element, 'javascript', textInput);
}

function generatePython(formData) {
  const { platform, elementType, locator, action, value, textInput, direction, xCoord, yCoord, waitType, timeout } = formData;
  
  if (isDeviceAction(action)) {
    return getDeviceActionCode(action, 'python', formData);
  }
  
  if (isGestureAction(action)) {
    return getGestureCode(action, 'python', formData);
  }
  
  if (action === 'waitForElement') {
    return getWaitCode('python', formData);
  }
  
  const element = `driver.${getLocatorMethod(locator, 'python')}("${value}")`;
  return getActionCode(action, element, 'python', textInput);
}


function getLocatorMethod(locator, language) {
  const methods = {
    javascript: {
      id: 'findElementById',
      xpath: 'findElementByXPath',
      accessibilityId: 'findElementByAccessibilityId',
      className: 'findElementByClassName',
      name: 'findElementByName',
      uiAutomator: 'findElementByAndroidUIAutomator',
      iOSPredicate: 'findElementByIosNsPredicate'
    },
    python: {
      id: 'find_element_by_id',
      xpath: 'find_element_by_xpath',
      accessibilityId: 'find_element_by_accessibility_id',
      className: 'find_element_by_class_name',
      name: 'find_element_by_name',
      uiAutomator: 'find_element_by_android_uiautomator',
      iOSPredicate: 'find_element_by_ios_predicate'
    }
  };

  return methods[language]?.[locator] || 'findElement';
}

function getActionCode(action, element, language, textInput) {
  const actions = {
    javascript: {
      click: `${element}.click();`,
      sendKeys: `${element}.sendKeys("${textInput || 'text'}");`,
      getText: `const text = await ${element}.getText();`,
      clear: `${element}.clear();`,
      isDisplayed: `const isVisible = await ${element}.isDisplayed();`,
      longPress: `await driver.touchAction([{ action: 'longPress', element: ${element} }]);`,
      doubleTap: `await driver.touchAction([{ action: 'tap', element: ${element} }, { action: 'tap', element: ${element} }]);`
    },
    python: {
      click: `${element}.click()`,
      sendKeys: `${element}.send_keys("${textInput || 'text'}")`,
      getText: `text = ${element}.text`,
      clear: `${element}.clear()`,
      isDisplayed: `is_visible = ${element}.is_displayed()`,
      longPress: `driver.long_press(${element})`,
      doubleTap: `driver.tap(${element}, 2)`
    }
  };

  return actions[language]?.[action] || `${element}.${action}();`;
}

function isDeviceAction(action) {
  return ['hideKeyboard', 'pressBack', 'shake', 'rotate'].includes(action);
}

function isGestureAction(action) {
  return ['swipe', 'scroll', 'pinch', 'zoom'].includes(action);
}

function getDeviceActionCode(action, language, formData) {
  const deviceActions = {
    javascript: {
      hideKeyboard: 'await driver.hideKeyboard();',
      pressBack: 'await driver.pressKeyCode(4);',
      shake: 'await driver.shake();',
      rotate: 'await driver.rotate("LANDSCAPE");'
    },
    python: {
      hideKeyboard: 'driver.hide_keyboard()',
      pressBack: 'driver.press_keycode(4)',
      shake: 'driver.shake()',
      rotate: 'driver.orientation = "LANDSCAPE"'
    }
  };
  
  return deviceActions[language]?.[action] || `driver.${action}();`;
}

function getGestureCode(action, language, formData) {
  const { direction, xCoord, yCoord } = formData;
  
  const gestures = {
    javascript: {
      swipe: `await driver.swipe(${xCoord || 100}, ${yCoord || 100}, ${xCoord || 200}, ${yCoord || 200}, 1000);`,
      scroll: `await driver.scroll("${direction || 'down'}");`,
      pinch: 'await driver.pinch();',
      zoom: 'await driver.zoom();'
    },
    python: {
      swipe: `driver.swipe(${xCoord || 100}, ${yCoord || 100}, ${xCoord || 200}, ${yCoord || 200}, 1000)`,
      scroll: `driver.scroll(direction="${direction || 'down'}")`,
      pinch: 'driver.pinch()',
      zoom: 'driver.zoom()'
    }
  };
  
  return gestures[language]?.[action] || `driver.${action}();`;
}

function getWaitCode(language, formData) {
  const { waitType, timeout, locator, value } = formData;
  const timeoutValue = timeout || 10;
  
  const waits = {
    javascript: {
      implicit: `await driver.implicitlyWait(${timeoutValue * 1000});`,
      explicit: `const element = await driver.waitForElement("${locator}", "${value}", ${timeoutValue * 1000});`,
      fluent: `const element = await driver.waitUntil(async () => { return await driver.findElement("${locator}", "${value}"); }, { timeout: ${timeoutValue * 1000} });`
    },
    python: {
      implicit: `driver.implicitly_wait(${timeoutValue})`,
      explicit: `element = WebDriverWait(driver, ${timeoutValue}).until(EC.presence_of_element_located((By.${locator.toUpperCase()}, "${value}")))`,
      fluent: `element = WebDriverWait(driver, ${timeoutValue}).until(lambda d: d.find_element_by_${locator}("${value}"))`
    }
  };
  
  return waits[language]?.[waitType] || waits[language]?.explicit;
}