import React,{useState,useEffect} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';
import {AiOutlineEdit} from 'react-icons/ai';

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos,setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditedItem, setCurrentEditedItem] = useState("");


  const handleAddTodo = ()=>{
    if(newTitle.trim() === "") return;

    let newTodoItem = {
      title: newTitle,
      description: newDescription
    }

    let updatedTodoArray = [...allTodos];
    updatedTodoArray.push(newTodoItem);
    setTodos(updatedTodoArray);

    localStorage.setItem('todolist',JSON.stringify(updatedTodoArray));

    setNewTitle("");
    setNewDescription("");
  };

  const handleDeleteTodo = (index)=>{
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }

  const handleCompletedTodos = (index)=>{
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + '-' + mm + '-' + yyyy + ' at ' + h + ' :' + m + ' :' + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn
    }

    let updatedCompletedArray = [...completedTodos];
    updatedCompletedArray.push(filteredItem);
    setCompletedTodos(updatedCompletedArray);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArray));
  }

  const handleDeleteCompletedTodo = (index)=>{
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  }

  useEffect(()=>{
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if(savedTodo){
      setTodos(savedTodo);
    }

    if(savedCompletedTodo){
      setCompletedTodos(savedCompletedTodo);
    }
  },[]);

  const handleEdit = (index,item)=>{
    setCurrentEdit(index);
    setCurrentEditedItem(item);
  }

  const handleUpdateTitle = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,title:value}
    })
  }

  const handleUpdateDescription = (value)=>{
    setCurrentEditedItem((prev)=>{
      return {...prev,description:value}
    })
  }

  const handleUpdateTodo = ()=>{
    let newTodo = [...allTodos];
    newTodo[currentEdit] = currentEditedItem;
    setTodos(newTodo);
    setCurrentEdit("");
  }


  return (
    <div className="App">
      <h1>My Tasks</h1>

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
          
          {isCompleteScreen=== false && allTodos.map((item, index) => {
            if(currentEdit===index){
             return( 
              <div className='edit-wrapper' key={index}>
                <input placeholder='updated Title' onChange={(e)=>handleUpdateTitle(e.target.value)} value={currentEditedItem.title}/>
                <textarea placeholder='updated Title' onChange={(e)=>handleUpdateDescription(e.target.value)} value={currentEditedItem.description }/>

                <button type="button" onClick={handleUpdateTodo} className="primary-btn">update</button>
              </div>);
            } else{
            return(
              <div className="todo-list-item" key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>

            <div>
            <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)} title="Delete?"/>
            <BsCheckLg className='check-icon' onClick={()=>handleCompletedTodos(index)} title='complete?'/>
              <AiOutlineEdit className="check-icon"  onClick={()=> handleEdit(index,item)} title="Edit?"/>
          </div>
          </div>
            )}
          })}
      
          {isCompleteScreen=== true && completedTodos.map((item, index) => {
            return(
              <div className="todo-list-item" key={index}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><i>Completed on: {item.completedOn}</i></p>
            </div>

            <div>
            <AiOutlineDelete className='icon' onClick={()=>handleDeleteCompletedTodo(index)} title="Delete?"/>     
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
