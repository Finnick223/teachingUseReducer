import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from '../components/TaskItem';
// import { Task, TaskItemProps } from '../interfaces/interfaces';

const mockTask = {
  id: 1,
  text: 'Test task',
  completed: false
};

test('renders task item correctly', () => {
  render(<TaskItem task={mockTask} toggleTask={() => {}} removeTask={() => {}} />);
  
  const taskText = screen.getByText('Test task');
  expect(taskText).toBeTruthy();
  
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).toBeTruthy();
  expect(checkbox.getAttribute('checked')).toBe(null);
  
  const deleteButton = screen.getByRole('button', { name: 'Delete' });
  expect(deleteButton).toBeTruthy();
});

test('toggle task checkbox', () => {
  const toggleTaskMock = jest.fn();
  render(<TaskItem task={mockTask} toggleTask={toggleTaskMock} removeTask={() => {}} />);
  
  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);
  
  expect(toggleTaskMock).toHaveBeenCalledWith(1);
});

test('remove task', () => {
  const removeTaskMock = jest.fn();
  render(<TaskItem task={mockTask} toggleTask={() => {}} removeTask={removeTaskMock} />);
  
  const deleteButton = screen.getByRole('button', { name: 'Delete' });
  fireEvent.click(deleteButton);
  
  expect(removeTaskMock).toHaveBeenCalledWith(1);
});
