import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Learn NestJS',
    description: 'Title of the task',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @ApiPropertyOptional({
    example: 'Complete JWT authentication',
    description: 'Optional task description',
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;
}
