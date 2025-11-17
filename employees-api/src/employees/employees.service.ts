import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: number, createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: { ...createEmployeeDto, createdBy: { connect: { id: userId } } },
    });
  }

  async findAll(userId: number, q?: string) {
    const filters: Prisma.EmployeeWhereInput = q
      ? { OR: [{ firstName: { contains: q } }, { lastName: { contains: q } }] }
      : {};

    return this.databaseService.employee.findMany({
      where: { ...filters, createdById: userId },
    });
  }

  async findOne(userId: number, id: number) {
    return this.databaseService.employee.findUnique({
      where: { id, createdById: userId },
    });
  }

  async update(
    userId: number,
    id: number,
    updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.databaseService.employee.update({
      where: { id, createdById: userId },
      data: updateEmployeeDto,
    });
  }

  async remove(userId: number, id: number) {
    return this.databaseService.employee.delete({
      where: { id, createdById: userId },
    });
  }
}
