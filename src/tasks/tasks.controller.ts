import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.entity';
import { validate as IsUUID } from 'uuid';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(): Promise<Task[]> {
    try {
      return this.tasksService.getAllTasks();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error getting tasks',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  async getTaskById(@Param('id') id: string): Promise<Task> {
    if (!IsUUID(id)) throw new BadRequestException('Invalid UUID format');

    try {
      return this.tasksService.getTaskById(id);
    } catch (error) {
      if (error.message === 'Task does not exist') {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Task not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error getting task',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Post('')
  async createTask(
    @Body('title') title: string,
    @Body('description') description: string,
  ): Promise<Task> {
    try {
      return this.tasksService.createTask(title, description);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error creating task',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: string): Promise<void> {
    if (!IsUUID(id)) throw new BadRequestException('Invalid UUID format');

    try {
      return this.tasksService.deleteTask(id);
    } catch (error) {
      if (error.message === 'Task does not exist') {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Task not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error deleting task',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Put(':id')
  async updateTask(
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('status') status: string,
    @Param('id') id: string,
  ): Promise<Task> {
    if (!IsUUID(id)) throw new BadRequestException('Invalid UUID format');

    try {
      return this.tasksService.updateTask(
        id,
        title,
        description,
        TaskStatus[status],
      );
    } catch (error) {
      if (error.message === 'Task does not exist') {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: 'Task not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Error updating task',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }
}
