import { render, screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import TaskList from '../components/TaskList';

describe('TaskList component', () => {
  const tasks = [
    { id: 1, text: 'Task 1', completed: false },
    { id: 2, text: 'Task 2', completed: true },
  ];

  const filteredTasks = tasks.filter(task => !task.completed);

  const toggleTask = jest.fn();
  const removeTask = jest.fn();

  it('renders list of tasks', () => {
    const { getByText } = render(<TaskList tasks={tasks} filteredTasks={tasks} toggleTask={toggleTask} removeTask={removeTask} />);
    
    expect(getByText('Task 1')).toBeTruthy();
    expect(getByText('Task 2')).toBeTruthy();
  });

  it('filters tasks correctly', () => {
    const { queryByText } = render(<TaskList tasks={tasks} filteredTasks={filteredTasks} toggleTask={toggleTask} removeTask={removeTask} />);
    
    expect(queryByText('Task 1')).toBeTruthy();
    expect(queryByText('Task 2')).not.toBeTruthy();
  });


  it('passes toggleTask and removeTask functions to TaskItem components', () => {
    const mockToggleTask = jest.fn();
    const mockRemoveTask = jest.fn();
  
    const { getByRole, getByText } = render(
      <TaskList
        tasks={tasks}
        filteredTasks={filteredTasks}
        toggleTask={mockToggleTask}
        removeTask={mockRemoveTask}
      />
    );
  
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
  
    expect(mockToggleTask).toHaveBeenCalledWith(tasks[0].id);
  
    const deleteButton = getByText('Delete');
    fireEvent.click(deleteButton);
  
    expect(mockRemoveTask).toHaveBeenCalledWith(tasks[0].id);
  });
  
  it('displays correct number of tasks to complete', () => {
    render(<TaskList tasks={tasks} filteredTasks={filteredTasks} toggleTask={toggleTask} removeTask={removeTask} />);
    
    const typographyElement = screen.getByText(/Tasks waiting to complete:/i);
    expect(typographyElement).toBeTruthy();
    expect(typographyElement.textContent).toContain(`Tasks waiting to complete: ${tasks.filter(task => !task.completed).length}`);
  });
  
});
