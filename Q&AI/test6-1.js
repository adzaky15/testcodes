const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Trip.com Flight Search Tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should display one-way flights from Seoul to Tokyo from 6th June to 12th June', async () => {
    await driver.get('https://www.trip.com/flights/');

    // Enter one-way flight search criteria
    const fromInput = await driver.findElement(By.css('.js-flight-departure-airport'));
    await fromInput.sendKeys('Seoul', Key.RETURN);

    const toInput = await driver.findElement(By.css('.js-flight-arrival-airport'));
    await toInput.sendKeys('Tokyo', Key.RETURN);

    const departInput = await driver.findElement(By.css('.js-flight-departure-date'));
    await departInput.sendKeys('2022-06-06', Key.RETURN);

    const searchButton = await driver.findElement(By.css('.js-search-btn'));
    await searchButton.click();

    // Wait for search results to be displayed
    const resultsTitle = await driver.wait(until.elementLocated(By.css('.title-wrap h1')), 10000);

    // Verify search results
    const resultsText = await resultsTitle.getText();
    expect(resultsText).to.contain('One-way');
    expect(resultsText).to.contain('Seoul');
    expect(resultsText).to.contain('Tokyo');
    expect(resultsText).to.contain('6/12');
  });

  it('should display round-trip flights from Alaska to Kuala Lumpur from 6th June to 24th June', async () => {
    await driver.get('https://www.trip.com/flights/');

    // Enter round-trip flight search criteria
    const fromInput = await driver.findElement(By.css('.js-flight-departure-airport'));
    await fromInput.sendKeys('Alaska', Key.RETURN);

    const toInput = await driver.findElement(By.css('.js-flight-arrival-airport'));
    await toInput.sendKeys('Kuala Lumpur', Key.RETURN);

    const departInput = await driver.findElement(By.css('.js-flight-departure-date'));
    await departInput.sendKeys('2022-06-06', Key.RETURN);

    const returnInput = await driver.findElement(By.css('.js-flight-return-date'));
    await returnInput.sendKeys('2022-06-24', Key.RETURN);

    const searchButton = await driver.findElement(By.css('.js-search-btn'));
    await searchButton.click();

    // Wait for search results to be displayed
    const resultsTitle = await driver.wait(until.elementLocated(By.css('.title-wrap h1')), 10000);

    // Verify search results
    const resultsText = await resultsTitle.getText();
    expect(resultsText).to.contain('Round-trip');
    expect(resultsText).to.contain('Alaska');
    expect(resultsText).to.contain('Kuala Lumpur');
    expect(resultsText).to.contain('6/24');
  });

  it('should display one-way flights from Seoul to Hong Kong under $700', async () => {
    await driver.get('https://www.trip.com/flights/');

    // Enter one-way flight search criteria
    const fromInput = await driver.findElement(By.css('.js-flight-departure-airport'));
    await fromInput.sendKeys('Seoul', Key.RETURN);

    const toInput = await
