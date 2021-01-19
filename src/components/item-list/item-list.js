import React from 'react';
import PropTypes from 'prop-types';

import './item-list.css';

const ItemList = (props) => {

    ItemList.defaultProps = {
        onItemSelected: () => {}
    }

    const {data, onItemSelected, children: renderLabel} = props;

    ItemList.propTypes = {
        onItemSelected: PropTypes.func,
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        children: PropTypes.func.isRequired
    }

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