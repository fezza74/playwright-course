import { expect } from "@playwright/test"
import { NavigationPage } from "./NavigationPage"

import { isDesktopViewport } from "../utils/isDesktopViewport"
export class ProductsPage {
    constructor(page){
        this.page               = page
        this.addButtons         = page.locator('[data-qa="product-button"]')
        this.sortDropDown       = page.locator('[data-qa="sort-dropdown"]')
        this.firstProductTitle  = page.locator('[data-qa="product-title"]').first()
    }
    visit = async () => { await this.page.goto("/") }

    addProductToBasket = async ( idx ) => { 
        const specificAddButton = this.addButtons.nth(idx)
        const navigationPage    = new NavigationPage(this.page)
        await specificAddButton.waitFor()
        await expect( specificAddButton ).toHaveText( "Add to Basket" )
        
        let counterBeforeClick = 0
        if ( isDesktopViewport( this.page ) ) {
            counterBeforeClick = await navigationPage.getBasketCounter()
        }
        await specificAddButton.click()
        if(isDesktopViewport(this.page)) {
            const counterAfterClick = await navigationPage.getBasketCounter()
            expect( counterAfterClick ).toBeGreaterThan( counterBeforeClick )
        }
        await expect(specificAddButton).toHaveText("Remove from Basket")
     }

    sortByCheapest = async () => {
        await this.sortDropDown.waitFor()
        const productTitleBeforeSorting = await this.firstProductTitle
        await this.sortDropDown.selectOption("price-asc")
        const productTitleAferSorting   = await this.firstProductTitle.allInnerTexts()
        expect(productTitleBeforeSorting).not.toEqual(productTitleAferSorting)
    } 
}