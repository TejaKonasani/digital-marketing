import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getLiveness() {
    return {
      status: 'UP',
      timestamp: new Date().toISOString(),
      service: 'samrudhi-backend',
    };
  }

  getReadiness() {
    return {
      status: 'READY',
      timestamp: new Date().toISOString(),
      service: 'samrudhi-backend',
      version: '1.0.0',
    };
  }
}
