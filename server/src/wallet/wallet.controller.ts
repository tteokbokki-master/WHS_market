import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { JwtAuthGuard } from '../auth/jwt/jwt.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
  user: { sub: number };
}

@Controller('wallet')
@UseGuards(JwtAuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  getMyWallet(@Req() req: AuthenticatedRequest) {
    return this.walletService.getWallet(req.user.sub);
  }

  @Post('transfer')
  transfer(
    @Req() req: AuthenticatedRequest,
    @Body() body: { toUserId: number; amount: number },
  ) {
    return this.walletService.transfer(
      req.user.sub,
      body.toUserId,
      body.amount,
    );
  }
}
