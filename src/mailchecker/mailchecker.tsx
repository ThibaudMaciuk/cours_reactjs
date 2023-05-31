/*import React from 'react';
import './mailchecker.css';


// https://restcountries.com/v3.1/all?lang=fr


interface pays {
    name: string,
}


// @ts-ignore
function getdata(){
    // API call will go here.

    return fetch('https://restcountries.com/v3.1/all?lang=fr', {
        method: 'GET',
        headers: {},
    })
        .then((response) => response.json())
        .then((data) => {
                console.log(data);
                //return data in html table
            let ddata = "<h1>test</h1>";
                return ddata;
            }
        );

}

export default getdata; */

import React, { useEffect, useState } from 'react';

interface Pays {
    name: {
        common: string;
    };
}

function Pays_Selected() {
    const [countries, setCountries] = React.useState<Pays[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    function getData(): Promise<Pays[]> {
        return fetch('https://restcountries.com/v3.1/all?lang=fr')
            .then((response) => response.json())
            .then((data) => {
                return data as Pays[]; // Assurez-vous que les données sont du type Pays[]
            });
    }

    function handleSubmit() {
        setIsSubmitted(true);
    }

    function handleCountryChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedCountry(event.target.value);
    }

    React.useEffect(() => {
        getData().then((data) => {
            setCountries(data);
        });
    }, []);









    return (
        <div>
            <h1>Test</h1>

            <select value={selectedCountry} onChange={handleCountryChange}>
                <option value="0">Fait un choix</option>
            {countries.map((country, index) => (
                <option value={index+1} key={country.name.common}>{country.name.common}</option>
            ))}
            </select>

            <br /><br />
            <button onClick={handleSubmit}>
                {isSubmitted ? 'Envoyer' : 'Valider'}
            </button>

            {selectedCountry !== '0' && isSubmitted && (
                <>
                    <h2>{countries[parseInt(selectedCountry) - 1].name.common}</h2>
                </>
            )}
            {
                <h2>Choisissez un pays</h2>
            }


        </div>
    );
}

export default Pays_Selected;