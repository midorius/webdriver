import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect, $ } from '@wdio/globals'

import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
const pages = {
    login: LoginPage,
    inventory: InventoryPage,
    cart: CartPage
}

Given(/^I am on the (\w+) page$/, async (page) => {
    await pages[page].open()
});

When(/^I login with (\w+)? and (.+)?$/, async (username, password) => {
    await LoginPage.login(username || "" , password || "")
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    if (message.includes('Epic sadface')) {
        await expect(SecurePage.flashAlert).toBeExisting();
        await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining(message));
    } else {
        // For success, check if on inventory page
        await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));
    }
});

Then(/^I should be on the inventory page$/, async () => {
    await expect(browser).toHaveUrl(expect.stringContaining('inventory.html'));
    await InventoryPage.addToCartButton.waitForDisplayed();
});

When(/^I add an item to cart$/, async () => {
    await InventoryPage.addItemToCart();
});

Then(/^the cart should have (\d+) item$/, async (count) => {
    await browser.waitUntil(async () => {
        try {
            const text = await InventoryPage.cartBadge.getText();
            return text === count;
        } catch (e) {
            return false;
        }
    }, { timeout: 5000 });
});

When(/^I go to cart$/, async () => {
    await InventoryPage.goToCart();
});

When(/^I checkout$/, async () => {
    await CartPage.checkout('John', 'Doe', '12345');
});

Then(/^I should see "(.*)"$/, async (message) => {
    await expect(CartPage.completeMessage).toHaveText(message);
});

When(/^I logout$/, async () => {
    await InventoryPage.logout();
});

Then(/^I should be on the login page$/, async () => {
    await expect(browser).toHaveUrl('https://www.saucedemo.com/');
});

