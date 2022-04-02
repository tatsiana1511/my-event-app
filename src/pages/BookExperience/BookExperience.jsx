import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../CreateService/CreateService.css';

function BookExperience() {

    let date = {currentTime: (new Date()).toLocaleString()}

    const [fullName, setFullName] = useState('');
    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState(1);
    const [durationOfExperience, setDurationOfExperience] = useState(1);
    const [eventDescription, setEventDescription] = useState('');
    const [eventDate, setEventDate] = useState(date);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { experienceId } = useParams();

    const handleFullNameChange = (evt) => {
        setFullName(evt.target.value);
        setError('');
    }

    const handleEventNameChange = (evt) => {
        setEventName(evt.target.value);
        setError('');
    }

    const handleEventLocationChange = (evt) => {
        setEventLocation(evt.target.value);
        setError('');
    }

    const handleNumberOfPeopleChange = (evt) => {
        setNumberOfPeople(evt.target.value);
        setError('');
    }

    const handleDurationOfExperienceChange = (evt) => {
        setDurationOfExperience(evt.target.value);
        setError('');
    }

    const handleEventDescriptionChange = (evt) => {
        setEventDescription(evt.target.value);
        setError('');
    }

    const handleEventDateChange = (evt) => {
        setEventDate(evt.target.value);
        setError('');
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        try {
            let jwt = localStorage.getItem('token');
            const fetchResponse = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + jwt },
                body: JSON.stringify({
                    fullName,
                    eventName,
                    eventLocation,
                    numberOfPeople,
                    durationOfExperience,
                    eventDescription,
                    eventLocation,
                    eventDate,
                    experienceId,                    
                })
            })

            if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request');

            navigate('/my-bookings');

        } catch (err) {
            console.log('Booking error', err);
            setError('Booking Failed - Try Again');
        }
    }

    return (
        <div onSubmit={handleSubmit} className='form-container'>
            <h3>Please tell more about the event you want to book the experience for</h3>
            <div className='custom-form'>
                <form>
                    <div className='form-group'>
                        <label className='col-form-label'>Full Name</label>
                        <input className='form-control' type='text' name='full-name' value={fullName} onChange={handleFullNameChange} required></input>
                    </div>
                    <div className='form-group'>
                        <label className='col-form-label'>Event Name</label>
                        <input className='form-control' type='text' name='event-name' value={eventName} onChange={handleEventNameChange} required></input>
                    </div>
                    <div className='form-group'>
                        <label className='col-form-label'>Event Location</label>
                        <input className='form-control' type='text' name='event-location' value={eventLocation} onChange={handleEventLocationChange} required></input>
                    </div>
                    <div className='form-group'>
                        <label className='col-form-label'>Number of People</label>
                        <input className='form-control' type='number' name='number-of-people' value={numberOfPeople} onChange={handleNumberOfPeopleChange} required></input>
                    </div>
                    <div className='form-group'>
                        <label className='col-form-label'>Duration of Experience (min 1h)</label>
                        <input className='form-control' type ='number' text='duration-of-experience' value={durationOfExperience} onChange={handleDurationOfExperienceChange} required></input>
                    </div>
                    <div className='form-group'>
                        <label className='col-form-label'>Event Description</label>
                        <input className='form-control' type='text' text='event-description' value={eventDescription} onChange={handleEventDescriptionChange} required></input>
                    </div>
                    <div className='form-group'>
                        <label className='col-form-label'>Event Date</label>
                        <input className='form-control' type='date' text='event-date' value={eventDate} onChange={handleEventDateChange} required></input>
                    </div>
                        <button className='btn btn-success action-button' type='submit'>BOOK</button>
                </form>
            </div>
        </div>
    )
}

export default BookExperience;