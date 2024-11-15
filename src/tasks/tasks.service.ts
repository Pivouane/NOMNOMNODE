import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Task, TaskStatus } from './task.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async createTask(title: string, description: string): Promise<Task> {
    const task = this.tasksRepository.create({ title, description, status: TaskStatus.OPEN });
    return await this.tasksRepository.save(task);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne({where: {id}});
    if (!task) {
      throw new NotFoundException('Task does not exist');
    }
    return task;
  }

  async updateTask(id: string, title: string, description: string, status: TaskStatus): Promise<Task> {
    await this.tasksRepository.update(id, { title, description, status });

    const updatedTask = await this.tasksRepository.findOne({ where: { id } });
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return updatedTask;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete({
      id
    });
    if (result.affected === 0)
      throw new NotFoundException('Task does not exist');
  }
}
