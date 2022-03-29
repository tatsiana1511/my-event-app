import React, { useEffect, useState} from "react";

function BookingRequests() {
    const [bookingRequests, setBookingRequests] = useState([]);
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

    const acceptHandler = () => {

    }

    const rejectHandler = () => {

    }

    return (<div className="cards-container">
        {
            bookingRequests.map((bookingRequest) => {
                return (
                    <div key={bookingRequest.eventName} className='card experience-card'>
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
                            <button className="btn btn-success" onClick={acceptHandler}>Accept</button>
                            <button className="btn btn-danger" onClick={rejectHandler}>Reject</button>
                        </div>
                    </div>
                    
                );
            })
        }
    </div>);
}

export default BookingRequests;