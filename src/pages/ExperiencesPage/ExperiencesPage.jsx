import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './ExperiencesPage.css'

function ExperiencesPages() {

    const [allExperiences, setAllExperiences] = useState([]);
    const location = useLocation();
    const searchResult = location.search;
    const queryParams = new URLSearchParams(searchResult);
    const searchTerm = queryParams.get('searchTerm') || '';

    useEffect(() => {
        async function populateAllExperiences() {
            let response = await fetch('/api/all-experiences');
            let allExperiencesFromBackend = await response.json();
            const foundExperiences = allExperiencesFromBackend.filter(experience => experience.serviceName.includes(searchTerm));

            setAllExperiences(foundExperiences);
        }

        populateAllExperiences();
    }, [searchTerm]);

    return (
        <div className='cards-container'>
            {
            allExperiences.length !== 0 ?
                allExperiences.map((exp) => {
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
                })
                :
                <h3>No Results Found</h3>
            }
        </div>
    )
}

export default ExperiencesPages;
