import React, {Component} from 'react';
import {PlanetDetails, PlanetList} from "../sw-components";
import Row from "../Row";

export default class PlanetsPage extends Component {

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
            <Row left={<PlanetList onItemSelected={this.onItemSelected}/>}
                 right={<PlanetDetails itemId={onItemSelected}/>}/>
        )
    }
}