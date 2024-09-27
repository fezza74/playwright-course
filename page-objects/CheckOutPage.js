import { expect } from "@playwright/test"

export class CheckoutPage{
    constructor(page){
        this.page                       = page
        this.basketCards                = page.locator('[data-qa="basket-card"]')
        this.basketItemPrices           = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButtons    = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButton   = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeCheapsetProduct = async () => {
        await this.basketCards.first().waitFor()
        const bascketCardsBeforeRemove  = await this.basketCards.count()
        await this.basketItemPrices.first().waitFor()
        const allPriceTexts             = await this.basketItemPrices.allInnerTexts()
        const cheapsetProduct           = allPriceTexts.map((element) => {return parseInt(element.replace('$', ''),10)})
        await this.basketItemRemoveButtons.nth(cheapsetProduct.indexOf(Math.min(...cheapsetProduct))).click()
        await expect(this.basketCards).toHaveCount(bascketCardsBeforeRemove-1)
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/, { timeout: 3000})
    }
}