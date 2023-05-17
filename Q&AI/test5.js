const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Desmos Calculator Tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should display the line y = x - 1', async () => {
    await driver.get('https://www.desmos.com/calculator');

    // Enter line y = x - 1 in the input field
    const inputField = await driver.findElement(By.css('.dcg-expressionarea textarea'));
    await inputField.sendKeys('y=x-1', Key.RETURN);

    // Wait for the line to be displayed
    const lineElement = await driver.wait(until.elementLocated(By.css('.dcg-graph-inner .dcg-graph-layer .dcg-movable .dcg-line.dcg-unselectable')), 10000);

    // Verify line equation and position
    const lineText = await lineElement.getAttribute('aria-label');
    expect(lineText).to.equal('y = x - 1');
    
    const linePath = await lineElement.getAttribute('d');
    expect(linePath).to.match(/M-\d+,-\d+L\d+,\d+/);
  });
});
