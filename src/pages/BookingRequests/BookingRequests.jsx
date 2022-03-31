import React, { useEffect, useState} from "react";
import '../ExperiencesPage/ExperiencesPage.css';

function BookingRequests() {
    const [bookingRequests, setBookingRequests] = useState([]);
    const [error, setError] = useState('');
    let jwt = localStorage.getItem('token');

    useEffect(() => {
        async function populateBookingRequests() {
            const response = await fetch('/api/bookings/booking-requests', {
                headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
            });
            const bookingRequestsFromBackend = await response.json();
            setBookingRequests(bookingRequestsFromBackend);
        }

        populateBookingRequests();
    }, []);

    const acceptHandler = async (evt, bookingId) => {
        evt.preventDefault();
        try {
            let jwt = localStorage.getItem('token');
            const fetchResponse = await fetch('/api/bookings/accept-booking/' + bookingId, {
                method: 'POST',
                headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
            })

            if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request');
            const updatedBookingRequests = bookingRequests.map((request) => {
                if (request._id === bookingId) {
                    request.status = 'Accepted';
                }
                return request;
            })
            setBookingRequests(updatedBookingRequests);
        } catch (err) {
            console.log('AcceptBooking error', err);
            setError('Accept Booking Failed - Try Again');
        }
    }

    const rejectHandler = async (evt, bookingId) => {
        evt.preventDefault();
        try {
            let jwt = localStorage.getItem('token');
            const fetchResponse = await fetch('/api/bookings/reject-booking/' + bookingId, {
                method: 'POST',
                headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
            })

            if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request');
            const updatedBookingRequests = bookingRequests.map((request) => {
                if (request._id === bookingId) {
                    request.status = 'Rejected';
                }
                return request;
            })
            setBookingRequests(updatedBookingRequests);
        } catch (err) {
            console.log('RejectBooking error', err);
            setError('Reject Booking Failed - Try Again');
        }
    }

    return (<div className="cards-container">
        {
            bookingRequests.map((bookingRequest) => {
                return (
                    <div key={bookingRequest.eventName} className='experience-card'>
                        <div className="card-body">
                        <div>
                                <span>Full Name:</span>
                                <span> {bookingRequest?.fullName}</span>
                            </div>
                            <div>
                                <span>Event Name:</span>
                                <span> {bookingRequest?.eventName}</span>
                            </div>
                            <div>
                                <span>Event Location:</span>
                                <span> {bookingRequest?.evenLocation}</span>
                            </div>
                            <div>
                                <span>Number of People:</span>
                                <span> {bookingRequest?.numberOfPeople}</span>
                            </div>
                            <div>
                                <span>Duration of Experience:</span>
                                <span> {bookingRequest?.durationOfExperience}</span>
                            </div>
                            <div>
                                <span>Event Description:</span>
                                <span> {bookingRequest?.eventDescription}</span>
                            </div>
                            <div>
                                <span>Event Date:</span>
                                <span> {bookingRequest?.eventDate}</span>
                            </div>
                            <div>
                                <span>Status:</span>
                                <span> {bookingRequest?.status}</span>
                            </div>
                            <button className="btn btn-success" onClick={ (evt) => {
                                acceptHandler(evt, bookingRequest._id)
                            }
                            }>Accept</button>
                            <button className="btn btn-danger" onClick={ (evt) => {
                                rejectHandler(evt, bookingRequest._id)
                            }}>Reject</button>
                        </div>
                    </div>
                    
                );
            })
        }
    </div>);
}

export default BookingRequests;