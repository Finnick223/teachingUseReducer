import TaskItem from './TaskItem';
import { Box, Typography } from '@mui/material';
import { TaskListProps } from '../interfaces/interfaces';


const TaskList: React.FC<TaskListProps> = ({ tasks, filteredTasks, toggleTask, removeTask }) => {
  return (
    <Box>
        {filteredTasks.map(task => (
          <TaskItem
          key={task.id}
          task={task}
          toggleTask={toggleTask}
          removeTask={removeTask}
          />
        ))}
        <Typography sx={{m: 3, display: "flex", justifyContent: "center"}}>Tasks waiting to complete: {tasks.filter(task => !task.completed).length}</Typography>
    </Box>
  );
};

export default TaskList;
