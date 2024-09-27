export class RegisterPage{
    constructor(page){
        this.page           = page
        this.emailField     = page.getByPlaceholder("e-mail")
        this.passwordField  = page.getByPlaceholder("password")
        this.registerButton = page.getByRole('button', { name : /Register/})
    }

    signUpAsNewUser = async (email, password) => {
        await this.emailField.waitFor()
        await this.emailField.fill(email)

        await this.passwordField.waitFor()
        await this.passwordField.fill(password)

        await this.registerButton.waitFor()
        await this.registerButton.click()
        await this.page.waitForURL(/\/delivery-details/)
    }
}