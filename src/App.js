import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);

  useEffect(()=>{
    fetch("https://www.hatchways.io/api/assessment/students")
      .then(response => response.json())
      .then(json => setStudents(json.students.map((student)=>student={...student, ["open"]:false, ["tags"]:[]})))
  }, [])

  return (
    <div className="App">
      <div className="container">
        <ul className="list-group">

          {students.map((student, index) =>
          <div key={student.id}>
          
          <li className="list-group-item">
          <i className="fa fa-plus" onClick={()=> setStudents(...students.slice(0,index), Object.assign(student,{"open": !student.open}), ...students.slice(index+1))}></i>
          <img src={student.pic} className="rounded-circle border"></img>
          <div className="list_item_text">
          <h1>{student.firstName} {student.lastName}</h1>
          <div className="sub_text">
          <span>Email: {student.email}</span><br></br>
          <span>Company: {student.company}</span><br></br>
          <span>Skill: {student.skill}</span><br></br>
          <span>Average: </span><br></br>
          { student.open ?
            <div id={student.id}>
          {student.grades.map((grade, index) =>
          <div key={index}>
          <span>Test {index + 1}: {grade}</span><br></br>
          </div>
          )}
          </div> : null }
          
          </div>
          </div>
          </li>
          </div>
          )}

        </ul>
      </div>
    </div>
  );
}

export default App;
