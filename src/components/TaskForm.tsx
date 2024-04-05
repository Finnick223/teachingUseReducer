import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { TaskFormProps } from '../interfaces/interfaces';


const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
    const [text, setText] = useState<string>('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (text.trim() !== '') {
          addTask(text);
          setText('');
        }
      };
    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{display: "flex", alignItems: "center", p: 2, width: "60vw"}}>
          <TextField 
          required
          label="Add Todo"
          value={text}
          onChange={e => setText(e.target.value)}
          sx={{width: "45vw", marginRight: "auto"}}
          />
          <Button type='submit' variant="contained" sx={{ width: "15vw", p: 2, marginLeft: "5vw"}}><AddTaskIcon /></Button>
        </Box>
    )
}

export default TaskForm;