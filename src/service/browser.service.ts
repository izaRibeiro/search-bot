import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import { RequestDto } from './../dto/request.dto';
import { ResponseDto } from './../dto/response.dto';

const NAME_SELECTOR = 'quartoNome ';
const DESCRIPTION_SELECTOR = 'quartoDescricao';
const PRICE_SELECTOR = 'valorFinal valorFinalDiscounted';
const IMAGE_SELECTOR = '.room--image';

@Injectable()
export class BrowserService {
  async getSearchInfos(payload: RequestDto): Promise<ResponseDto[]> {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    
    await page.goto(
      `https://pratagy.letsbook.com.br/D/Reserva?checkin=${this.getDate(
        payload.checkin,
      )}&checkout=${this.getDate(
        payload.checkout,
      )}&cidade=&hotel=12&adultos=1&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive`,
    );

    const names = await this.getTextElements(page, NAME_SELECTOR);
    const descriptions = await this.getTextElements(page, DESCRIPTION_SELECTOR);
    const prices = await this.getTextElements(page, PRICE_SELECTOR);
    const images = await this.getImages(page);

    return prices.map((element, index) => {
      const response = new ResponseDto();

      response.name = names[index];
      response.description = descriptions[index];
      response.price = prices[index];
      response.image = images[index];

      return response;
    });
  }

  private getDate(date: string) {
    const convertedDate = new Date(date);

    return `${convertedDate.getUTCDate()}%2F${
      convertedDate.getUTCMonth() + 1
    }%2F${convertedDate.getUTCFullYear()}`;
  }

  private async getImages(page: any) {
    return page.evaluate((IMAGE_SELECTOR) => {
      return Array.from(document.querySelectorAll(IMAGE_SELECTOR), (element) =>
        element.getAttribute('data-src'),
      );
    }, IMAGE_SELECTOR);
  }

  private async getTextElements(page: any, classSelector: string) {
    return page.evaluate((classSelector) => {
      return Array.from(
        document.querySelectorAll(`[class='${classSelector}']`),
        (element) => element.textContent,
      );
    }, classSelector);
  }
}
