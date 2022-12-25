import {useEffect, useState} from 'react'
import io from 'socket.io-client'
import './App.css';

let socket;
const CONNECTION_PORT='localhost:3002/'

function App() {

  //befor login
  const [loggedIn,setLoggedIn]= useState(false);
  const [room, setRoom] = useState('');
  const [userName, setUserName] = useState('')

  //After login
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  useEffect(()=>{
    socket=io(CONNECTION_PORT)
  },[CONNECTION_PORT])

  const connectToRoom=()=>{
    setLoggedIn(true);
    socket.emit('join_room',room)
  }

  const sendMessage=()=>{
let messageContent={
room:room,
content:{
author:userName,
message:message,
}
}

    socket.emit('send_message',messageContent);
    setMessageList([...messageList,messageContent.content])
    setMessage('')
  }
  return (
    <div className="App">
     
     {!loggedIn ? (
     <div className='logedIn'>
      <div>
      <input type="text"  placeholder='Name...' onChange={(e)=>{setUserName(e.target.value)}}/>
      <input type="text"  placeholder='Room...'onChange={(e)=>{setRoom(e.target.value)}}/>
      </div>
      <button onClick={connectToRoom}>Enter chat</button>
     </div>
     ):(
     <div className='chatContainer'>
      <div className="messages">
        {messageList.map((val,key)=>{
          return <h1>{val.author} {val.message}</h1>
        })}
      </div>

      <div className="messageInput">
        <input type="text" placeholder='message...' onChange={(e)=>{setMessage(e.target.value)}}/>
        <button onClick={sendMessage}>Send</button>
      </div>

     </div>
     )}
   
    </div>
  );
}

export default App;
