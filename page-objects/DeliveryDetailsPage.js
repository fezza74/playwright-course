import { expect } from "@playwright/test"

export class DeliveryDetailsPage{
    constructor(page){
        this.page                       = page
        this.firstName                  = page.getByPlaceholder('first name')
        this.lastName                   = page.getByPlaceholder('last name')
        this.street                     = page.getByPlaceholder('street')
        this.postCode                   = page.getByPlaceholder('post code')
        this.city                       = page.getByPlaceholder('city')
        this.country                    = page.locator('[data-qa="country-dropdown"]')
        this.saveAddressButton          = page.getByRole('button', { name: /Save*/ })
        this.savedAddressContainer      = page.locator('[data-qa="saved-address-container"]')
        this.containerFirstName         = page.locator('[data-qa="saved-address-firstName"]')
        this.containerLastName          = page.locator('[data-qa="saved-address-lastName"]')
        this.containerStreet            = page.locator('[data-qa="saved-address-street"]')
        this.containerPostCode          = page.locator('[data-qa="saved-address-postcode"]')
        this.containerCity              = page.locator('[data-qa="saved-address-city"]')
        this.containerCountry           = page.locator('[data-qa="saved-address-country"]')
        this.continueToPaymentButton    = page.locator('[data-qa="continue-to-payment-button"]')
    }

    fillDetails = async (userAddress) => {
        await this.firstName.waitFor()
        await this.firstName.fill(userAddress.firstName)
        await this.lastName.fill(userAddress.lastName)
        await this.street.fill(userAddress.street)
        await this.postCode.fill(userAddress.postCode)
        await this.city.fill(userAddress.city)
        await this.country.selectOption(userAddress.country)
    }

    saveDetails = async () => {
        const addressContainerBeforeSave = await this.savedAddressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await expect( this.savedAddressContainer ).toHaveCount( addressContainerBeforeSave + 1 )
        
        await this.containerFirstName.first().waitFor()
        expect( await this.containerFirstName.first().innerText()).toBe(await this.firstName.inputValue())
        
        await this.containerLastName.first().waitFor()
        expect( await this.containerLastName.first().innerText() ).toBe( await this.lastName.inputValue() )
        
        await this.containerStreet.first().waitFor()
        expect( await this.containerStreet.first().innerText() ).toBe( await this.street.inputValue() )
        
        await this.containerPostCode.first().waitFor()
        expect( await this.containerPostCode.first().innerText()).toBe(await this.postCode.inputValue())
        
        await this.containerCity.first().waitFor()
        expect( await this.containerCity.first().innerText() ).toBe( await this.city.inputValue() )
        
        await this.containerCountry.first().waitFor()
        expect( await this.containerCountry.first().innerText() ).toBe( await this.country.inputValue() )
    }

    continueToPayment = async (fullFilled) => {
        await this.continueToPaymentButton.waitFor()
        await this.continueToPaymentButton.click()
        if (fullFilled) {
            await this.page.waitForURL(/\/payment/)
        } else { 
            const errorMessage = await this.page.locator('[data-qa="error-message"]').innerText()
            expect(errorMessage).toContain('Error')
        }
    }
}