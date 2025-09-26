export function generateSnippet({ platform, elementType, locator, action, language, value }) {
  const templates = {
    javascript: generateJavaScript,
    python: generatePython
  };

  return templates[language]?.({ platform, elementType, locator, action, value }) || 'Unsupported language';
}

function generateJavaScript({ platform, elementType, locator, action, value }) {
  const element = `await driver.${getLocatorMethod(locator, 'javascript')}("${value}")`;
  return getActionCode(action, element, 'javascript');
}

function generatePython({ platform, elementType, locator, action, value }) {
  const element = `driver.${getLocatorMethod(locator, 'python')}("${value}")`;
  return getActionCode(action, element, 'python');
}


function getLocatorMethod(locator, language) {
  const methods = {
    javascript: {
      id: 'findElementById',
      xpath: 'findElementByXPath',
      accessibilityId: 'findElementByAccessibilityId',
      className: 'findElementByClassName',
      name: 'findElementByName'
    },
    python: {
      id: 'find_element_by_id',
      xpath: 'find_element_by_xpath',
      accessibilityId: 'find_element_by_accessibility_id',
      className: 'find_element_by_class_name',
      name: 'find_element_by_name'
    }
  };

  return methods[language]?.[locator] || 'findElement';
}

function getActionCode(action, element, language) {
  const actions = {
    javascript: {
      click: `${element}.click();`,
      sendKeys: `${element}.sendKeys("text");`,
      getText: `const text = await ${element}.getText();`,
      clear: `${element}.clear();`,
      isDisplayed: `const isVisible = await ${element}.isDisplayed();`
    },
    python: {
      click: `${element}.click()`,
      sendKeys: `${element}.send_keys("text")`,
      getText: `text = ${element}.text`,
      clear: `${element}.clear()`,
      isDisplayed: `is_visible = ${element}.is_displayed()`
    }
  };

  return actions[language]?.[action] || `${element}.${action}();`;
}