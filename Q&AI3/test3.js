const { expect } = require('chai');
const { remote } = require('webdriverio');

describe('Desmos Calculator Tests', () => {
  let browser;

  before(async () => {
    browser = await remote({
      logLevel: 'trace',
      capabilities: {
        browserName: 'chrome'
      }
    });
  });

  beforeEach(async () => {
    await browser.url('https://www.desmos.com/calculator');
  });

  it('should plot line y = x + 1', async () => {
    await browser.$('.dcg-expressionarea textarea').setValue('y=x+1\n');
    const lineExists = await browser.$('.dcg-graphie .dcg-line');
    expect(await lineExists.isExisting()).to.be.true;
  });

  it('should plot curve y = x^2', async () => {
    await browser.$('.dcg-expressionarea textarea').setValue('y=x^2\n');
    const curveExists = await browser.$('.dcg-graphie .dcg-curve');
    expect(await curveExists.isExisting()).to.be.true;
  });

  it('should plot curve y = sin x', async () => {
    await browser.$('.dcg-expressionarea textarea').setValue('y=sin(x)\n');
    const curveExists = await browser.$('.dcg-graphie .dcg-curve');
    expect(await curveExists.isExisting()).to.be.true;
  });

  it('should plot region y > 1/x', async () => {
    await browser.$('.dcg-expressionarea textarea').setValue('y>1/x\n');
    const regionExists = await browser.$('.dcg-graphie .dcg-region');
    expect(await regionExists.isExisting()).to.be.true;
  });

  after(async () => {
    await browser.deleteSession();
  });
});