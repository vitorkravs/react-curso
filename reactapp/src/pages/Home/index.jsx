import React, {useState, useEffect} from 'react';
import './style.css';

import { Card } from '../../components/Card';

function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({name: '', avatar: ''})

  function handleAddStudent(){
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudents([...students, newStudent])
    console.log(students)
  }

  useEffect(() => {
    async function fetchData(){
      const response = await fetch('https://api.github.com/users/vitorkravs')
      const data = await response.json()
      console.log("DADOS!!", data)
      setUser({
        name: data.login,
        avatar: data.avatar_url
      })
    }

    fetchData()

  },[students, studentName])

  return (
    <div className="container">
      <header>
        <h2>Lista de presença</h2>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
      <input type="text" placeholder="Digite seu nome: " onChange={e => setStudentName(e.target.value)}/>
      <button type="button" onClick={handleAddStudent}>Adicionar</button>
      
      {
        students.map(student => <Card key={student.name} name={student.name} time={student.time}/>)
      }
    </div>
  )
}

export default Home
