const { expect } = require('@playwright/test');

class AmazonHomePage {
    constructor() {
        this.ObjectsPage = {
            "url": "https://www.amazon.com.br/",
            "SearchField": '[id="twotabsearchtextbox"]',
            "SearchButton": '[id="nav-search-submit-button"]',
            "ProductTarget": "Batman - A Corte das Corujas",
            "titlePage": "Amazon.com.br | Tudo pra você, de A a Z.",
            "boxResults":`[data-component-type="s-search-result"]`,
            "TitleResult":'[class="a-size-base-plus a-color-base a-text-normal"]'
        }
    }

    async navegatTo() {
        await page.goto(this.ObjectsPage.url)
    }

    async getSearchField() {
        let SearchField = await page.locator(this.ObjectsPage.SearchField)
        await SearchField.waitFor('visible')
        return SearchField
    }

    async getSearchButton() {
        let SearchButton = await page.locator(this.ObjectsPage.SearchButton)
        await SearchButton.waitFor('visible')
        return SearchButton
    }

    async clickSearchButton() {
        let SearchButton = await this.getSearchButton()
        await SearchButton.click()
    }

    async searchProduct(productName) {
        let SearchField = await this.getSearchField()
        await SearchField.click()
        await SearchField.fill(productName)
    }

    async getBoxsResult(){
        let boxResult = await page.locator(this.ObjectsPage.boxResults).first()
        await boxResult.waitFor('visible')
        return boxResult
    }

    async validateHomePage(){
        const currentUrl = page.url();
        expect(currentUrl).toBe('https://www.amazon.com.br/')
    }

    async validateSearchProduct(productName) {
        await this.searchProduct(productName)
        await this.clickSearchButton()
        let boxResult = await this.getBoxsResult()
        
        await expect(boxResult.locator(this.ObjectsPage.TitleResult)).toContainText(productName)

    }

    async clickBoxResultAfterSearch(productName){
        await this.validateSearchProduct(productName)
        let boxResult = await this.getBoxsResult()
        await boxResult.locator('[href*="/Batman-Corte-Corujas-Christa-Faust/"]').first().click()

    }
}

module.exports = { AmazonHomePage: AmazonHomePage }