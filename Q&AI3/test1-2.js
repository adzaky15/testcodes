describe('User Login Tests', () => {
    beforeEach(async () => {
      await page.goto('https://iam2.kaist.ac.kr/#/userLogin');
    });
  
    it('should not log in with invalid username', async () => {
      await page.type('#username', 'INSERT INVALID USERNAME HERE');
      await page.type('#password', 'INSERT VALID PASSWORD HERE');
      await page.click('#loginBtn');
      const errorText = await page.$eval('#error-message', (element) => element.textContent);
      expect(errorText).toMatch('INSERT EXPECTED ERROR MESSAGE HERE');
    });
  
    it('should not log in with valid username, valid password, and invalid OTP code', async () => {
      await page.type('#username', 'INSERT VALID USERNAME HERE');
      await page.type('#password', 'INSERT VALID PASSWORD HERE');
      await page.type('#otpCode', 'INSERT INVALID OTP CODE HERE');
      await page.click('#loginBtn');
      const errorText = await page.$eval('#error-message', (element) => element.textContent);
      expect(errorText).toMatch('INSERT EXPECTED ERROR MESSAGE HERE');
    });
  });