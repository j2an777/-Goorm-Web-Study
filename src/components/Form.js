import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import '../css/Form.css';
import List from './List';

export default function Form({ expenses, setExpenses, setMessage }) {
    const [editing, setEditing] = useState(null);

    const updateExpenses = (newExpenses) => {
        setExpenses(newExpenses);
        localStorage.setItem("expenses", JSON.stringify(newExpenses));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const pay = e.target.pay.value;
        const cost = e.target.cost.value;

        if (editing) {
            // 수정 모드
            const updatedExpenses = expenses.map(item => item.id === editing ? { ...item, pay, cost } : item);
            updateExpenses(updatedExpenses);
            setMessage({text: '아이템이 수정되었습니다.', type: 'edit'});
            setEditing(null);

        } else {
            // 추가 모드
            const newExpense = { id: Date.now(), pay, cost };
            updateExpenses([...expenses, newExpense]);
            setMessage({text: '아이템이 생성되었습니다.', type: 'create'});
        }

        // 메시지 3초동안 보이게 하기 그 후 사라지게 하기
        setTimeout(() => setMessage({text: '', type: ''}), 3000);

        e.target.reset();
    };

    const handleEditItem = (item) => {
        setEditing(item.id);
        // 폼에 기존 값 설정
        document.getElementById('inputPay').value = item.pay;
        document.getElementById('inputCost').value = item.cost;
    };

    const handleDeleteAll = () => {
        updateExpenses([]);
        setMessage({text: '아이템이 모두 삭제되었습니다.', type: 'delete'});
        setTimeout(() => setMessage({text: '', type: ''}), 3000);
    };

    const handleDeleteItem = (id) => {
        const updatedExpenses = expenses.filter(item => item.id !== id);
        updateExpenses(updatedExpenses);
        setMessage({text: '아이템이 삭제되었습니다.', type: 'delete'});
        setTimeout(() => setMessage({text: '', type: ''}), 3000);
    }

    return (
        <div className='form_container'>
            <form className='input_form' onSubmit={ handleSubmit }>
                <div className='inputTop'>
                    <div className='inputLeft'>
                        <label className='inputTitle' htmlFor="inputPay">지출 항목</label>
                        <input
                            type='text'
                            name='pay'
                            placeholder='예) 렌트비'
                            className='inputValue'
                            id='inputPay'
                        />
                    </div>
                    <div className='inputRight'>
                        <label className='inputTitle' htmlFor="inputCost">비용</label>
                        <input
                            type='number'
                            name='cost'
                            placeholder='예) 100'
                            className='inputValue'
                            id='inputCost'
                        />
                    </div>
                </div>
                <div className='inputBottom'>
                    <button type='submit' className='inputSubmit'>
                        {editing ? '수정' : '제출'} &nbsp;<FontAwesomeIcon icon={editing ? faLocationArrow : faCheck} />
                    </button>
                </div>
            </form>
            <List items = { expenses } onDelete = { handleDeleteItem } onEdit = { handleEditItem }/>
            <div className='deleteBox'>
                <button type='button' className='inputSubmit' onClick={ handleDeleteAll }>
                    목록 지우기 &nbsp;<FontAwesomeIcon icon={ faTrash } />
                </button>
            </div>
        </div>
    );
}
