// Go to trip.com homepage and wait for it to load
await page.goto('https://www.trip.com/flights/');

// Enter departure city and wait for the dropdown options to appear
await page.type('#flightSearchStartCity', 'New York');
await page.waitForSelector('#ui-id-1');

// Select New York, NY - John F Kennedy International Airport from the dropdown list
await page.click('#ui-id-1 li:nth-child(1)');

// Enter arrival city and wait for the dropdown options to appear
await page.type('#flightSearchEndCity', 'London');
await page.waitForSelector('#ui-id-2');

// Select London, England, United Kingdom - Heathrow Airport from the dropdown list
await page.click('#ui-id-2 li:nth-child(1)');

// Click on the departure date input field and wait for the calendar to appear
await page.click('#departDate');

// Click on the "Flexible" button
await page.click('#flexible-date-btn');

// Wait for the "Flexible Dates" dialog box to appear
await page.waitForSelector('#date-range-dialog');

// Click on the "From" date input field and enter July 1st
await page.click('#date-range-dialog .flight-datepicker-range-start input');
await page.keyboard.type('07/01/2023');

// Click on the "To" date input field and enter July 4th (3 days after July 1st)
await page.click('#date-range-dialog .flight-datepicker-range-end input');
await page.keyboard.type('07/04/2023');

// Click on the "Confirm" button
await page.click('#date-range-dialog .flight-datepicker-submit button');

// Click on the "One Way" tab
await page.click('#oneWayTab');

// Click on the "Search" button
await page.click('#searchButton');

// Wait for the search results to load
await page.waitForSelector('.listWrapper');

// Assert that the search results contain flights from New York to London on July 1st, 2nd, and 3rd
const searchResults = await page.$$('.listWrapper .list-item');
const searchResultsText = await Promise.all(searchResults.map(result => result.textContent));
expect(searchResultsText).toContain('New York to London');
expect(searchResultsText).toContain('July 1');
expect(searchResultsText).toContain('July 2');
expect(searchResultsText).toContain('July 3');
