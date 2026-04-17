import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class CartPage extends Page {
    /**
     * define selectors using getter methods
     */
    public get checkoutButton () {
        return $('#checkout');
    }

    public get firstName () {
        return $('#first-name');
    }

    public get lastName () {
        return $('#last-name');
    }

    public get postalCode () {
        return $('#postal-code');
    }

    public get continueButton () {
        return $('#continue');
    }

    public get finishButton () {
        return $('#finish');
    }

    public get completeMessage () {
        return $('.complete-header');
    }

    /**
     * a method to checkout
     */
    public async checkout (firstName: string, lastName: string, postalCode: string) {
        await this.checkoutButton.click();
        await this.firstName.setValue(firstName);
        await this.lastName.setValue(lastName);
        await this.postalCode.setValue(postalCode);
        await this.continueButton.click();
        await this.finishButton.click();
    }

    /**
     * overwrite specific options to adapt it to page object
     */
    public open () {
        return super.open('cart.html');
    }
}

export default new CartPage();