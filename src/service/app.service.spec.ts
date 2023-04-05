import { Test, TestingModule } from '@nestjs/testing';
import { RequestDto } from '../dto/request.dto';
import { ResponseDto } from '../dto/response.dto';
import { AppService } from './app.service';
import { BrowserService } from './browser.service';

describe('AppService', () => {
  let appService: AppService;
  let browserService: BrowserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService, BrowserService],
    }).compile();

    browserService = app.get<BrowserService>(BrowserService);
    appService = app.get<AppService>(AppService);
  });

  describe('search', () => {
    it('should do the search"', async () => {
      const result = [new ResponseDto()];

      jest
        .spyOn(browserService, 'getSearchInfos')
        .mockImplementation(async () => result);
      expect(await appService.search(new RequestDto())).toBe(result);
    });
  });
});
