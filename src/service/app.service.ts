import { ResponseDto } from './../dto/response.dto';
import { RequestDto } from '../dto/request.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  search(payload: RequestDto): ResponseDto {
    const response = new ResponseDto();

    response.name = "test";

    return response;
  }
}
