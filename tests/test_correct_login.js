import { Builder, By, Key, until } from 'selenium-webdriver';
import assert from 'node:assert';

async function correctLoginTest() {
    // 1. Inicjalizacja przegladarki
    const driver = await new Builder().forBrowser('MicrosoftEdge').build();

    try {
        // --- KROK 1: Nawigacja ---
        await driver.get('https://www.saucedemo.com/');
        console.log('Otwarto strone logowania');

        // --- KROK 2: Oczekiwanie na zaladowanie pól ---
        // U?ywamy until, aby upewnic sie, ze strona jest gotowa
        const loginInput = await driver.wait(until.elementLocated(By.id('user-name')), 5000);
        const passInput = await driver.findElement(By.id('password'));
        const loginBtn = await driver.findElement(By.id('login-button'));

        // --- KROK 3: Interakcja (Logowanie) ---
        await loginInput.sendKeys('standard_user');
        await passInput.sendKeys('secret_sauce');
        
        console.log('Wpisano dane logowania, klikam przycisk...');
        await loginBtn.click();

        // --- KROK 4: Weryfikacja (Asercje) ---
        
        // Sprawdzenie URL - po zalogowaniu powinnismy byc na podstronie /inventory.html
        await driver.wait(until.urlContains('inventory.html'), 5000);
        const currentUrl = await driver.getCurrentUrl();
        assert.ok(currentUrl.includes('/inventory.html'), `Niepoprawny URL po zalogowaniu: ${currentUrl}`);

        // Sprawdzenie nag?ówka na stronie g?ównej sklepu (u?ywamy By.css)
        const headerTitle = await driver.findElement(By.css('.title')).getText();
        assert.strictEqual(headerTitle, 'Products', 'Naglowek strony sklepu jest niepoprawny!');

        console.log('TEST ZAKONCZONY SUKCESEM: Uzytkownik zalogowany poprawnie.');

        await driver.sleep(5000)

    } catch (error) {
        console.error('TEST OBLANY! Powód:', error.message);
    } finally {
        // --- KROK 5: Zamkniecie ---
        await driver.quit();
    }
}

correctLoginTest();