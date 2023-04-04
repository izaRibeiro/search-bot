import { ResponseDto } from './../dto/response.dto';
import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';

@Injectable()
export class BrowserService {
  async getSearchInfos(): Promise<ResponseDto[]> {
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto(
      'https://pratagy.letsbook.com.br/D/Reserva?checkin=15%2F05%2F2023&checkout=18%2F05%2F2023&cidade=&hotel=12&adultos=1&criancas=&destino=Pratagy+Beach+Resort+All+Inclusive&promocode=&tarifa=&mesCalendario=4%2F1%2F2023',
    );

    const prices = await this.getTextElements(
      page,
      'valorFinal valorFinalDiscounted',
    );
    const names = await this.getTextElements(page, 'quartoNome ');
    const descriptions = await this.getTextElements(page, 'quartoDescricao');
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

  private async getImages(page: any) {
    return page.evaluate(() =>
      Array.from(document.querySelectorAll(`.room--image`), (element) =>
        element.getAttribute('data-src'),
      ),
    );
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
