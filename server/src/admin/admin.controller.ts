import {
  Controller,
  UseGuards,
  Get,
  Delete,
  Param,
  Patch,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { AdminGuard } from './guard/admin.guard';
import { AdminService } from './admin.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getAllUsers() {
    return this.adminService.findAllUsers();
  }

  @Patch('users/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() update: { introduce?: string; banUntil?: string },
  ) {
    return this.adminService.updateUser(id, update);
  }

  @Delete('users/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.removeUser(id);
  }

  @Get('products')
  getAllProducts() {
    return this.adminService.findAllProducts();
  }

  @Delete('products/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.removeProduct(id);
  }
}
