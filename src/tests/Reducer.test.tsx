import { reducer } from '../App';
import { Task } from '../interfaces/interfaces';

type Action =
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: number }
  | { type: 'REMOVE_TASK'; payload: number };

describe('Reducer', () => {
  it('should add a task', () => {
    const initialState: Task[] = [];
    const action: Action = { type: 'ADD_TASK', payload: 'Test Task' };
    const newState = reducer(initialState, action);
    expect(newState.length).toBe(1);
    expect(newState[0].text).toBe('Test Task');
  });

  it('should toggle task completion', () => {
    const initialState = [{ id: 1, text: 'Test Task', completed: false }];
    const action: Action = { type: 'TOGGLE_TASK', payload: 1 };
    const newState = reducer(initialState, action);
    expect(newState[0].completed).toBe(true);
  });

  it('should remove a task', () => {
    const initialState = [{ id: 1, text: 'Test Task', completed: false }];
    const action: Action = { type: 'REMOVE_TASK', payload: 1 };
    const newState = reducer(initialState, action);
    expect(newState.length).toBe(0);
  });
});
