import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import {PersonDetails, PersonList, PlanetDetails, PlanetList, StarshipDetails, StarshipList} from "../sw-components";
import ErrorBoundry from "../ErrorBoundry";
import SwapiService from "../../services/swapi-service";

import './app.css';
import {SwapiServiceProvider} from "../swapi-service-context";

export default class App extends Component {

    swapiService = new SwapiService();

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

        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
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

                    <PersonDetails itemId={11}/>
                    <PlanetDetails itemId={5}/>
                    <StarshipDetails itemId={9}/>

                    <PersonList />
                    <PlanetList />
                    <StarshipList />
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
};