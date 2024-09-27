export class LoginPage {
    constructor(page){
        this.page               = page

        this.moveToSignupButton = page.locator('[data-qa="go-to-signup-button"]')
    }

    // goToSignIn = async () => {
    //     await this.signupButton.waitFor()
    //     await this.signupButton.click()
    //     await this.page.waitForURL(/\/login/, {timeout: 3000})
    // }

    moveToSignUp = async () => {
        await this.moveToSignupButton.waitFor()
        await this.moveToSignupButton.click()
        await this.page.waitForURL(/\/signup/, {timeout : 3000})
    }
}