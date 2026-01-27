import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @ApiProperty({ example: 'Acme Corporation', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'contact@acme.com', required: false })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '+1234567890', required: false })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'Acme Inc.', required: false })
  @IsString()
  @IsOptional()
  company?: string;
}
