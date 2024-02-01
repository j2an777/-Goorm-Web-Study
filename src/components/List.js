import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import '../css/List.css';

const List = ({ items, onDelete, onEdit }) => {
    return (
        <div className='listContainer'>
            {
                items.map((item, index) => {
                    return (
                        <div className='listItem' key={ index }>
                            <p className='listPay'>{ item.pay }</p>
                            <p className='listCost'>{ item.cost }</p>
                            <div className='toolBox'>
                                <FontAwesomeIcon icon={faPen} id='pen' onClick={() => onEdit(item)}/>
                                <FontAwesomeIcon icon={faTrash} id="trash" onClick={() => onDelete(item.id)}/>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default List;
