import { expect } from "@playwright/test"

export class MyAccountPage { 
    constructor ( page ) { 
        this.page = page
        this.heading = page.getByRole( 'heading', { name: "My Account" } )
        this.errorMessage = page.locator('[data-qa="error-message"]')
    }

    visit = async () => {
        await this.page.goto( '/my-account' )
    }

    waitForHeading = async () => { 
        await this.heading.waitFor()
    }

    waitForErrorMessage = async () => { 
        await this.errorMessage.waitFor()
    } 
}