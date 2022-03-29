import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditService() {

    const [serviceName, setServiceName] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [description, setDescription] = useState('');
    const [pricePerHour, setPricePerHour] = useState(0);
    const [myService, setMyService] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        let jwt = localStorage.getItem('token');
        async function populateMyService() {
            let response = await fetch('/api/experiences/my-service', {
                headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
            });
            let myServiceFromBackend = await response.json();

            setMyService(myServiceFromBackend);
            setServiceName(myServiceFromBackend.serviceName);
            setServiceType(myServiceFromBackend.serviceType);
            setDescription(myServiceFromBackend.description);
            setPricePerHour(myServiceFromBackend.pricePerHour);
        }

        populateMyService();
    }, []);

    const handleServiceNameChange = (evt) => {
        setServiceName(evt.target.value);
        setError('');
    }

    const handleServiceTypeChange = (evt) => {
        setServiceType(evt.target.value);
        setError('');
    }

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value);
        setError('');
    }

    const handlePricePerHourChange = (evt) => {
        setPricePerHour(evt.target.value);
        setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            let jwt = localStorage.getItem('token');
            const fetchResponse = await fetch(`/api/experiences/${myService._id}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
                body: JSON.stringify({ serviceName, serviceType, description, pricePerHour })
            })

            if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request');
            
            navigate('/my-service');

        } catch (err) {
            console.log('EditService error', err);
            setError('Edit Failed - Try Again');
        }
    }

    return (
        <div onSubmit={handleSubmit}>
            <h3>Edit your service:</h3>
            <form>
                <label>Service Name</label>
                <input type="text" name="service-name" value={serviceName} onChange={handleServiceNameChange} required></input>
                <label>Service Type</label>
                <select name="service-type" value={serviceType} onChange={handleServiceTypeChange}>
                    <option value="">Select Service Type</option>
                    <option value="food">Food</option>
                    <option value="drinks">Drinks</option>
                    <option value="master-class">Master Class</option>
                    <option value="kids-entertainment">Kids Entertainment</option>
                    <option value="other">Other</option>
                </select>
                <label>Description</label>
                <input type="text" name="description" maxlength="200" value={description} onChange={handleDescriptionChange}></input>
                <label>Price per hour</label>
                <input type="number" name="price-per-hour" value={pricePerHour} onChange={handlePricePerHourChange}></input>
                <button type="submit">EDIT</button>
            </form>
        </div>
    )
}

export default EditService;