// 3. One-way flight from Seoul to Hong Kong under $700
describe('One-way flight from Seoul to Hong Kong under $700', () => {
  it('Should search for a one-way flight from Seoul to Hong Kong under $700', async () => {
    await page.goto('https://www.trip.com/flights/');
    await page.waitForSelector('#js_flight_search_container');

    // Fill in origin and destination
    await page.type('#flight_search_from_city', 'Seoul');
    await page.click('.search-box-suggest li:nth-child(1)');
    await page.type('#flight_search_to_city', 'Hong Kong');
    await page.click('.search-box-suggest li:nth-child(1)');

    // Click on the one-way tab
    await page.click('.flight-tab-nav-wrap .tab-item:nth-child(2)');

    // Fill in departure date and search
    await page.click('#fromDate');
    await page.waitForSelector('.calendar-day__item:not(.prev-month):not(.next-month)');
    await page.click('.calendar-day__item:not(.prev-month):not(.next-month)');
    await page.click('#flightSearchSubmitBtn');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Filter search results by price
    await page.waitForSelector('.search-list-container .sort-panel .sort-row .sort-tab');
    await page.click('.search-list-container .sort-panel .sort-row .sort-tab');
    await page.waitForSelector('.search-list-container .sort-panel .sort-row .sort-item:nth-child(2)');
    await page.click('.search-list-container .sort-panel .sort-row .sort-item:nth-child(2)');
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Assert that the cheapest flight is under $700
    const flightPrices = await page.$$eval('.search-list-container .flight-list-item .price em', prices => prices.map(price => parseFloat(price.innerText.replace(/[^0-9.]/g, ''))));
    const cheapestPrice = Math.min(...flightPrices);
    expect(cheapestPrice).toBeLessThanOrEqual(700);
  }, timeout);

  // 4. Earliest flight from Shanghai to Seoul for tomorrow
  describe('Earliest flight from Shanghai to Seoul for tomorrow', () => {
    it('Should search for the earliest flight from Shanghai to Seoul for tomorrow', async () => {
      await page.goto('https://www.trip.com/flights/');
      await page.waitForSelector('#js_flight_search_container');

      // Fill in origin and destination
      await page.type('#flight_search_from_city', 'Shanghai');
      await page.click('.search-box-suggest li:nth-child(1)');
      await page.type('#flight_search_to_city', 'Seoul');
      await page.click('.search-box-suggest li:nth-child(1)');

      // Click on the round-trip tab
      await page.click('.flight-tab-nav-wrap .tab-item:nth-child(1)');

      // Fill in departure and return dates
      const currentDate = new Date();
      const tomorrowDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
      const tomorrowDateString = `${tomorrowDate.getMonth() + 1}/${tomorrowDate.getDate()}/${tomorrowDate.getFullYear()}`;
      await page.click('#fromDate');
      await page.waitForSelector('.calendar-day__item:not(.prev-month):not(.next-month)');
      await page.click(`.calendar-day__item:not(.prev-month):not(.next-month):has(.day-num[data-date="${tomorrowDateString}"])`);
      await page.click('#toDate');
      await page
