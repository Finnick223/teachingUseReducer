import { render, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';

describe('TaskForm component', () => {
  test('renders correctly', () => {
    const { getByTestId, getByRole } = render(<TaskForm addTask={() => {}} />);
    
    // Sprawdź, czy pole tekstowe jest renderowane z odpowiednim etykietą
    const inputElement = getByRole('textbox') as HTMLInputElement;
    expect(inputElement).toBeTruthy();
    
    // Sprawdź, czy przycisk jest renderowany z odpowiednią ikoną
    const buttonElement = getByTestId('AddTaskIcon');
    expect(buttonElement).toBeTruthy();
    // expect(buttonElement.querySelector('svg')).toBeTruthy();
  });

  test('handles form submission correctly', () => {
    const addTaskMock = jest.fn();
    const { getByRole } = render(<TaskForm addTask={addTaskMock} />);

    const inputElement = getByRole('textbox') as HTMLInputElement;
    const buttonElement = getByRole('button');

    // Wpisz tekst w pole tekstowe
    fireEvent.change(inputElement, { target: { value: 'New Task' } });

    // Kliknij przycisk
    fireEvent.click(buttonElement);

    // Sprawdź, czy funkcja addTask została wywołana z poprawnym argumentem
    expect(addTaskMock).toHaveBeenCalledWith('New Task');

    // Sprawdź, czy pole tekstowe zostało wyczyszczone po zatwierdzeniu formularza
    expect(inputElement.value).toBe('');
  });

  test('does not call addTask if input is empty', () => {
    const addTaskMock = jest.fn();
    const { getByRole } = render(<TaskForm addTask={addTaskMock} />);

    const buttonElement = getByRole('button');

    // Kliknij przycisk bez wprowadzania tekstu
    fireEvent.click(buttonElement);

    // Sprawdź, czy funkcja addTask nie została wywołana
    expect(addTaskMock).not.toHaveBeenCalled();
  });
});
