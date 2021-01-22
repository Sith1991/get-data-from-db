import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from "../error-indicator";
import ErrorBoundry from "../ErrorBoundry";
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context";
import DummySwapiService from "../../services/dummy-swapi-service";
import {PeoplePage, PlanetsPage, StarshipsPage} from "../pages";
import {BrowserRouter as Router, Route} from "react-router-dom";

import './app.css';
import {StarshipDetails} from "../sw-components";

export default class App extends Component {

    state = {
        hasError: false,
        swapiService: new SwapiService(),
    }

    onServiceChange = () => {
        this.setState( ({swapiService}) => {
            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;
            return {
                swapiService: new Service(),
            }
        } )
    }

    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator/>;
        }

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <Header onServiceChange={this.onServiceChange}/>
                        <RandomPlanet />

                        <Route path={'/people'} component={PeoplePage}/>
                        <Route path={'/planets'} component={PlanetsPage}/>
                        <Route path={'/starships'} exact component={StarshipsPage}/>
                        <Route path={'/starships/:id'}
                        render={({match}) => {
                            const {id} = match.params;
                            return <StarshipDetails itemId={id} />}} />

                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
};