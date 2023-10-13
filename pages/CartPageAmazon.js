const { expect } = require('@playwright/test');


class CartPage {
    constructor() {
        this.ObjectsPage = {
            "CarTitle": '[id="NATC_SMART_WAGON_CONF_MSG_SUCCESS"]',
            "closeBuy": '[id="sc-buy-box-ptc-button"] [class="sc-with-multicart"]',
            "goToCart": '[data-csa-c-content-id="sw-gtc_CONTENT"]',
            "ProductTitle": '[data-a-max-rows="2"] [class="a-truncate-full a-offscreen"]',

        }
    }

    async getcartTitle() {
        let CarTitle = await page.locator(this.ObjectsPage.CarTitle) 
        await CarTitle.waitFor('visible')
        return CarTitle
     }
    async getcloseBuy() { 
        let closeBuy = await page.locator(this.ObjectsPage.closeBuy) 
        await closeBuy.waitFor('visible')
        return closeBuy

    }
    async getgoToCart() { 

        let goToCart = await page.locator(this.ObjectsPage.goToCart) 
        await goToCart.waitFor('visible')
        return goToCart
    }
    async getProductTitle() { 

        let ProductTitle = await page.locator(this.ObjectsPage.ProductTitle).first()
        await ProductTitle.waitFor('visible')
        return ProductTitle
    }

    async clickGotoCart(){
        let goToCart = await this.getgoToCart()
        await goToCart.click()
    }
    
    async validateFirstCart(){
        let cartTitle = await this.getcartTitle()
        let closeBuy = await this.getcloseBuy()
        let goToCart = await this.getgoToCart()
        
        await expect(cartTitle).toContainText("Adicionado ao carrinho")
        await expect(closeBuy).toContainText("Finalizar carrinho da Amazon")
        await expect(goToCart).toContainText("Ir para o carrinho")

    }

    async validateSecondCart(ProducName){
        await this.clickGotoCart()
        let producTitle = await this.getProductTitle()
        
        await expect(producTitle).toContainText(ProducName)
    }

    
}



module.exports = { CartPage: CartPage }