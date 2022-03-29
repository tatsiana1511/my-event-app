import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MyServicePage(props) {
    const [myService, setMyService] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        let jwt = localStorage.getItem('token');
        async function populateMyService() {
            let response = await fetch('/api/experiences/my-service', {
                headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
            });
            let myServiceFromBackend = await response.json();

            setMyService(myServiceFromBackend);
        }

        populateMyService();
    }, []);

    const deleteService = async (evt) => {
        evt.preventDefault();
        try {
            let jwt = localStorage.getItem('token');
            const fetchResponse = await fetch(`/api/experiences/${myService._id}`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json", 'Authorization': 'Bearer ' + jwt },
            })

            if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request');
            setMyService(null);

        } catch (err) {
            console.log('DeleteService error', err);
            setError('Delete Failed - Try Again');
        }
    }

    return (
        <>
        {myService ?
            <div>
                <div>
                    <span>Service name:</span>
                    <span> {myService?.serviceName}</span>
                </div>
                <div>
                    <span>Service Type:</span>
                    <span> {myService?.serviceType}</span>
                </div>
                <div>
                    <span>Service description:</span>
                    <span> {myService?.serviceDescription}</span>
                </div>
                <div>
                    <span>Service price per hour:</span>
                    <span> {myService?.pricePerHour}</span>
                </div>
                <Link to="/edit-service" className='btn btn-warning'>Edit</Link>
                <button className='btn btn-danger' onClick={deleteService}>Delete</button>
            </div>
            :
            <h3>You have no services added.</h3>
        }
        </>
    );
}

export default MyServicePage;