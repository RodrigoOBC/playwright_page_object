// @ts-check
const { test, expect } = require('@playwright/test');
const { AmazonHomePage } = require("../pages/homePageAmazon")

const HomePage = new AmazonHomePage()

test('Successfully Search for a Product on Amazon', async ({ page }) => {
  global.page = page

  await test.step('Navigate to the main screen of amazon.com', async () => {
    await HomePage.navegatTo();
  })

  await test.step('Main screen of Amazon is displayed', async () => {
    await HomePage.validateHomePage()
  })
  
  await test.step(`Pesquiso o produto ${HomePage.ObjectsPage.ProductTarget}`, async () => {
    await HomePage.validateSearchProduct(HomePage.ObjectsPage.ProductTarget)
  })

});


