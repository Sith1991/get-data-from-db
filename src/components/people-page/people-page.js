import React, {Component} from 'react';
import ErrorIndicator from "../error-indicator";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import SwapiService from "../../services/swapi-service";
import Row from "../Row";
import ErrorBoundry from "../ErrorBoundry";

export default class PeoplePage extends Component {
    SwapiService = new SwapiService();

    state = {
        selectedPerson: null,
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>;
        }

        const itemList = <ItemList onItemSelected={this.onPersonSelected}
                                   getData={this.SwapiService.getAllPeople}>
            {(i) => (`${i.name} (${i.birthYear})`)}</ItemList>;

        const personDetails = <ErrorBoundry><PersonDetails personId={this.state.selectedPerson}/></ErrorBoundry>;

        return (
            <Row left={itemList} right={personDetails}/>
        );
    }
};