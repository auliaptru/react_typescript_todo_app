import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { MdOutlineDelete } from 'react-icons/md';
import { BiEdit } from 'react-icons/bi';
import cn from 'classnames';

import { Todo } from '../../context/TodoContext';
import { useTodo } from '../../context';
import { Input } from '../Input';
import './todoItem.scss';

export const TodoItem = (props: { todo: Todo }) => {
    const { todo } = props;

    const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
    const [editingTodoText, setEditingTodoText] = useState<string>('');

    const { deleteTodo, editTodo, updateTodoStatus } = useTodo();

    const editInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editingTodoId !== null && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [editingTodoId]);

    const handleEditTodo = (todoId: string, todoText: string) => {
        setEditingTodoId(todoId);
        setEditingTodoText(todoText);

        if (editInputRef.current) {
            editInputRef.current.focus();
        }
    };

    const handleUpdateTodo = (todoId: string) => {
        if (editingTodoText.trim() != '') {
            editTodo(todoId, editingTodoText);
            setEditingTodoId(null);
            setEditingTodoText('');
            toast.success('Todo updated successfully!');
        } else {
            toast.error('Todo field cannot be empty!');
        }
    };

    const handleDelete = (todoId: string) => {
        deleteTodo(todoId);
        toast.success('Todo deleted successfully!');
    };

    const handleStatusUpdate = (todoId: string) => {
        updateTodoStatus(todoId);

        toast.success('Todo status updated successfully!');
    };

    return (
        <motion.li
            layout
            className={cn(
                'todoItem',
                todo.status === 'complete' && 'todoItem__completed'
            )}
        >
            {editingTodoId === todo.id ? (
                <motion.div className='todoItem__edit'>
                    <Input
                        ref={editInputRef}
                        type='text'
                        value={editingTodoText}
                        className='input'
                        onChange={(e) => setEditingTodoText(e.target.value)}
                    />
                    <button onClick={() => handleUpdateTodo(todo.id)}>
                        Update
                    </button>
                </motion.div>
            ) : (
                <div className='todoItem__status'>
                    <motion.div
                        className='todoItem__text'
                        layout
                        style={{
                            textDecoration:
                                todo.status === 'complete'
                                    ? 'line-through'
                                    : 'none',
                        }}
                    >
                        <input
                            className='checkbox'
                            type='checkbox'
                            name='text'
                            id='text'
                            onClick={() => handleStatusUpdate(todo.id)}
                            checked={todo.status === 'undone' ? false : true}
                        />
                        <label htmlFor='text'>{todo.text}</label>
                    </motion.div>

                    <div className='todoItem__update'>
                        <button
                            onClick={() => handleEditTodo(todo.id, todo.text)}
                        >
                            <BiEdit className='updateIcon' /> Edit
                        </button>
                        <button onClick={() => handleDelete(todo.id)}>
                            <MdOutlineDelete className='updateIcon' /> Delete
                        </button>
                    </div>
                </div>
            )}
        </motion.li>
    );
};
