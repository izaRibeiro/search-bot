import { Injectable } from '@nestjs/common';
import { RequestDto } from '../dto/request.dto';
import { ResponseDto } from './../dto/response.dto';
import { BrowserService } from './browser.service';

@Injectable()
export class AppService {
  constructor(private readonly browserService: BrowserService) {}

  async search(payload: RequestDto): Promise<ResponseDto[]> {
    return this.browserService.getSearchInfos(payload);
  }
}
