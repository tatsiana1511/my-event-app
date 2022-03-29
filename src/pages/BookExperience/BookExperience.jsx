import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
                headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
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
        <div onSubmit={handleSubmit}>
            <h3>Please tell more about the event you want to book the experience for</h3>
            <form>
                <label>Full Name</label>
                <input type="text" name="full-name" value={fullName} onChange={handleFullNameChange} required></input>
                <label>Event Name</label>
                <input type="text" name="event-name" value={eventName} onChange={handleEventNameChange} required></input>
                <label>Event Location</label>
                <input type="text" name="event-location" value={eventLocation} onChange={handleEventLocationChange} required></input>
                <label>Number of People</label>
                <input type="number" name="number-of-people" value={numberOfPeople} onChange={handleNumberOfPeopleChange} required></input>
                <label>Duration of Experience (min 1h)</label>
                <input type ="number" text="duration-of-experience" value={durationOfExperience} onChange={handleDurationOfExperienceChange} required></input>
                <label>Event Description</label>
                <input type="text" text="event-description" value={eventDescription} onChange={handleEventDescriptionChange} required></input>
                <label>Event Date</label>
                <input type="date" text="event-date" value={eventDate} onChange={handleEventDateChange} required></input>
                <button type="submit">BOOK</button>
            </form>
        </div>
    )
}

export default BookExperience;