
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";



import { useState } from "react";
import {useEffect} from 'react'
import axios from 'axios'
export default function Drag() {
  const [users, setUsers] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"))
  const config={
      headers:{
      Authorization:`Bearer ${token}`
      }
    }
  useEffect(()=>{
   
    axios.get('http://localhost:8008/item/',config).then(response=>{
  setUsers(response.data)
    })
   },[])
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(users);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setUsers(tempData);
  };
  return (
    <div className="App mt-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <table className="table borderd">
          <thead>
            <tr>
              <th />
              <th>Username</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <Droppable droppableId="droppable-1">
            {(provider) => (
              <tbody
                className="text-capitalize"
                ref={provider.innerRef}
                {...provider.droppableProps}
              >
                {users?.map((user, index) => (
                  <Draggable
                    key={user._id}
                    draggableId={user._d}
                    index={index}
                  >
                    {(provider) => (
                      <tr {...provider.draggableProps} ref={provider.innerRef}>
                        <td {...provider.dragHandleProps}> = </td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provider.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
    </div>
  );
}
