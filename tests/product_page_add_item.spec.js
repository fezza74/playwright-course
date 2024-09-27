import { test, expect } from "@playwright/test"

test.skip("Product Page Add To Bascket", async ({page}) => {
    await page.goto("/")
    let count = 0
    const addProductButton = page.locator('[data-qa="product-button"]').first()
    const basketCounter = page.locator('[data-qa="header-basket-count"]')
    await addProductButton.waitFor()
    await expect(addProductButton).toHaveText("Add to Basket")
    await addProductButton.click()
    count++
    await expect(basketCounter).toHaveCount(count)
    await expect(addProductButton).toHaveText("Remove from Basket")
    const checkOut = page.getByRole('link', { name: 'Checkout' })
    await checkOut.waitFor()
    await checkOut.click()
    await page.waitForURL('/basket')
    await expect(page.locator('[class="mb-6 font-bold text-xl"]')).toHaveText('Basket')
})