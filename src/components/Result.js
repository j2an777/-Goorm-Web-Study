import React from 'react';
import '../css/Result.css';

export default function Result({ expenses }) {
    // reduce 이용해서 expenses 배열의 0번째부터 cost 데이터들 합산
    const totalCost = expenses.reduce((total, item) => total + Number(item.cost), 0);

    return (
        <div className='resultContainer'>
            <div className='resultContent'>
                <h1>{totalCost.toString()}원</h1>
            </div>
        </div>
    );
}
