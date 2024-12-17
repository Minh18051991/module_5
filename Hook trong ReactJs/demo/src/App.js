import React from'react';
import Counter from "./counter";
import './App.css';
import CounterClass from "./CounterClass";
import CRUD from "./CRUD";
import CRUDLifeCycle from "./CRUDLifeCycle";


function App() {
  return (
      <div className="App">
        <Counter/>
          <h2>This is the main App component</h2>
      <CounterClass/>
          <p>This is a paragraph</p>
          <CRUD/>
         <h1>dinh cao</h1>
          <CRUDLifeCycle/>
      </div>

  );
}

export default App;
