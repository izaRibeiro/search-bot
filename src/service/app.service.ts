import { RequestDto } from './../dto/search.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  search(payload: RequestDto): RequestDto {
    return payload;
  }
}
