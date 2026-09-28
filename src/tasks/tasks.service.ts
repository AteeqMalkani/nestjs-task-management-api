import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private nextId = 1;

  create(createTaskDto: CreateTaskDto, userId: number): TaskResponseDto {
    const task: Task = {
      id: this.nextId++,
      title: createTaskDto.title,
      description: createTaskDto.description,
      completed: false,
      userId,
      createdAt: new Date(),
    };

    this.tasks.push(task);

    return this.toResponseDto(task);
  }

  findAll(userId: number): TaskResponseDto[] {
    return this.tasks
      .filter((task) => task.userId === userId)
      .map((task) => this.toResponseDto(task));
  }

  findOne(id: number, userId: number): TaskResponseDto {
    const task = this.tasks.find(
      (task) => task.id === id && task.userId === userId,
    );

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return this.toResponseDto(task);
  }

  update(
    id: number,
    updateTaskDto: UpdateTaskDto,
    userId: number,
  ): TaskResponseDto {
    const task = this.tasks.find(
      (task) => task.id === id && task.userId === userId,
    );

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    Object.assign(task, updateTaskDto);

    return this.toResponseDto(task);
  }

  remove(id: number, userId: number): { message: string } {
    const taskIndex = this.tasks.findIndex(
      (task) => task.id === id && task.userId === userId,
    );

    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }

    this.tasks.splice(taskIndex, 1);

    return {
      message: 'Task deleted successfully',
    };
  }

  private toResponseDto(task: Task): TaskResponseDto {
    return plainToInstance(TaskResponseDto, task, {
      excludeExtraneousValues: true,
    });
  }
}
