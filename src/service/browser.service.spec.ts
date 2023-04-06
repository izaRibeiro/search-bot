import { ResponseDto } from './../dto/response.dto';
import { HttpException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import puppeteer from 'puppeteer';
import { RequestDto } from '../dto/request.dto';
import { BrowserService } from './browser.service';

describe('AppService', () => {
  let browserService: BrowserService;

  let browser;
  let page;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [BrowserService],
    }).compile();

    browserService = app.get<BrowserService>(BrowserService);

    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  describe('search', () => {
    it('should do the search with poppeter"', async () => {
      const request = new RequestDto();

      request.checkin = '2023-05-15';
      request.checkout = '2023-05-18';

      process.env.SITE_URL = 'https://pratagy.letsbook.com.br/D/Reserva';
      process.env.CHROME_PATH =
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome';

      jest.spyOn(BrowserService.prototype, 'getTextElements').mockImplementation(async () => ['field data']);

      expect(await browserService.getSearchInfos(request)).toBeInstanceOf(
        Array,
      );
    }, 30000);

    it('should return an exception"', async () => {
      const request = new RequestDto();

      process.env.SITE_URL = 'https://pratagy.letsbook.com.br/D/Reserva';
      process.env.CHROME_PATH =
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome';

      browserService.getSearchInfos(request).catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
      });
    }, 30000);
  });
});
