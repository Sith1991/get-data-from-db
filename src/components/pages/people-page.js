import React, {Component} from 'react';
import {PersonDetails, PersonList} from "../sw-components";
import Row from "../Row";

export default class PeoplePage extends Component {

    state ={
        onItemSelected: null,
    }

    onItemSelected = (onItemSelected) => {
        this.setState( {
            onItemSelected
        })
    }

    render() {
        const {onItemSelected} = this.state;
        return (
            <Row left={<PersonList onItemSelected={this.onItemSelected}/>}
                 right={<PersonDetails itemId={onItemSelected}/>}/>
        )
    }
}