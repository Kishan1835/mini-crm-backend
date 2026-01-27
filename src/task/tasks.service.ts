import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import { Role } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<TaskResponseDto> {
    // Verify assigned user exists and is an EMPLOYEE
    const assignedUser = await this.prisma.user.findUnique({
      where: { id: createTaskDto.assignedTo },
    });

    if (!assignedUser) {
      throw new NotFoundException('Assigned user not found');
    }

    if (assignedUser.role !== Role.EMPLOYEE) {
      throw new BadRequestException('Tasks can only be assigned to employees');
    }

    // Verify customer exists
    const customer = await this.prisma.customer.findUnique({
      where: { id: createTaskDto.customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // Create task
    const task = await this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        assignedTo: createTaskDto.assignedTo,
        customerId: createTaskDto.customerId,
        status: createTaskDto.status || 'PENDING',
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return task;
  }

  async findAll(userId: string, userRole: Role): Promise<TaskResponseDto[]> {
    const where = userRole === Role.EMPLOYEE ? { assignedTo: userId } : {};

    return this.prisma.task.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async updateStatus(
    taskId: string,
    updateTaskStatusDto: UpdateTaskStatusDto,
    userId: string,
    userRole: Role,
  ): Promise<TaskResponseDto> {
    // Find task
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Check permissions - employees can only update their own tasks
    if (userRole === Role.EMPLOYEE && task.assignedTo !== userId) {
      throw new ForbiddenException('You can only update tasks assigned to you');
    }

    // Update task status
    return this.prisma.task.update({
      where: { id: taskId },
      data: { status: updateTaskStatusDto.status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }
}
