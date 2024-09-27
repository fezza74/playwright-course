import { isDesktopViewport } from "../utils/isDesktopViewport"

export class NavigationPage{
    constructor(page){
        this.page           = page
        this.bascketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkOutLink   = page.getByRole('link', { name: 'Checkout' })
        this.burgerMenu     = page.locator('[data-qa="burger-button"]')
    }

    getBasketCounter = async () => {
        await this.bascketCounter.waitFor()
        return parseInt(await this.bascketCounter.innerText(), 10)
    }

    goToCheckout = async () => {
        if(!isDesktopViewport(this.page)){
            await this.burgerMenu.waitFor()
            await this.burgerMenu.click()
        }
        await this.checkOutLink.waitFor()
        await this.checkOutLink.click()
        await this.page.waitForURL('/basket')
    }
}