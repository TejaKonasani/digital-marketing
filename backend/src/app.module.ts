import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Future Phase 2 Domain Modules (Workforce, Projects, Approvals, Finance, Governance) will be imported here
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
