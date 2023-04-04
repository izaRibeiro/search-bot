import { IsNotEmpty } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

export class RequestDto {
  @ApiProperty({
    example: '2023-05-15',
    type: Date,
    default: 'YYYY-MM-DD',
    format: 'YYYY-MM-DD',
  })
  @IsNotEmpty()
  @IsDateString()
  checkin: string;

  @ApiProperty({
    example: '2023-05-18',
    type: Date,
    default: 'YYYY-MM-DD',
    format: 'YYYY-MM-DD',
  })
  @IsNotEmpty()
  @IsDateString()
  checkout: string;
}
