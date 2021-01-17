import React from 'react';
import {SwapiServiceConsumer} from "../swapi-service-context";

const withSwapiService = (Wrapped, mapMethodsToProps) => {
    return (props) => {
        return (
            <SwapiServiceConsumer>
                {
                    (swapiService) => {
                        const mappedService = mapMethodsToProps(swapiService);

                        return <Wrapped {...props} {...mappedService}/>
                    }
                }
            </SwapiServiceConsumer>
        );
    };
};

export default withSwapiService;