import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateService.css';

function CreateService(props) {

    const [serviceName, setServiceName] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [description, setDescription] = useState('');
    const [pricePerHour, setPricePerHour] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            const fetchResponse = await fetch('/api/experiences', {
                method: 'POST',
                headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
                body: JSON.stringify({ serviceName, serviceType, description, pricePerHour })
            })

            if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request');
            
            navigate('/my-service');

        } catch (err) {
            console.log('SignupPage error', err);
            setError('Sign Up Failed - Try Again');
        }
    }

    return(
        <div onSubmit={handleSubmit} class="form-container">
            <h3>Tell us more about service you provide</h3>
            <h4>Once you add your service it will be visible to all users. Keep your calendar up to date in order to get booked by the clients.</h4>
            <form>
                <label className='col-form-label'>Service Name
                    <input className='form-control-lg' type="text" name="service-name" value={serviceName} onChange={handleServiceNameChange} required></input>
                </label><br></br>
                <label className='col-form-label'>Service Type
                    <select className='form-control-lg' name="service-type" value={serviceType} onChange={handleServiceTypeChange}>
                        <option value="">Select Service Type</option>
                        <option value="food">Food</option>
                        <option value="drinks">Drinks</option>
                        <option value="master-class">Master Class</option>
                        <option value="kids-entertainment">Kids Entertainment</option>
                        <option value="other">Other</option>
                    </select>
                </label><br></br>
                <label className='col-form-label'>Description
                    <input className='form-control-lg' type="text" name="description" maxlength="200" value={description} onChange={handleDescriptionChange}></input>
                </label><br></br>
                <label className='col-form-label'>Price per hour
                    <input className='form-control-lg' type="number" name="price-per-hour" value={pricePerHour} onChange={handlePricePerHourChange}></input>
                </label><br></br>
                <button className='btn btn-success' type="submit">CREATE</button>
            </form>
        </div>
    );
};

export default CreateService;