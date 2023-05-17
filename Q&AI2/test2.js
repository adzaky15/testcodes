describe('Desmos Calculator Tests', () => {
  beforeEach(async () => {
    await page.goto('https://www.desmos.com/calculator');
  });

  it('should plot line y = x + 1', async () => {
    await page.type('.dcg-expressionarea textarea', 'y=x+1{enter}');
    const lineExists = await page.$('.dcg-graphie .dcg-line');
    expect(lineExists).toBeTruthy();
  });

  it('should plot curve y = x^2', async () => {
    await page.type('.dcg-expressionarea textarea', 'y=x^2{enter}');
    const curveExists = await page.$('.dcg-graphie .dcg-curve');
    expect(curveExists).toBeTruthy();
  });

  it('should plot curve y = sin x', async () => {
    await page.type('.dcg-expressionarea textarea', 'y=sin(x){enter}');
    const curveExists = await page.$('.dcg-graphie .dcg-curve');
    expect(curveExists).toBeTruthy();
  });

  it('should plot region y > 1/x', async () => {
    await page.type('.dcg-expressionarea textarea', 'y>1/x{enter}');
    const regionExists = await page.$('.dcg-graphie .dcg-region');
    expect(regionExists).toBeTruthy();
  });
});
