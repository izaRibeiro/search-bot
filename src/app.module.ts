import { Module } from '@nestjs/common';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { BrowserService } from './service/browser.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BrowserService],
})
export class AppModule {}
