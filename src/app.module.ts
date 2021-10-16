import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmConfigService } from '@common/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { TracksModule } from '@modules/tracks/tracks.module';
import { CalendarModule } from '@modules/calendar/calendar.module';
import { StationModule } from '@modules/station/station.module';
import { RecordingsModule } from '@modules/recordings/recordings.module';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env', '.env.local'] }),
    GraphQLModule.forRoot({
      context: ({ req }) => ({ req }),
      debug: process.env.NODE_ENV !== 'production',
      playground: process.env.NODE_ENV !== 'production',
      autoSchemaFile: join(process.cwd(), './graphql/schema.graphql'),
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ScheduleModule.forRoot(),
    TracksModule,
    CalendarModule,
    StationModule,
    RecordingsModule,
  ],
  providers: [AppResolver],
})
export class AppModule {}
