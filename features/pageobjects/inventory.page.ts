import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class InventoryPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get addToCartButton () {
        return $('#add-to-cart-sauce-labs-backpack');
    }

    public get cartIcon () {
        return $('.shopping_cart_link');
    }

    public get cartBadge () {
        return $('[data-test="shopping-cart-badge"]');
    }

    public get menuButton () {
        return $('#react-burger-menu-btn');
    }

    public get logoutButton () {
        return $('#logout_sidebar_link');
    }

    /**
     * a method to add item to cart
     */
    public async addItemToCart () {
        await this.addToCartButton.waitForDisplayed();
        await this.addToCartButton.click();
    }

    /**
     * a method to go to cart
     */
    public async goToCart () {
        await this.cartIcon.click();
    }

    /**
     * a method to logout
     */
    public async logout () {
        await this.menuButton.click();
        await this.logoutButton.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('inventory.html');
    }
}

export default new InventoryPage();