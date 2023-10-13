// @ts-check
const { test, expect } = require('@playwright/test');
const {AmazonHomePage} = require("../pages/homePageAmazon")

const HomePage = new AmazonHomePage()

test(' Successfully Search for a Product on Amazon', async ({ page }) => {
  global.page = page

  await HomePage.navegatTo();

  await HomePage.validateSearchProduct(HomePage.ObjectsPage.ProductTarget)
});


