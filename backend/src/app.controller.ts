import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('health')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('live')
  getLiveness() {
    return this.appService.getLiveness();
  }

  @Get('ready')
  getReadiness() {
    return this.appService.getReadiness();
  }
}
