import { expect } from "@playwright/test"

export class PaymentPage { 
    constructor(page) { 
        this.page               = page
        this.discountCode       = page.frameLocator('[data-qa="active-discount-container"]').locator('[data-qa="discount-code"]')
        this.inputCode          = page.locator('[data-qa="discount-code-input"]')
        this.submitButton       = page.locator('[data-qa="submit-discount-button"]')
        this.discountMessagge   = page.locator('[data-qa="discount-active-message"]')
        this.regularAmount      = page.locator('[data-qa="total-value"]')
        this.discountAmount     = page.locator('[data-qa="total-with-discount-value"]')
        this.creditOwner        = page.locator('[data-qa="credit-card-owner"]')
        this.creditNumeber      = page.locator('[data-qa="credit-card-number"]')
        this.creditValidUntil   = page.locator('[data-qa="valid-until"]')
        this.creditCVC          = page.locator('[data-qa="credit-card-cvc"]')
        this.payButton          = page.getByRole('button', { name: 'Pay'})
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.inputCode.fill(code)
        
        // Option 1
        await this.inputCode.waitFor()
        await expect(this.inputCode).toHaveValue(code)

        // Otion 2
        // await this.inputCode.focus()
        // await this.page.keyboard.type(code, { delay: 500 })
        // expect(await this.inputCode.inputValue()).toBe(code)

        await expect(this.discountMessagge).not.toBeVisible()
        await expect(this.discountAmount).not.toBeVisible()
        await this.submitButton.click()
        await this.discountMessagge.waitFor()
        await this.discountAmount.waitFor()
        const discounted = parseInt(await this.discountAmount.innerText())
        const regular = parseInt(await this.regularAmount.innerText())
        expect(discounted).toBeLessThan(regular)
    }

    fillPaymentDetails = async (paymentFields) => { 
        await this.creditOwner.fill( paymentFields.creditOwner )
        await this.creditNumeber.fill(paymentFields.creditNumeber)
        await this.creditValidUntil.fill(paymentFields.creditValidUntil)
        await this.creditCVC.fill(paymentFields.creditCVC)
    }

    completePayment = async () => { 
        await this.payButton.focus()
        await this.payButton.click()
        await this.page.waitForURL( /\/thank-you/ )
    }
}