import { test }             from "@playwright/test"
import { MyAccountPage }    from "../page-objects/MyAccountPage"
import { getLoginToken }    from "../api-calls/getLoginToken"
import { userDetails }      from "../data/userDetails"

test( "My Account cookies iniejecton and mocking network request", async ( { page } ) => { 
    const loginToken = await getLoginToken(userDetails.username, userDetails.password)
    await page.route( "**/api/user**", async ( route, request ) => { 
        await route.fulfill( {
            status: 500,
            contentType: 'application/json',
            body: JSON.stringify({ message: 'PLAYWRIGHT-COURSE ERROR BY MOCK DATA'})
        } )
    } )
    const myAccount = new MyAccountPage( page )
    await myAccount.visit()
    await page.evaluate( ([tokeInBrowser]) => { 
        document.cookie = "token=" + tokeInBrowser
    }, ( [ loginToken ] ) )
    await myAccount.visit()
    await myAccount.waitForHeading()
    await myAccount.waitForErrorMessage()
} )