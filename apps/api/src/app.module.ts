import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { LeadsModule } from './modules/leads/lead.module';
import { UsersModule } from './modules/users/user.module';
import { ContactsModule } from './modules/contacts/contact.module';
@Module({
  imports: [LeadsModule, AuthModule, UsersModule, ContactsModule],
})
export class AppModule {}
