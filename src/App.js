import React,{useState,useEffect} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs'

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddTodo = ()=>{
    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updatedTodoArray = [...allTodos];
    updatedTodoArray.push(newTodoItem);
    setTodos(updatedTodoArray);

    localStorage.setItem('todolist',JSON.stringify(updatedTodoArray));
  };

  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    if(savedTodo){
      setTodos(savedTodo);
    }
  },[]);

  return (
    <div className="App">
      <h1>My TODOs</h1>

      <div className="todo-wrapper"> 
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task title?"/>
          </div>

          <div className="todo-input-item">
            <label>Description</label>
            <input type="text" value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}  placeholder="What's the description?"/>
          </div>

          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primary-btn">Add</button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`secondary-btn ${isCompleteScreen === false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
          <button className={`secondary-btn ${isCompleteScreen === true && 'active'}`} onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className="todo-list">
          
          {allTodos.map((item, index) => {
            return(
              <div className="todo-list-item" key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <div>
            <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} title="Delete?"/>
            <BsCheckLg className='check-icon'/>
          </div>
          </div>
            )
          })}

        </div>
      </div>
    </div>
  );
}

export default App;
