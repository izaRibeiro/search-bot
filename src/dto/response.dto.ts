import { ApiProperty } from '@nestjs/swagger';
export class ResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  image: string;
}
