const { expect } = require('@playwright/test');


class ProductPage{
    constructor(){
        this.ObjectsPage = {
            "ProductTitle": '[id="productTitle"]',
            "ProductDesc": '[id="bookDescription_feature_div"]',
            "ProductValue": '[id="price"]',
            "addCartButton": '[id="addToCart_feature_div"]',
            "BuyNow":'[id="buyNow"]',

        }
    }

    async getTitleProduct(){
        let productName = await page.locator(this.ObjectsPage.ProductTitle) 
        await productName.waitFor('visible')
        return productName
    }
    async getDescProduct(){
        let ProductDesc = await page.locator(this.ObjectsPage.ProductDesc) 
        await ProductDesc.waitFor('visible')
        return ProductDesc

    }
    async getValueProduct(){
        let ProductValue = await page.locator(this.ObjectsPage.ProductValue) 
        await ProductValue.waitFor('visible')
        return ProductValue

    }
    async getAddCart(){
    
        let addCartButton = await page.locator(this.ObjectsPage.addCartButton).first()
        await addCartButton.waitFor('visible')
        return addCartButton

    }
    async getBuyNow(){
        let BuyNow = await page.locator(this.ObjectsPage.BuyNow) 
        await BuyNow.waitFor('visible')
        return BuyNow
    }
        
    async clickAddCart(){
        let addCart = await this.getAddCart()
        await addCart.click()
    }

    async validateProductPage(ProducName,ProductDesc){
        let elementName = await this.getTitleProduct()
        let elementDesc = await this.getDescProduct()

        let addCartButton = await this.getAddCart()
        let BuyNow = await this.getBuyNow()

        expect(elementName).toHaveText(ProducName)
        expect(elementDesc).toContainText(ProductDesc)

        expect(addCartButton).toContainText("Adicionar ao carrinho")
        expect(BuyNow).toContainText(" Comprar agora ")
    }
}



module.exports = { ProductPage: ProductPage }