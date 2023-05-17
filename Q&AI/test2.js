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

  it('should search for a one-way flight from Seoul to Tokyo from 6th June to 12th June', async () => {
    await driver.get('https://www.trip.com/flights/');

    // Select one-way option
    const oneWayButton = await driver.findElement(By.css('#js-searchbox > div > div > div.flt-type > label:nth-child(2)'));
    await oneWayButton.click();

    // Enter departure and destination
    const departureField = await driver.findElement(By.css('#js-searchbox-from'));
    await departureField.sendKeys('Seoul', Key.RETURN);

    const destinationField = await driver.findElement(By.css('#js-searchbox-to'));
    await destinationField.sendKeys('Tokyo', Key.RETURN);

    // Select date range
    const dateRangeField = await driver.findElement(By.css('#js-searchbox-departure'));
    await dateRangeField.click();

    const startDate = await driver.findElement(By.xpath(`//*[@id="js-searchbox"]/div/div/div[2]/div[2]/div/div[2]/div/div[1]/div[1]/div[2]/div[2]/div[1]/div[4]/div[2]/div[1]/div[2]/div[4]/table/tbody/tr[2]/td[2]`));
    await startDate.click();

    const endDate = await driver.findElement(By.xpath(`//*[@id="js-searchbox"]/div/div/div[2]/div[2]/div/div[2]/div/div[1]/div[1]/div[2]/div[2]/div[1]/div[4]/div[2]/div[1]/div[2]/div[4]/table/tbody/tr[3]/td[2]`));
    await endDate.click();

    // Submit search
    const searchButton = await driver.findElement(By.css('#js-flight-search-btn'));
    await searchButton.click();

    // Wait for search results to load
    const resultsHeader = await driver.wait(until.elementLocated(By.css('.search-result-header h1')), 10000);

    // Verify search results
    const headerText = await resultsHeader.getText();
    expect(headerText).to.equal('Flights from Seoul to Tokyo');
  });

  it('should search for a round-trip flight from Alaska to Kuala Lumpur from 6th June to 24th June', async () => {
    await driver.get('https://www.trip.com/flights/');

    // Select round-trip option
    const roundTripButton = await driver.findElement(By.css('#js-searchbox > div > div > div.flt-type > label:nth-child(3)'));
    await roundTripButton.click();

    // Enter departure and destination
    const departureField = await driver.findElement(By.css('#js-searchbox-from'));
    await departureField.sendKeys('Alaska', Key.RETURN);

    const destinationField = await driver.findElement(By.css('#js-searchbox-to'));
    await destinationField.sendKeys('Kuala Lumpur', Key.RETURN);

    // Select date range
    const dateRangeField = await driver.findElement(By.css('#js-searchbox-departure'));
    await dateRangeField.click();

    const startDate = await driver.findElement(By.xpath(`//*[@id="js-searchbox"]/div
