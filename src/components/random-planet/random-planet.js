import React, {Component} from 'react';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

import './random-planet.css';
import PropTypes from "prop-types";

export default class RandomPlanet extends Component {

    static defaultProps = {
        updateInterval: 3000
    }

    static propTypes = {
        updateInterval: PropTypes.number
    }

    state = {
        planet: {},
        loading: true,
        error: false
    }

    SwapiService = new SwapiService();

    componentDidMount() {
        const { updateInterval } = this.props
        this.updatePlanet();
        this.interval = setInterval(this.updatePlanet, updateInterval)
    }

    componentWillUnmount() {
        console.log('unmount');
        clearInterval(this.interval);
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

    updatePlanet = () => {
        console.log('mount');
        const id = Math.floor(Math.random() * 25) + 3;
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
                         src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
                    alt={'planet'}/>
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
