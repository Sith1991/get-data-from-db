import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorIndicator from "../error-indicator";
import ErrorBoundry from "../ErrorBoundry";
import SwapiService from "../../services/swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context";
import DummySwapiService from "../../services/dummy-swapi-service";
import {LoginPage, PeoplePage, PlanetsPage, SecretPage, StarshipsPage} from "../pages";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";

import './app.css';
import {StarshipDetails} from "../sw-components";

export default class App extends Component {

    state = {
        hasError: false,
        swapiService: new SwapiService(),
        isLoggedIn: false,
    }

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
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

        const {isLoggedIn} = this.state;

        if (this.state.hasError) {
            return <ErrorIndicator/>;
        }

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Router>
                        <Header onServiceChange={this.onServiceChange}/>
                        <RandomPlanet />
                        <Switch>
                            <Route path={'/'} exact render = { () => <h2>Welcome to StarDB</h2> }/>
                            <Route path={'/people/:id?'} component={PeoplePage}/>
                            <Route path={'/planets'} component={PlanetsPage}/>
                            <Route path={'/starships'} exact component={StarshipsPage}/>
                            <Route path={'/starships/:id'}
                                   render={({match}) => {
                                       const {id} = match.params;
                                       return <StarshipDetails itemId={id} />}} />
                            <Route path={'/login'} render = { () => <LoginPage onLogin={this.onLogin}
                                                                               isLoggedIn={isLoggedIn} /> }/>
                            <Route path={'/secret'} render = { () => <SecretPage isLoggedIn={isLoggedIn}/> }/>
                            <Route render={ () => <h2>Page not found</h2> } />
                        </Switch>


                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
};