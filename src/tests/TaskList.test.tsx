import { render } from '@testing-library/react';
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
  
    const { getByText } = render(
      <TaskList
        tasks={tasks}
        filteredTasks={filteredTasks}
        toggleTask={mockToggleTask}
        removeTask={mockRemoveTask}
      />
    );
  
    // Znajdujemy element zawierający tekst "Task 1" i symulujemy na nim kliknięcie
    fireEvent.click(getByText('Task 1'));
  
    // Sprawdzamy, czy funkcja toggleTask została wywołana z odpowiednim id zadania
    expect(mockToggleTask).toHaveBeenCalledWith(tasks[0].id);
  
    // Symulujemy kliknięcie na przycisku usuwania
    fireEvent.click(getByText('Delete'));
  
    // Sprawdzamy, czy funkcja removeTask została wywołana z odpowiednim id zadania
    expect(mockRemoveTask).toHaveBeenCalledWith(tasks[0].id);
});

//   it('displays correct number of tasks to complete', () => {
//     const { container } = render(<TaskList tasks={tasks} filteredTasks={filteredTasks} toggleTask={toggleTask} removeTask={removeTask} />);
    
//     expect(container.querySelector('Typography')?.textContent).toContain('Tasks waiting to complete: 1');
// });
});
