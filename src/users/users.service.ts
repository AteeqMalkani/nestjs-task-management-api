import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private nextId = 1;

  findByEmail(email: string): User | undefined {
    return this.users.find((user) => user.email === email);
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const existingUser = this.users.find(
      (user) => user.email === createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user: User = {
      id: this.nextId++,
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    this.users.push(user);

    return this.toResponseDto(user);
  }

  findAll(): UserResponseDto[] {
    return this.users.map((user) => this.toResponseDto(user));
  }

  findOne(id: number): UserResponseDto {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toResponseDto(user);
  }

  update(id: number, updateUserDto: UpdateUserDto): UserResponseDto {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.email) {
      const emailExists = this.users.find(
        (existingUser) =>
          existingUser.email === updateUserDto.email && existingUser.id !== id,
      );

      if (emailExists) {
        throw new ConflictException('Email already exists');
      }
    }

    Object.assign(user, updateUserDto);

    return this.toResponseDto(user);
  }

  remove(id: number): { message: string } {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(userIndex, 1);

    return {
      message: 'User deleted successfully',
    };
  }

  private toResponseDto(user: User): UserResponseDto {
    return plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
