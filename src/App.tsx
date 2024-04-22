import { useReducer, useState, useMemo } from 'react';
import ButtonAppBar from './components/ButtonAppBar';
import { Container, CssBaseline } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { Task } from './interfaces/interfaces';

type Action =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: number }
  // | { type: 'FILTER_TASK'; payload: string }
  | { type: 'REMOVE_TASK'; payload: number };

export const reducer = (state: Task[], action: Action): Task[]  => {
  switch(action.type){
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];
    case 'TOGGLE_TASK':
      return state.map(task => 
        task.id === action.payload ? {...task, completed: !task.completed } : task
      )
    case 'REMOVE_TASK':
      return state.filter(task => task.id !== action.payload);
    // case 'FILTER_TASK':
    //   if(action.payload==='all'){
    //     return state
    //   }
    //   else if(action.payload==='pending'){
    //     return state.filter(task => !task.completed)
    //   }
    //   else if(action.payload==='completed'){
    //     return state.filter(task => task.completed)
    //   }
    default:
      return state;
  }
}

function App() {
  const [tasks, dispatch] = useReducer(reducer, []);
  const [filter, setFilter] = useState<string>('all');

  const addTask = (text: string) => {
    dispatch({ type: 'ADD_TASK', payload: text });
  };

  const toggleTask = (taskId: number) => {
    dispatch({type: 'TOGGLE_TASK', payload: taskId});
  }

  const removeTask = (taskId: number) => {
    dispatch({type: 'REMOVE_TASK', payload: taskId});
  }
  // const filterTask = (filter: string) => {
  //   dispatch({type: 'FILTER_TASK', payload: filter})
  // }
  const filterTask = (filter: string) => {
    setFilter(filter)
  }
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'all':
        return tasks;
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <>
      <CssBaseline />
      <ButtonAppBar />
      <Container
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "nowrap",
          marginTop: "40px"
        }}
      >
        <TaskForm addTask={addTask} />
        <TaskList tasks={tasks} filteredTasks={filteredTasks} toggleTask={toggleTask} removeTask={removeTask} />
        <TaskFilter filterTask={filterTask} />
      </Container>
    </>
  );
}

export default App;
