import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus, Role } from '@prisma/client';

export class TaskUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}

export class TaskCustomerDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;
}

export class TaskResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty({ enum: TaskStatus })
  status: TaskStatus;

  @ApiProperty()
  assignedTo: string;

  @ApiProperty()
  customerId: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: TaskUserDto })
  user: TaskUserDto;

  @ApiProperty({ type: TaskCustomerDto })
  customer: TaskCustomerDto;
}
