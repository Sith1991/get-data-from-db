import React, {Component} from 'react';
import Spinner from "../spinner";
import ErrorButton from "../error-button";

import './item-details.css';

const Record = ({item, field, label}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export {
    Record
};

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: true,
        image: null
    }

    updateItems = () => {
        const {itemId, getData, getImageUrl} = this.props;
        if (!itemId) {
            return;
        }

        this.setState({
          loading: true
        })

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false,
                    image: getImageUrl(item.id)
                })
            })
    }

    componentDidMount() {
        this.updateItems();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItems()
        }
    }

    render() {

        const {item, loading, image} = this.state;

        if (!item) {
            return <span>Select a person for item list</span>
        }

        const PersonView = ({item}) => {
            const {id, name, gender, birthYear, eyeColor} = item;
            return (
                <React.Fragment>
                    <img className="person-image"
                         src={image}/>

                    <div className="card-body">
                        <h4>{name}</h4>
                        <ul className="list-group list-group-flush">
                            {React.Children.map( this.props.children, (child) => {
                                return React.cloneElement( child, {item} )
                            })}
                        </ul>
                        <ErrorButton />
                    </div>
                </React.Fragment>
            )
        }

      const spinner = loading ? <Spinner/> : null;
      const content = !loading ? <PersonView item={item}/> : null;

        return (
            <div className="person-details card">
              {spinner}
              {content}
            </div>
        )
    }
}