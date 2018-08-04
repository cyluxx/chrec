import { Injectable } from '@angular/core';
import { Builder, By, Key, until } from 'selenium-webdriver';

@Injectable()
export class SeleniumService {

    test(): void {
        let driver = new Builder()
            .forBrowser('chrome')
            .build();

        driver.get('http://www.google.com/ncr');
        driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        driver.wait(until.titleIs('webdriver - Google Search'), 1000);
        driver.quit();
    }
}
