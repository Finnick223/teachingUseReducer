import React from 'react';
import { Paper, Checkbox, Typography, Button } from '@mui/material';

interface Task {
    id: number;
    text: string;
    completed: boolean;
  }

interface TaskItemProps {
  task: Task;
  toggleTask: (taskId: number) => void;
  removeTask: (taskId: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, toggleTask, removeTask }) => {
  const { id, text, completed } = task;

  return (
    <>
        <Paper elevation={8} sx={{width: "57vw", height: "10vh", m: 3, display: "flex", alignItems: "center"}}>
            <Checkbox 
                size='large'
                checked={completed}
                onChange={() => toggleTask(id)}
            />
            <Typography variant="h5" sx={{ textDecoration: completed ? 'line-through' : 'none', ml: 4 ,mr: 'auto' }}>
                {text}
            </Typography>
            <Button onClick={() => removeTask(id)} variant='contained' sx={{mr: 2}}>
                Delete
            </Button>
        </Paper>
    </>
  );
};

export default TaskItem;
