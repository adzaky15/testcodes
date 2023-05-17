describe('User Login Tests', () => {
    beforeEach(async () => {
      await page.goto('https://iam2.kaist.ac.kr/#/userLogin');
    });
  
    it('should log in with valid username and valid password', async () => {
      await page.type('#username', 'INSERT VALID USERNAME HERE');
      await page.type('#password', 'INSERT VALID PASSWORD HERE');
      await page.click('#loginBtn');
      await page.waitForNavigation();
      const url = await page.url();
      expect(url).toMatch('INSERT EXPECTED URL HERE');
    });
  
    it('should not log in with valid username and invalid password', async () => {
      await page.type('#username', 'INSERT VALID USERNAME HERE');
      await page.type('#password', 'INSERT INVALID PASSWORD HERE');
      await page.click('#loginBtn');
      const errorText = await page.$eval('#error-message', (element) => element.textContent);
      expect(errorText).toMatch('INSERT EXPECTED ERROR MESSAGE HERE');
    });
  });
  