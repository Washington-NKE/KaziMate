import React,{useState} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs'

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  
  return (
    <div className="App">
      <h1>My TODOs</h1>

      <div className="todo-wrapper"> 
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" placeholder="What's the task title?"/>
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" placeholder="What's the description?"/>
          </div>

          <div className="todo-input-item">
            <button type="button" className="primary-btn">Add</button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`secondary-btn ${isCompleteScreen === false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondary-btn ${isCompleteScreen === true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className="todo-list">
          <div className="todo-list-item">
            <div>
              <h3>Task 1</h3>
              <p>Description</p>
            </div>

            <div>
            <AiOutlineDelete className='icon'/>
            <BsCheckLg className='check-icon'/>
          </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;
