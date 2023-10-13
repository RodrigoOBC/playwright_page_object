// @ts-check
const { test, expect } = require('@playwright/test');
const { AmazonHomePage } = require("../pages/homePageAmazon")
const { ProductPage } = require("../pages/ProductPageAmazon")
const { CartPage } = require("../pages/CartPageAmazon")

const HomePage = new AmazonHomePage()
const productPage = new ProductPage()
const cartPage = new CartPage()

test(`Successfully Search for ${HomePage.ObjectsPage.ProductTarget} on Amazon`, async ({ page }) => {
  global.page = page

  await test.step('Navigate to the main screen of amazon.com', async () => {
    await HomePage.navegatTo();
  })

  await test.step('Main screen of Amazon is displayed', async () => {
    await HomePage.validateHomePage()
  })
  
  await test.step(`Search for the product  ${HomePage.ObjectsPage.ProductTarget}`, async () => {
    await HomePage.validateSearchProduct(HomePage.ObjectsPage.ProductTarget)
  })

  await test.step(`Validate the found product`, async () => {
    await HomePage.validateSearchProduct(HomePage.ObjectsPage.ProductTarget)
  })

});

test('Successfully Add Product to Cart', async ({ page }) => {
  global.page = page

  await test.step('Navigate to the main screen of amazon.com', async () => {
    await HomePage.navegatTo();
  })

  await test.step('Main screen of Amazon is displayed', async () => {
    await HomePage.validateHomePage()
  })
  
  await test.step(`Access the  ${HomePage.ObjectsPage.ProductTarget}  product page.`, async () => {
    await HomePage.clickBoxResultAfterSearch(HomePage.ObjectsPage.ProductTarget)
  })

  await test.step(`Validate the product page.`, async () => {
    const descProduct = "Uma sociedade secreta, traiçoeira e liderada por famílias ricas e influentes assombra os cidadãos de Gotham City e coloca em risco a segurança da cidade e do próprio Batman. A Corte das Corujas, há muito escondida sob a sombras do submundo, vai mostrar suas garras novamente, e desta vez, da maneira mais impiedosa possível. Um romance original de Greg Cox, autor best-seller de diversas novelizações de filmes, entre as quais Batman – O Cavaleiro das Trevas Ressurge." 
    await productPage.validateProductPage(HomePage.ObjectsPage.ProductTarget,descProduct )
    await productPage.clickAddCart()
  })
  
  await test.step(`Validate the product in the cart.`, async () => {
    await cartPage.validateFirstCart()
    await cartPage.validateSecondCart(HomePage.ObjectsPage.ProductTarget)
  })

});



