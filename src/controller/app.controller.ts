import { RequestDto } from './../dto/search.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from '../service/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(@Body() payload: RequestDto): RequestDto {
    return this.appService.search(payload);
  }
}
