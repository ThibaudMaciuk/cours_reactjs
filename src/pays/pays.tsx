import React, { useEffect, useState } from 'react';

interface Country {
    name: {
        common: string;
    };
}

function Pays() {
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    useEffect(() => {
        fetchCountries();
    }, []);

    function fetchCountries() {
        fetch('https://restcountries.com/v3.1/all?lang=fr')
            .then(response => response.json())
            .then((data: Country[]) => {
                setCountries(data);
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors de la récupération des pays :', error);
            });
    }

    function handleCountryChange(event: React.ChangeEvent<HTMLSelectElement>) {
        setSelectedCountry(event.target.value);
    }

    return (
        <div className="App">

            <select value={selectedCountry} onChange={handleCountryChange}>
                <option value="0">Choisissez un pays</option>
                {countries.map((country, index) => (
                    <option key={index + 1} value={(index + 1).toString()}>
                        {country.name.common}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Pays;