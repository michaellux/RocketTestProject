import { Module } from '@nestjs/common';

import { LeadsController } from './lead.controller';

@Module({
  controllers: [LeadsController],
})
export class LeadsModule {}