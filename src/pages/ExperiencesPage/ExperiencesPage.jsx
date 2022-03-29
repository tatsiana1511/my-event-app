import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ExperiencesPage.css'

function ExperiencesPages() {

    const [allExperiences, setAllExperiences] = useState([]);

    useEffect(() => {
        async function populateAllExperiences() {
            let response = await fetch('/api/all-experiences');
            let allExperiencesFromBackend = await response.json();

            setAllExperiences(allExperiencesFromBackend);
        }

        populateAllExperiences();
    }, []);

    return (
        <div className='cards-container'>
            { allExperiences.map((exp) => {
                return (
                    <div key={exp.serviceName} className='card experience-card'>
                        <div className="card-body">
                            <div>
                                <span className='service-name'> {exp?.serviceName}</span>
                            </div>
                            <hr></hr>
                            <div>
                                <span>Service Type:</span>
                                <span> {exp?.serviceType}</span>
                            </div>
                            <div>
                                <span>Service description:</span>
                                <span> {exp?.serviceDescription} </span>
                            </div>
                            <div>
                                {/* <span>Service price per hour:</span> */}
                                <span> {exp?.pricePerHour} USD/hour</span>
                            </div>
                            <Link to={`/book-experience/${exp._id}`} className='btn btn-success'>Book Now</Link>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ExperiencesPages;