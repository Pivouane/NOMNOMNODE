import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.entity';
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getAllTasks(): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    createTask(title: string, description: string): Promise<Task>;
    deleteTask(id: string): Promise<void>;
    updateTask(title: string, description: string, status: TaskStatus, id: string): Promise<Task>;
}
