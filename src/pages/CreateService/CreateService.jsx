import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateService.css';

function CreateService(props) {

    const [serviceName, setServiceName] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [description, setDescription] = useState('');
    const [pricePerHour, setPricePerHour] = useState(0);
    const [serviceLocation, setServiceLocation] = useState('');
    const [servicePhoto, setServicePhoto] = useState('');
    const [fileName, setFileName] = useState('Choose File');
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

    const handleServiceLocationChange = (evt) => {
        setServiceLocation(evt.target.value);
        setError('');
    }

    const handleDescriptionChange = (evt) => {
        setDescription(evt.target.value);
        setError('');
    }

    const handleServicePhotoChange = (evt) => {
        setServicePhoto(evt.target.files[0]);
        setFileName(evt.target.files[0].name);
    }

    const handlePricePerHourChange = (evt) => {
        setPricePerHour(evt.target.value);
        setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            let jwt = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('file', servicePhoto);
            formData.append('serviceName', serviceName);
            formData.append('serviceType', serviceType);
            formData.append('description', description);
            formData.append('serviceLocation', serviceLocation);
            formData.append('pricePerHour', pricePerHour);

            const fetchResponse = await fetch('/api/experiences', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + jwt },
                body: formData,
            })

            if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request');
            
            navigate('/my-service');

        } catch (err) {
            console.log('SignupPage error', err);
            setError('Sign Up Failed - Try Again');
        }
    }

    return(
        <div onSubmit={handleSubmit} className='form-container'>
            <h3>Tell us more about service you provide</h3>
            <h4>Once you add your service it will be visible to all users. Keep your calendar up to date in order to get booked by the clients.</h4>
            <div className='custom-form'>
                <form className='create-form'>
                    <div className='form-group'>
                        <label className='col-form-label'>Service Name</label>
                        <input className='form-control' type='text' name='service-name' value={serviceName} onChange={handleServiceNameChange} required></input>
                    </div>
                    <div className='form-group'>
                        <label className='col-form-label'>Service Type</label>
                        <select className='form-control' name='service-type' value={serviceType} onChange={handleServiceTypeChange}>
                            <option value=''>Select Service Type</option>
                            <option value='food'>Food</option>
                            <option value='drinks'>Drinks</option>
                            <option value='master-class'>Master Class</option>
                            <option value='kids-entertainment'>Kids Entertainment</option>
                            <option value='other'>Other</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label className='col-form-label'>Location</label>
                        <input className='form-control' type='text' name='serviceLocation' maxLength='200' value={serviceLocation} onChange={handleServiceLocationChange}></input>
                    </div>
                    <div className='form-group'>
                        <label className='col-form-label'>Description</label>
                        <input className='form-control' type='text' name='description' maxLength='200' value={description} onChange={handleDescriptionChange}></input>
                    </div>
                    <div className='form-group'>
                        <label className='col-form-label'>Price per hour</label>
                        <input className='form-control' type='number' name='price-per-hour' value={pricePerHour} onChange={handlePricePerHourChange}></input>
                    </div>
                    <div className='form-group'>
                        <label className='col-form-label'>Upload Photo</label>
                        <label className='col-form-label'>{fileName}</label>
                        <input className='form-control' type='file' name='servicePhoto' onChange={handleServicePhotoChange}></input>
                    </div>
                    <button className='btn btn-success action-button' type='submit'>CREATE</button>
                </form>
            </div>
        </div>
    );
};

export default CreateService;