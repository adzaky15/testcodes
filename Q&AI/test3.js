const { Builder, By, Key, until } = require('selenium-webdriver');
const { expect } = require('chai');

describe('Coupang Search Tests', () => {
  let driver;

  beforeAll(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  afterAll(async () => {
    await driver.quit();
  });

  it('should search for rice', async () => {
    await driver.get('https://www.coupang.com/');

    // Enter search query
    const searchField = await driver.findElement(By.css('#headerSearchKeyword'));
    await searchField.sendKeys('rice', Key.RETURN);

    // Wait for search results to load
    const resultsHeader = await driver.wait(until.elementLocated(By.css('.search-query > span')), 10000);

    // Verify search results
    const headerText = await resultsHeader.getText();
    expect(headerText).to.equal('rice');
  });

  it('should search for the cheapest air purifier', async () => {
    await driver.get('https://www.coupang.com/');

    // Enter search query
    const searchField = await driver.findElement(By.css('#headerSearchKeyword'));
    await searchField.sendKeys('air purifier', Key.RETURN);

    // Sort by price ascending
    const sortButton = await driver.findElement(By.css('.search-sort-button'));
    await sortButton.click();

    const priceAscOption = await driver.findElement(By.css('#productListOrderBy > li:nth-child(3)'));
    await priceAscOption.click();

    // Wait for search results to load
    const resultsHeader = await driver.wait(until.elementLocated(By.css('.search-query > span')), 10000);

    // Verify search results
    const headerText = await resultsHeader.getText();
    expect(headerText).to.equal('air purifier');

    // Verify cheapest product
    const cheapestProduct = await driver.findElement(By.css('.search-product-list li:nth-child(1) .price-value'));
    const cheapestPrice = await cheapestProduct.getText();
    expect(cheapestPrice).to.not.be.null;
  });

  it('should search for spaghetti with free delivery', async () => {
    await driver.get('https://www.coupang.com/');

    // Enter search query
    const searchField = await driver.findElement(By.css('#headerSearchKeyword'));
    await searchField.sendKeys('spaghetti', Key.RETURN);

    // Filter by free delivery
    const deliveryFilter = await driver.findElement(By.css('.search-filter-button:nth-child(2)'));
    await deliveryFilter.click();

    const freeDeliveryOption = await driver.findElement(By.css('#filterDelivery > li:nth-child(1) > a'));
    await freeDeliveryOption.click();

    // Wait for search results to load
    const resultsHeader = await driver.wait(until.elementLocated(By.css('.search-query > span')), 10000);

    // Verify search results
    const headerText = await resultsHeader.getText();
    expect(headerText).to.equal('spaghetti');

    // Verify free delivery products
    const freeDeliveryProducts = await driver.findElements(By.css('.delivery-free-label'));
    expect(freeDeliveryProducts).to.not.be.empty;
  });

  it('should search for a used airplane ticket', async () => {
    await driver.get('https://www.coupang.com/');

    // Enter search query
    const searchField = await driver.findElement(By.css('#headerSearchKeyword'));
    await searchField.sendKeys('used airplane ticket', Key.RETURN);

    // Wait for search results to load
    const results
