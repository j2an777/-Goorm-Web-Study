import './App.css';
import React, { useState } from'react';
import Form from './components/Form';
import Result from './components/Result';

const initialExpenses = localStorage.getItem('expenses')? JSON.parse(localStorage.getItem('expenses')) : [];

function App() {
    const [expenses, setExpenses] = useState(initialExpenses);
    const [message, setMessage] = useState({ text: '', type: ''});

    return (
      <div className='crud-container'>
        <div className='crud-box'>
          {message && <div className={`messageBox ${message.type}`}>{ message.text }</div>}
          <h1>예산 계산기</h1>
          <Form setExpenses = {setExpenses} expenses = {expenses} setMessage = {setMessage}/>
          <Result expenses = {expenses}/>
        </div>
      </div>
    );
}

export default App;
