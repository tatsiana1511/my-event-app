import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyBookings.css'

function MyBookings() {

    const [userBookingsFromBackend, setUserBookingsFromBackend] = useState([]);
    let jwt = localStorage.getItem('token');

    useEffect(() => {
        async function populateAllBookings() {
            let response = await fetch('/api/bookings', {
                headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
            });
            let userBookingsFromBackend = await response.json();

            setUserBookingsFromBackend(userBookingsFromBackend);
        }

        populateAllBookings();
    }, []);

    return (
        <div className='cards-container'>
            { userBookingsFromBackend.map((booking) => {
                return (
                    <div className='card experience-card'>
                        <div className="card-body">
                            <div>
                                <span>Full Name:</span>
                                <span> {booking?.fullName}</span>
                            </div>
                            <div>
                                <span>Event Name:</span>
                                <span> {booking?.eventName}</span>
                            </div>
                            <div>
                                <span>Event Location:</span>
                                <span> {booking?.evenLocation}</span>
                            </div>
                            <div>
                                <span>Number of People:</span>
                                <span> {booking?.numberOfPeople}</span>
                            </div>
                            <div>
                                <span>Duration of Experience:</span>
                                <span> {booking?.durationOfExperience}</span>
                            </div>
                            <div>
                                <span>Event Description:</span>
                                <span> {booking?.eventDescription}</span>
                            </div>
                            <div>
                                <span>Event Date:</span>
                                <span> {booking?.eventDate}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default MyBookings;