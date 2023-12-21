import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { LeadsModule } from './modules/leads/lead.module';
import { UsersModule } from './modules/users/user.module';
@Module({
  imports: [LeadsModule, AuthModule, UsersModule],
})
export class AppModule {}
