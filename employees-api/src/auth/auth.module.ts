import { Module } from '@nestjs/common';
import { ApiKeyAuthGuard } from './api-key-auth.guard';
import { ApiKeyModule } from 'src/api-key/api-key.module';

@Module({
  imports: [ApiKeyModule],
  providers: [ApiKeyAuthGuard],
  exports: [ApiKeyAuthGuard],
})
export class AuthModule {}
