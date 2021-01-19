import React, {Component} from 'react';
import {StarshipDetails, StarshipList} from "../sw-components";
import Row from "../Row";

export default class StarshipsPage extends Component {

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
            <Row left={<StarshipList onItemSelected={this.onItemSelected}/>}
                 right={<StarshipDetails itemId={onItemSelected}/>}/>
        )
    }
}