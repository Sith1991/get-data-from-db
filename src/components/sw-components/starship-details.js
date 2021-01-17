import React from 'react';
import {SwapiServiceConsumer} from "../swapi-service-context";
import ItemDetails from "../item-details";
import {Record} from "../item-details/item-details";

const StarshipDetails = ({itemId}) => {
    return (
        <SwapiServiceConsumer>
            {
                ({getStarship, getStarshipImage}) => {
                    return (
                        <ItemDetails itemId={itemId}
                                     getData={getStarship}
                                     getImageUrl={getStarshipImage}>

                            <Record field={'model'} label={'Model'}/>
                            <Record field={'length'} label={'Length'}/>
                            <Record field={'costInCredits'} label={'Cost'}/>
                        </ItemDetails>
                    )
                }
            }
        </SwapiServiceConsumer>
    )
};

export default StarshipDetails;