import { Injectable } from '@angular/core';
import { Builder, By, Key, until, WebDriver } from 'selenium-webdriver';
import { Action, Type } from '../model/action';

@Injectable()
export class SeleniumService {
    driver: WebDriver;

    begin(): void {
        this.driver = new Builder().forBrowser('chrome').build();
    }

    click(action: Action): void {
        this.driver.findElement(By.css(action.selector)).click();
    }

    goto(action: Action): void {
        this.driver.get(action.url);
    }

    type(action: Action): void {
        this.driver.findElement(By.css(action.selector)).sendKeys(action.value, Key.TAB);
    }

    refresh(): void {
        this.driver.navigate().refresh();
    }

    forward(): void {
        this.driver.navigate().forward();
    }

    back(): void {
        this.driver.navigate().back();
    }

    quit(): void {
        this.driver.quit();
    }

    run(actions: Action[]): void{
        this.begin();
        for(let action of actions){
            if(action.type == Type.click){
                this.click(action);
            }
            else if(action.type == Type.goto){
                this.goto(action);
            }
            else if(action.type == Type.type){
                this.type(action);
            }
            else if(action.type == Type.refresh){
                this.refresh();
            }
            else if(action.type == Type.forward){
                this.forward();
            }
            else if(action.type == Type.back){
                this.back();
            }
            this.driver.sleep(2000);
        }
        this.quit();
    }
}
