import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { LeadsModule } from './modules/leads/lead.module';
@Module({
  imports: [LeadsModule, AuthModule],
})
export class AppModule {}
