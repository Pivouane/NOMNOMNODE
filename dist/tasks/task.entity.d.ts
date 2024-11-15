export declare enum TaskStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}
export declare class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}
