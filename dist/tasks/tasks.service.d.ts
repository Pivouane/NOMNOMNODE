import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: Repository<Task>);
    createTask(title: string, description: string): Promise<Task>;
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    updateTask(id: string, title: string, description: string, status: TaskStatus): Promise<Task>;
    deleteTask(id: string): Promise<void>;
}
