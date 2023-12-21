import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';

@Module({
  imports: [HttpModule],
  providers: [LeadService],
  controllers: [LeadController],
})
export class LeadsModule {}
