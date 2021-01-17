import React from 'react';

import './item-list.css';

const ItemList = (props) => {

    const {data, onItemSelected, children: renderLabel} = props;

    const items = data.map((item) => {
                const label = renderLabel(item);
                const {id} = item;
                return (
                    <li className="list-group-item"
                        key={id}
                        onClick={() => onItemSelected(id)}>
                        {label}
                    </li>
                )});

        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
}

export default ItemList;