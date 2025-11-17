import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import * as client from '@prisma/client';
import { ApiKeyAuthGuard } from 'src/auth/api-key-auth.guard';
import { AuthUser } from 'src/auth/auth-user.decorator';

@UseGuards(ApiKeyAuthGuard)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(
    @Body() createEmployeeDto: client.Prisma.EmployeeCreateInput,
    @AuthUser() user: client.User,
  ) {
    return this.employeesService.create(user.id, createEmployeeDto);
  }

  @Get()
  findAll(@AuthUser() user: client.User, @Query('q') q?: string) {
    return this.employeesService.findAll(user.id, q);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @AuthUser() user: client.User,
  ) {
    return this.employeesService.findOne(user.id, id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeDto: client.Prisma.EmployeeUpdateInput,
    @AuthUser() user: client.User,
  ) {
    return this.employeesService.update(user.id, id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @AuthUser() user: client.User) {
    return this.employeesService.remove(user.id, id);
  }
}
