import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TaskResponseDto {
  @ApiProperty({
    example: 1,
  })
  @Expose()
  id: number;

  @ApiProperty({
    example: 'Learn NestJS',
  })
  @Expose()
  title: string;

  @ApiPropertyOptional({
    example: 'Complete JWT authentication',
  })
  @Expose()
  description?: string;

  @ApiProperty({
    example: false,
  })
  @Expose()
  completed: boolean;

  @ApiProperty({
    example: 1,
  })
  @Expose()
  userId: number;

  @ApiProperty({
    example: '2026-09-27T16:30:00.000Z',
  })
  @Expose()
  createdAt: Date;
}
