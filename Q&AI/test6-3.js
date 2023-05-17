describe("Flight booking tests on Trip.com", () => {
    let driver;
  
    before(async () => {
      driver = await new Builder().forBrowser("chrome").build();
    });
  
    after(async () => {
      await driver.quit();
    });
  
    it("should book a one-way flight from Seoul to Hong Kong under $700", async () => {
      await driver.get("https://www.trip.com/flights/");
      await driver.findElement(By.id("search-panel")).click();
      await driver.findElement(By.css("#dcSearchFrom_1 .dc_input_label")).sendKeys("Seoul");
      await driver.findElement(By.css("#dcSearchTo_1 .dc_input_label")).sendKeys("Hong Kong");
      await driver.findElement(By.css(".dc_filter_wrapper .dc_filter_item[data-name='price']")).click();
      await driver.findElement(By.css(".dc_filter_price_input[data-input='min']")).sendKeys("0");
      await driver.findElement(By.css(".dc_filter_price_input[data-input='max']")).sendKeys("700");
      await driver.findElement(By.css("#dcSearchForm_1 .search_btn")).click();
      await driver.wait(until.urlContains("flights/trip/search"), 10000);
      await driver.findElement(By.css(".price_txt")).getText().then((text) => {
        expect(Number(text.replace(/[^\d.-]/g, ""))).to.be.at.most(700);
      });
    });
  
    it("should find the earliest flight from Shanghai to Seoul for tomorrow", async () => {
      await driver.get("https://www.trip.com/flights/");
      await driver.findElement(By.id("search-panel")).click();
      await driver.findElement(By.css("#dcSearchFrom_1 .dc_input_label")).sendKeys("Shanghai");
      await driver.findElement(By.css("#dcSearchTo_1 .dc_input_label")).sendKeys("Seoul");
      await driver.findElement(By.css(".dc_search_date_btn")).click();
      await driver.wait(until.urlContains("#searchbox="), 10000);
      await driver.findElement(By.css(".dc_calendar_day:not(.past):not(.invalid) .day_num")).click();
      await driver.findElement(By.css(".dc_search_btn")).click();
      await driver.wait(until.urlContains("flights/trip/search"), 10000);
      const earliestFlight = await driver.findElement(By.css(".sort_wrapper[data-sort='dep_time'] .sort_item:first-child .start_time")).getText();
      expect(earliestFlight).to.match(/Tomorrow.*\d{1,2}:\d{1,2}/);
    });
  });
  