import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule, type TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { GlobalChatGateway } from './chat/global-chat.gateway';
import { PrivateChatGateway } from './chat/private-chat.gateway';
import { ProductModule } from './product/product.module';
import { ReportModule } from './report/report.module';
import { ChatModule } from './user-chat/user-chat.module';
import { WalletModule } from './wallet/wallet.module';
import { AdminModule } from './admin/admin.module';

const typeOrmOptions: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    type: 'postgres',
    host: config.get<string>('DB_HOST'),
    port: parseInt(config.get<string>('DB_PORT') ?? '5432', 10),
    username: config.get<string>('DB_USERNAME'),
    password: config.get<string>('DB_PASSWORD'),
    database: config.get<string>('DB_DATABASE'),
    synchronize: true,
    autoLoadEntities: true,
  }),
};

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmOptions),
    AuthModule,
    ProductModule,
    ReportModule,
    ChatModule,
    WalletModule,
    AdminModule,
  ],
  providers: [GlobalChatGateway, PrivateChatGateway],
})
export class AppModule {}
