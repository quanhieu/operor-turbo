import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { MeetingsModule } from './meetings/meetings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
      load: [configuration],
      isGlobal: true,
    }),
    // MongooseModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => ({
    //     uri: configService.get<string>('MONGODB_URI'),
    //   }),
    //   inject: [ConfigService],
    // }),
    MongooseModule.forRoot(`${process.env.MONGODB_URI}`, {
      connectionFactory: (connection) => {
        connection.plugin(mongoosePaginate);
        return connection;
      },
      autoIndex: true,
    }),
    UsersModule,
    MeetingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
