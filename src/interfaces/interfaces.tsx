export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

export interface State {
    tasks: Task[];
    filter: string;
  };
export interface TaskListProps {
    tasks: Task[];
    filteredTasks: Task[];
    toggleTask: (taskId: number) => void;
    removeTask: (taskId: number) => void;
}

export interface TaskItemProps {
    task: Task;
    toggleTask: (taskId: number) => void;
    removeTask: (taskId: number) => void;
}

export interface TaskFormProps {
    addTask: (text: string) => void;
}

export interface TaskFilterProps {
    filterTask: (filterType: string) => void;
}
