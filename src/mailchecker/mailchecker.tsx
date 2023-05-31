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


/*<button

    {!isValidEmail ? (
        <>
            onClick={handleSubmit}
            disabled={selectedCountry === '0' && !isSubmitted}

            Valider
        </>
    ) : (
        <>
            onClick={handleSubmit}
        </>
    )
    }
    >
</button>
*/

import React, {useEffect, useState} from 'react';
import './mailchecker.css';
import Mailconf from '../mailconfirmation/mailconfirmation';

interface Pays {
    name: {
        common: string;
    },
    submit_value: string;
}

function Pays_Selected() {
    const [countries, setCountries] = useState<Pays[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [showMailConf, setShowMailConf] = useState(false); // Ajoutez une variable d'état showMailConf


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
        setIsSubmitted(false); // Réinitialise isSubmitted à false lorsqu'une nouvelle valeur est sélectionnée
        setShowMailConf(false); // Mettez à jour showMailConf à true lors de la soumission du formulaire avec un email valide

    }

    function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setEmail(value);

        // Validation de l'adresse e-mail
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setIsValidEmail(isValid);
    }

    useEffect(() => {
        getData().then((data) => {
            setCountries(data);
        });
    }, []);

    function showmailconf() {
        setShowMailConf(true); // Mettez à jour showMailConf à true lors de la soumission du formulaire avec un email valide
    }

    // @ts-ignore
    return (

        <div>
            <h1>Test</h1>

            <select value={selectedCountry} onChange={handleCountryChange}>
                <option value="0">Fait un choix</option>
                {countries.map((country, index) => (
                    <option value={index + 1} key={country.name.common}>
                        {country.name.common}
                    </option>
                ))}
            </select>

            <br/>

            {isSubmitted && selectedCountry !== '0' ? (
                <>
                    <h2>{countries[parseInt(selectedCountry) - 1].name.common}</h2>

                    <label>Mail :</label>
                    <br/>
                    <input type="text" placeholder="Mail" value={email} onChange={handleEmailChange}/>

                    {isValidEmail && <p>Email valide</p>}
                </>
            ) : (
                <h2>Choisissez un pays</h2>
            )}

            <br/>
            <br/>


            {!isValidEmail ? (
                <button
                    onClick={handleSubmit}
                    disabled={selectedCountry === '0' && !isSubmitted}
                >
                    Valider
                </button>
            ) : (
                <button onClick={showmailconf}>
                    Valider
                </button>
            )}


            {showMailConf && (
                <Mailconf
                    isOpen={showMailConf} // Passer la propriété isOpen avec la valeur showMailConf
                    onClose={() => setShowMailConf(false)} // Définir la fonction de fermeture onClose pour mettre à jour showMailConf à false
                    onConfirm={() => {
                        // Logique de confirmation de l'email ici
                        setShowMailConf(false); // Fermer la modal après confirmation
                    }}
                />
            )}
        </div>


    )
        ;


}

export default Pays_Selected;