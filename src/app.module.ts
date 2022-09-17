import path from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ScheduleModule } from '@nestjs/schedule';

import { CalendarModule } from '~/modules/calendar/calendar.module';
import { StationModule } from '~/modules/station/station.module';
import { TracksModule } from '~/modules/tracks/tracks.module';

import { AppResolver } from './app.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.env.local'] }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: path.join(process.cwd(), './graphql/schema.graphql'),
    }),
    ScheduleModule.forRoot(),
    TracksModule,
    CalendarModule,
    StationModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
