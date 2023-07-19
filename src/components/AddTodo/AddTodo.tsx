import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { MdAddTask } from 'react-icons/md';

import { useTodo } from '../../context';
import { Input } from '../Input';
import './addTodo.scss';

const AddTodo = () => {
    const [input, setInput] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);
    const { addTodo } = useTodo();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() !== '') {
            addTodo(input);
            setInput('');
            toast.success('Todo added successfully!');
        } else {
            toast.error('Todo field cannot be empty!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className='form__input'>
                <Input
                    ref={inputRef}
                    type='text'
                    placeholder='Add a task...'
                    value={input}
                    className='input__box'
                    onChange={(e) => setInput(e.target.value)}
                />
                <button type='submit' className='input__btn'>
                    <MdAddTask className='addTaskIcon' /> Add
                </button>
            </label>
        </form>
    );
};

export default AddTodo;
