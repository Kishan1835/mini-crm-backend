import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Status')
@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'API Status and Information' })
  getStatus() {
    return {
      status: 'online',
      message: 'Welcome to Mini CRM Backend API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      documentation: '/api/docs',
      endpoints: {
        auth: {
          register: '/auth/register',
          login: '/auth/login',
        },
        users: '/users (Admin only)',
        customers: '/customers',
        tasks: '/tasks',
      },
      deployment: {
        platform: 'Render',
        database: 'PostgreSQL',
      },
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health Check' })
  getHealth() {
    return {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: 'connected',
    };
  }
}