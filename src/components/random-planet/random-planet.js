import React, {Component} from 'react';
import SwapiService from "../../services/swapi-service";

import './random-planet.css';
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

// 1st commit in master branch
// 2nd commit in master branch
// 3rd commit

export default class RandomPlanet extends Component {

    state = {
        planet: {},
        loading: true,
        error: false
    }

    SwapiService = new SwapiService();

    constructor() {
        super();
        this.updatePlanet();
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false,
        })
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false,
        })
    }

    updatePlanet() {
        const id = Math.floor(Math.random() * 25) + 2;
        this.SwapiService.getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    }


    render() {

        const {planet, loading, error} = this.state;

        const PlanetView = ({planet}) => {

            const {id, name, population, rotationPeriod, diameter} = planet;
            return (
                <React.Fragment>
                    <img className="planet-image"
                         src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}/>
                    <div>
                        <h4>{name}</h4>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item">
                                <span className="term">Population</span>
                                <span>{population}</span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Rotation Period</span>
                                <span>{rotationPeriod}</span>
                            </li>
                            <li className="list-group-item">
                                <span className="term">Diameter</span>
                                <span>{diameter}</span>
                            </li>
                        </ul>
                    </div>
                </React.Fragment>
            )
        }

        const hasData = !( loading || error);

        const errorMessage = error ? <ErrorIndicator /> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <PlanetView planet={planet}/> : null;

        return (
            <div className="random-planet jumbotron rounded">
                {spinner}
                {errorMessage}
                {content}
            </div>
        );
    }
}
