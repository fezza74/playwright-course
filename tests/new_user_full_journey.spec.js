import { test }                 from "@playwright/test"
import { v4 as uuidv4 }         from "uuid"

import { ProductsPage }         from "../page-objects/ProductsPage" 
import { NavigationPage }       from "../page-objects/NavigationPage"
import { CheckoutPage }         from "../page-objects/CheckOutPage"
import { LoginPage }            from "../page-objects/LoginPage"
import { RegisterPage }         from "../page-objects/RegisterPage"
import { DeliveryDetailsPage }  from "../page-objects/DeliveryDetailsPage"
import { PaymentPage }          from "../page-objects/PaymentPage"

import { deliveryDetails as userAddress } from "../data/deliveryDetails"
import { paymentDetails as paymentFields } from "../data/paymentDetails"

test("New user full end-to-end test journey", async ({ page }) => {
    const productsPage          = new ProductsPage(page)
    const navigationPage        = new NavigationPage(page)
    const checkOutPage          = new CheckoutPage(page)
    const loginPage             = new LoginPage(page)
    const registerPage          = new RegisterPage(page)
    const deliveryDetailsPage   = new DeliveryDetailsPage(page)
    const payment               = new PaymentPage(page)
    const email                 = uuidv4() + '@gmail.com'
    const password              = uuidv4()

    await productsPage.visit()
    await productsPage.sortByCheapest()
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)
    //--------------------------------------
    await navigationPage.goToCheckout()
    //--------------------------------------
    await checkOutPage.removeCheapsetProduct()
    await checkOutPage.continueToCheckout()
    //--------------------------------------
    await loginPage.moveToSignUp()
    //--------------------------------------
    await registerPage.signUpAsNewUser(email, password)
    //--------------------------------------
    await deliveryDetailsPage.continueToPayment(false)
    await deliveryDetailsPage.fillDetails(userAddress)
    await deliveryDetailsPage.saveDetails()
    await deliveryDetailsPage.continueToPayment(true)
    //--------------------------------------
    await payment.activateDiscount()
    await payment.fillPaymentDetails( paymentFields )
    await payment.completePayment()
})