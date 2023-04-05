import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../service/app.service';
import { RequestDto } from './../dto/request.dto';
import { ResponseDto } from './../dto/response.dto';
import { BrowserService } from './../service/browser.service';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;
  let browserService: BrowserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, BrowserService],
    }).compile();

    browserService = app.get<BrowserService>(BrowserService);
    appController = app.get<AppController>(AppController);
  });

  describe('search', () => {
    it('should do the search"', async () => {
      const result = [new ResponseDto()];

      jest
        .spyOn(browserService, 'getSearchInfos')
        .mockImplementation(async () => result);
      expect(await appController.search(new RequestDto())).toBe(result);
    });
  });
});
