import { Body, Controller, Post } from '@nestjs/common';
import { RequestDto } from '../dto/request.dto';
import { AppService } from '../service/app.service';
import { ResponseDto } from './../dto/response.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(@Body() payload: RequestDto): Promise<ResponseDto> {
    return this.appService.search(payload);
  }
}
