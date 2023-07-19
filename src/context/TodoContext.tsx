import React, { createContext } from 'react';
import { nanoid } from 'nanoid';
import { useLocalStorage } from 'usehooks-ts';

interface TodoContextProps {
    todos: Todo[];
    addTodo: (text: string) => void;
    editTodo: (id: string, text: string) => void;
    deleteTodo: (id: string) => void;
    updateTodoStatus: (id: string) => void;
}

export interface Todo {
    id: string;
    text: string;
    status: 'undone' | 'complete';
}

export const TodoContext = createContext<TodoContextProps | undefined>(
    undefined
);

export const TodoProvider = (props: { children: React.ReactNode }) => {
    const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

    // ADD NEW TODO
    const addTodo = (text: string) => {
        const newTodo: Todo = {
            id: nanoid(),
            text,
            status: 'undone',
        };

        setTodos([...todos, newTodo]);
    };

    // EDIT A TODO
    const editTodo = (id: string, text: string) => {
        setTodos((prev) => {
            return prev.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, text };
                }
                return todo;
            });
        });
    };

    // DELETE A TODO
    const deleteTodo = (id: string) => {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    };

    // UPDATE TODO STATUS
    const updateTodoStatus = (id: string) => {
        setTodos((prev) => {
            return prev.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        status:
                            todo.status === 'undone' ? 'complete' : 'undone',
                    };
                }
                return todo;
            });
        });
    };

    const value: TodoContextProps = {
        todos,
        addTodo,
        editTodo,
        deleteTodo,
        updateTodoStatus,
    };

    return (
        <TodoContext.Provider value={value}>
            {props.children}
        </TodoContext.Provider>
    );
};
