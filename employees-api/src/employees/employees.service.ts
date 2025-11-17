import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(userId: number, createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.databaseService.employee.create({
      data: { ...createEmployeeDto, createdBy: { connect: { id: userId } } },
    });
  }

  async findAll(userId: number, q?: string, page = 1, limit = 10) {
    const filters: Prisma.EmployeeWhereInput = q
      ? { OR: [{ firstName: { contains: q } }, { lastName: { contains: q } }] }
      : {};

    const where: Prisma.EmployeeWhereInput = {
      ...filters,
      createdById: userId,
    };

    const take = Math.max(1, Math.min(100, Number(limit) || 10));
    const currentPage = Math.max(1, Number(page) || 1);
    const skip = (currentPage - 1) * take;

    const [total, items] = await Promise.all([
      this.databaseService.employee.count({ where }),
      this.databaseService.employee.findMany({
        where,
        skip,
        take,
        orderBy: { id: 'asc' },
      }),
    ]);

    const hasMore = currentPage * take < total;

    return {
      items,
      total,
      page: currentPage,
      hasMore,
    };
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
