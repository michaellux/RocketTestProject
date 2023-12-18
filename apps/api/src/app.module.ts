import { Module } from '@nestjs/common';
import { LeadsModule } from './modules/leads/lead.module';
@Module({
  imports: [LeadsModule],
})
export class AppModule {}
