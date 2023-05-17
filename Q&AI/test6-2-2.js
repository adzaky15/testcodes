// Go to trip.com homepage and wait for it to load
await page.goto('https://www.trip.com/flights/');

// Enter departure city and wait for the dropdown options to appear
await page.type('#flightSearchStartCity', 'Seoul');
await page.waitForSelector('#ui-id-1');

// Select Seoul, South Korea - Incheon International Airport from the dropdown list
await page.click('#ui-id-1 li:nth-child(1)');

// Enter arrival city and wait for the dropdown options to appear
await page.type('#flightSearchEndCity', 'Tokyo');
await page.waitForSelector('#ui-id-2');

// Select Tokyo, Japan - Narita International Airport from the dropdown list
await page.click('#ui-id-2 li:nth-child(1)');

// Click on the departure date input field and wait for the calendar to appear
await page.click('#departDate');

// Click on the "June 2023" button
await page.click('.flight-datepicker-month');

// Click on the
