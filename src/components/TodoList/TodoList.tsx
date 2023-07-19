import { motion } from 'framer-motion';
import { useTodo } from '../../context';
import { BsFillPatchCheckFill } from 'react-icons/bs';

import { TodoItem } from '../TodoItem/TodoItem';
import './todoList.scss';

const TodoList = () => {
    const { todos } = useTodo();

    const todosComplete = todos.filter((todo) => todo.status === 'complete');

    return (
        <div>
            <div className='todos__total'>
                <h5>
                    Todo list: <span>{todos.length}</span>
                </h5>
                <h5>
                    Task completed: {todosComplete.length} of {todos.length}
                </h5>
            </div>
            <span></span>
            {!todos.length ? (
                <div className='todos__nothing'>
                    <h1>
                        <BsFillPatchCheckFill className='checkIcon' />
                        You have nothing to do!
                    </h1>
                </div>
            ) : (
                <motion.ul className='todos__lists'>
                    {todos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </motion.ul>
            )}
        </div>
    );
};

export default TodoList;
