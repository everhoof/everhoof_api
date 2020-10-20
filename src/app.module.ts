import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmConfigService } from '@config/typeorm';
import { AccessControlModule } from 'nest-access-control';
import { roles } from './app.roles';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from '@modules/users/users.module';
import { AccountsModule } from '@modules/accounts/accounts.module';
import { TracksModule } from '@modules/tracks/tracks.module';
import { CalendarModule } from '@modules/calendar/calendar.module';
import { StationModule } from '@modules/station/station.module';
import { RecordingsModule } from '@modules/recordings/recordings.module';
import { RolesModule } from '@modules/roles/roles.module';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.env.local'] }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      debug: process.env.NODE_ENV !== 'production',
      autoSchemaFile: join(process.cwd(), './graphql/schema.graphql'),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AccessControlModule.forRoles(roles),
    ScheduleModule.forRoot(),
    UsersModule,
    AccountsModule,
    TracksModule,
    CalendarModule,
    StationModule,
    RecordingsModule,
    RolesModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
