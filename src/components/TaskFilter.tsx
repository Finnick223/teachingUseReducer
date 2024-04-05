import { ButtonGroup, Button } from '@mui/material';
import { TaskFilterProps } from '../interfaces/interfaces';

  
const TaskFilter: React.FC<TaskFilterProps> = ({ filterTask }) => {
    const handleClick = (e: any) => {
        filterTask(e.target.value)
    }
  return (
    <ButtonGroup sx={{display: "flex", flexDirection: {xs: "column", md: "row"}}}>
        <Button onClick={handleClick} variant="contained" sx={{ width: {xs: "60vw",md: "15vw"}, px: 6, py: 2, my: 0.5}}>ALL</Button>
        <Button onClick={handleClick} value={'pending'} variant="contained" sx={{ width: {xs: "60vw",md: "15vw"}, px: 6, py: 2, my: 0.5}}>PENDING</Button>
        <Button onClick={handleClick} value={'completed'} variant="contained" sx={{ width: {xs: "60vw",md: "15vw"}, px: 6, py: 2, my: 0.5}}>COMPLETED</Button>
  </ButtonGroup>
  );
};

export default TaskFilter;