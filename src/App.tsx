import { useReducer, useMemo } from 'react';
import ButtonAppBar from './components/ButtonAppBar';
import { Container, CssBaseline } from '@mui/material';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { State } from './interfaces/interfaces';

type Action =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: number }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'REMOVE_TASK'; payload: number };

export const reducer = (state: State, action: Action): State  => {
  switch(action.type){
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: Date.now(),
            text: action.payload,
            completed: false,
          },
        ],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        ),
      };
    case 'REMOVE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, { tasks: [], filter: '' });

  const addTask = (text: string) => {
    dispatch({ type: 'ADD_TASK', payload: text });
  };

  const toggleTask = (taskId: number) => {
    dispatch({type: 'TOGGLE_TASK', payload: taskId});
  }

  const removeTask = (taskId: number) => {
    dispatch({type: 'REMOVE_TASK', payload: taskId});
  }
  const filterTask = (filter: string) => {
    dispatch({type: 'SET_FILTER', payload: filter})
  }

  const filteredTasks = useMemo(() => {
    switch (state.filter) {
      case 'pending':
        return state.tasks.filter(task => !task.completed);
      case 'completed':
        return state.tasks.filter(task => task.completed);
      default:
        return state.tasks;
    }
  }, [state.tasks, state.filter]);

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
        <TaskList tasks={state.tasks} filteredTasks={filteredTasks} toggleTask={toggleTask} removeTask={removeTask} />
        <TaskFilter filterTask={filterTask} />
      </Container>
    </>
  );
}

export default App;
