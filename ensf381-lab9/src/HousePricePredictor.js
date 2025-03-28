import React, { useState } from 'react';
import './HousePricePredictor.css';

function HousePricePredictor() {
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [leaseTerm, setLeaseTerm] = useState('');
    const [type, setType] = useState('');
    const [beds, setBeds] = useState('');
    const [baths, setBaths] = useState('');
    const [sqFeet, setSqFeet] = useState('');
    const [furnishing, setFurnishing] = useState('Unfurnished');
    const [smoking, setSmoking] = useState("No");
    const [pets, setPets] = useState(false);
    const [price, setPrice] = useState(-1);

    // Function to handle form submission
    async function handleSubmit(event) {
        event.preventDefault();

        const backendEndpoint = 'http://localhost:5000/predict_house_price';

        try {
            const response = await fetch(backendEndpoint, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                'city': city,
                'province': province,
                'latitude': latitude, 
                'longitude': longitude,
                'lease_term': leaseTerm, 
                'type': type, 
                'beds': beds, 
                'baths': baths, 
                'sq_feet': sqFeet,
                'furnishing': furnishing, 
                'smoking': smoking, 
                'pets': pets 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setPrice(data["predicted_price"])
            } else {
                console.error('Form submission failed.');
            }
        } catch (error) {
            console.error('Error during form submission:', error);  
        }
    };

    return (
    <div id="price-predictor">
        <h1>House Price Predictor</h1>
        <form onSubmit={handleSubmit}>
        <label>
            City:
        </label>
        <input
            name='city'
            type="text"
            onChange={(e) => setCity(e.target.value)}
        />
        <label>
            Province:
        </label>
        <input
            name='province'
            type="text"
            onChange={(e) => setProvince(e.target.value)}
        />
        <label>
            Latitude:
        </label>
        <input
            name='latitude'
            type="text"
            onChange={(e) => setLatitude(e.target.value)}
        />
        <label>
            Longitude:
        </label>
        <input
            name='longitude'
            type="text"
            onChange={(e) => setLongitude(e.target.value)}
        />
        <label>
            Lease Term:
        </label>
        <input
            name='lease_term'
            type="text"
            onChange={(e) => setLeaseTerm(e.target.value)}
        />
        <label>
            Type of House:
        </label>
        <input
            name='type_of_house'
            type="text"
            onChange={(e) => setType(e.target.value)}
        />
        <label>
            Number of Beds:
        </label>
        <input
            name='beds'
            type="text"
            onChange={(e) => setBeds(e.target.value)}
        />
        <label>
            Number of Baths:
        </label>
        <input
            name='baths'
            type="text"
            onChange={(e) => setBaths(e.target.value)}
        />
        <label>
            Square Feet:
        </label>
        <input
            name='sq_feet'
            type="text"
            onChange={(e) => setSqFeet(e.target.value)}
        />
        <label>
            Furnishing:
        </label>
        <select
            name='furnishing'
            onChange={(e) => setFurnishing(e.target.value)}
        >
            <option>Unfurnished</option>
            <option>Partially Furnished</option>
            <option>Fully Furnished</option>
        </select> 
        <label>
            Smoking:
        </label>
        <select
            name='smoking'
            onChange={(e) => setSmoking(e.target.value)}
        >
            <option>No</option>
            <option>Yes</option>
        </select>
        <label>
            Pets:
        </label>
        <input
            name='pets'
            type="checkbox"
            onChange={(e) => setPets(e.target.checked ? true : false)}
        />
        
        <br />
        <button type="submit">Predict</button>
        </form>
        {
            price === -1 ? null :
            
            <div id="prediction-result">
                Predicted Rent Price: ${price}
            </div>
            
        }
    </div>
    );
};

export default HousePricePredictor;