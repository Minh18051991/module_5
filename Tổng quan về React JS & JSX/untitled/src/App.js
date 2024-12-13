import React from 'react';
import './App.css';
import  './css.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function App({ students }) {
  return (
    <div className="App">
      <h1 className= {'minh'}>Students</h1>
      <table className={'table-dark table'}>
        <thead>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.company}</td>
              <td>{student.contact}</td>
              <td>{student.country}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;