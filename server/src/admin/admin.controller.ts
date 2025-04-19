import {
  Controller,
  UseGuards,
  Get,
  Delete,
  Param,
  Patch,
  Body,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { AdminGuard } from './guard/admin.guard';
import { AdminService } from './admin.service';

@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getAllUsers(@Req() req: any) {
    return this.adminService.findAllUsersExcept(req.user.sub);
  }

  @Patch('users/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    update: { introduce?: string; banUntil?: string; username?: string },
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

  @Get('reports/products')
  getProductReports() {
    return this.adminService.getAllProductReports();
  }

  @Get('reports/users')
  getUserReports() {
    return this.adminService.getAllUserReports();
  }

  @Delete('report/product/:id')
  deleteProductReport(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.removeProductReport(id);
  }

  @Delete('report/user/:id')
  deleteUserReport(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.removeUserReport(id);
  }
}
