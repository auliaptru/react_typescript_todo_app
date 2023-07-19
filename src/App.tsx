import { Toaster } from 'react-hot-toast';
import { FcTodoList } from 'react-icons/fc';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';

import './app.scss';

const App = () => {
    return (
        <div className='app'>
            <h1 className='app__title'>
                <FcTodoList className='todoIcon' />
                <span style={{ color: '#545AA7' }}>To</span>
                <span style={{ color: 'lightblue' }}>Do</span>
            </h1>
            <Toaster position='bottom-center' />
            <div className='app__wrapper'>
                <AddTodo />
                <TodoList />
            </div>
        </div>
    );
};

export default App;
