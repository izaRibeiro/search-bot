import { ResponseDto } from './../dto/response.dto';
import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class BrowserService {
    async getSearchInfos() {
        const browser = await puppeteer.launch({});
        const page = await browser.newPage();
        await page.goto('https://pratagy.letsbook.com.br/D/Reserva?checkin=15%2F05%2F2023&checkout=18%2F05%2F2023&cidade=&hotel=12&adultos=1&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=&mesCalendario=4%2F1%2F2023')

        const price = await page.$("[class='valorFinal valorFinalDiscounted']")
        const name = await page.$("[class='quartoNome ']")
        const description = await page.$("[class='quartoDescricao']")
        const image = await page.$eval('img', (el) => el.getAttribute('src'));
        
        const response = new ResponseDto();

        response.name = await (await name?.getProperty('textContent'))?.jsonValue() 
        response.description = await (await description?.getProperty('textContent'))?.jsonValue() 
        response.price = await (await price?.getProperty('textContent'))?.jsonValue()
        response.image = image

        this.closeBrowser(browser);
        
        return response;
    }

    closeBrowser(browser) {
        if (!browser) {
            return;
        }
        return browser.close();
    }
}
