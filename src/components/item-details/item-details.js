import React, {Component} from 'react';

import './item-details.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorButton from "../error-button";

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: true,
    }

    SwapiService = new SwapiService();

    updateItems = () => {
        const {itemId} = this.props;
        if (!itemId) {
            return;
        }

        this.setState({
          loading: true
        })

        this.SwapiService.getPerson(itemId)
            .then((item) => {
                this.setState({
                    item,
                    loading: false
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

        const {item, loading} = this.state;

        if (!item) {
            return <span>Select a person for item list</span>
        }

        const PersonView = ({item}) => {
            const {id, name, gender, birthYear, eyeColor} = item;
            return (
                <React.Fragment>
                    <img className="person-image"
                         src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}/>

                    <div className="card-body">
                        <h4>{name}</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <span className="term">Gender</span>
                                <span>{gender}</span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Birth Year</span>
                                <span>{birthYear}</span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Eye Color</span>
                                <span>{eyeColor}</span>
                            </li>
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
