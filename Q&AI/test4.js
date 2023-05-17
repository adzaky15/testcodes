const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Google Account Login Tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should log in with valid username and password', async () => {
    await driver.get('https://www.account.google.com/');

    // Enter username and password
    const emailField = await driver.findElement(By.css('#identifierId'));
    await emailField.sendKeys('your-valid-email@gmail.com', Key.RETURN);

    const passwordField = await driver.wait(until.elementLocated(By.css('#password input[name="password"]')), 10000);
    await passwordField.sendKeys('your-valid-password', Key.RETURN);

    // Wait for login to complete
    await driver.wait(until.urlIs('https://myaccount.google.com/'), 10000);

    // Verify login success
    const pageTitle = await driver.getTitle();
    expect(pageTitle).to.equal('Google Account');
  });

  it('should log in with valid username but wrong password', async () => {
    await driver.get('https://www.account.google.com/');

    // Enter username and wrong password
    const emailField = await driver.findElement(By.css('#identifierId'));
    await emailField.sendKeys('your-valid-email@gmail.com', Key.RETURN);

    const passwordField = await driver.wait(until.elementLocated(By.css('#password input[name="password"]')), 10000);
    await passwordField.sendKeys('your-wrong-password', Key.RETURN);

    // Wait for error message to display
    const errorMessage = await driver.wait(until.elementLocated(By.css('.o6cuMc')), 10000);

    // Verify error message
    const messageText = await errorMessage.getText();
    expect(messageText).to.equal('Wrong password. Try again or click Forgot password to reset it.');
  });

  it('should log in with invalid username', async () => {
    await driver.get('https://www.account.google.com/');

    // Enter invalid username
    const emailField = await driver.findElement(By.css('#identifierId'));
    await emailField.sendKeys('invalid-email', Key.RETURN);

    // Wait for error message to display
    const errorMessage = await driver.wait(until.elementLocated(By.css('.o6cuMc')), 10000);

    // Verify error message
    const messageText = await errorMessage.getText();
    expect(messageText).to.equal('Couldn\'t find your Google Account');
  });
});
