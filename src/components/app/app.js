import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";

import './app.css';

import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";

import {Record} from "../item-details/item-details";
import ItemList from "../item-list";

export default class App extends Component {

    SwapiService = new SwapiService();

    state = {
        hasError: false,
        showRandomPlanet: true
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };


    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>;
        }

        const {getPerson, getStarship, getPersonImage, getStarshipImage, getAllPeople, getAllPlanets} = this.SwapiService;

        const personDetails = (
            <ItemDetails itemId={11}
                         getData={getPerson}
                         getImageUrl={getPersonImage}>

                <Record field={'gender'} label={'Gender'}/>
                <Record field={'eyeColor'} label={'Eye Color'}/>

            </ItemDetails>
        );

        const starshipDetails = (
            <ItemDetails itemId={5}
                         getData={getStarship}
                         getImageUrl={getStarshipImage}>

                <Record field={'model'} label={'Model'}/>
                <Record field={'length'} label={'Length'}/>
                <Record field={'costInCredits'} label={'Cost'}/>

            </ItemDetails>
        );

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;

        return (
            <div>
                <Header/>
                {planet}
                <div className="row mb2 button-row">
                    <button
                        className="toggle-planet btn btn-warning btn-lg"
                        onClick={this.toggleRandomPlanet}>
                        Toggle Random Planet
                    </button>
                    <ErrorButton/>
                </div>

                {/*<Row left={personDetails} right={starshipDetails}/>*/}

                <ItemList getData={getAllPeople} onItemSelected={ () => {}}>{(i) => (`${i.name} (${i.birthYear})`)}</ItemList>
                <ItemList getData={getAllPlanets} onItemSelected={ () => {}}>{(i) => (`${i.name} (${i.birthYear})`)}</ItemList>

            </div>
        );
    }
};

