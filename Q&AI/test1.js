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

  it('should plot a line for y = x + 1', async () => {
    await driver.get('https://www.desmos.com/calculator');

    // Enter input
    const inputField = await driver.findElement(By.css('.expression-input textarea'));
    await inputField.sendKeys('y=x+1', Key.RETURN);

    // Wait for the graph to render
    const graph = await driver.wait(until.elementLocated(By.css('.dcg-graph-inner')), 5000);

    // Verify the line is plotted
    const svg = await graph.getAttribute('innerHTML');
    expect(svg).to.contain('<path d="M0,400L400,0"');
  });

  it('should plot a curve for y = x^2', async () => {
    await driver.get('https://www.desmos.com/calculator');

    // Enter input
    const inputField = await driver.findElement(By.css('.expression-input textarea'));
    await inputField.sendKeys('y=x^2', Key.RETURN);

    // Wait for the graph to render
    const graph = await driver.wait(until.elementLocated(By.css('.dcg-graph-inner')), 5000);

    // Verify the curve is plotted
    const svg = await graph.getAttribute('innerHTML');
    expect(svg).to.contain('<path d="M0,400L2.5,398.75L5,397.5L7.5,396.25L10,395L12.5,393.75L15,392.5L17.5,391.25L20,390L22.5,388.75L25,387.5L27.5,386.25L30,385L32.5,383.75L35,382.5L37.5,381.25L40,380L42.5,378.75L45,377.5L47.5,376.25L50,375L52.5,373.75L55,372.5L57.5,371.25L60,370L62.5,368.75L65,367.5L67.5,366.25L70,365L72.5,363.75L75,362.5L77.5,361.25L80,360L82.5,358.75L85,357.5L87.5,356.25L90,355L92.5,353.75L95,352.5L97.5,351.25L100,350L102.5,348.75L105,347.5L107.5,346.25L110,345L112.5,343.75L115,342.5L117.5,341.25L120,340L122.5,338.75L125,337.5L127.5,336.25L130,335L132.5,333.75L135,332.5L137.5,331.25L140,330L142.5,328.75L145,327.5L147.5,326.25L150,325L152.5,323.75
