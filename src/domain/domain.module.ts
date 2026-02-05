import { Module } from '@nestjs/common';
import { UseCasesModule } from './use-cases/use-cases.module';
import { GetUserByEmailService } from './use-cases/users/get-user-by-email.service';

@Module({
  imports: [UseCasesModule],
  providers: [GetUserByEmailService]
})
export class DomainModule {}
