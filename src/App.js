import React, { useState, useEffect } from 'react';
import './App.css'

const PersonList = () => {
  const [persons, setPersons] = useState([]);       // State to store the list of persons
  const [currentPage, setCurrentPage] = useState(1); // State to store the current page
  const [personsPerPage] = useState(10);             // Number of persons per page (fixed at 10)
  const [loading, setLoading] = useState(true);      // State to manage loading

  
  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await fetch('https://66ed3e0e380821644cdc2120.mockapi.io/Test');
        const data = await response.json();
        setPersons(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchPersons();
  }, []); // Empty array ensures this only runs once when the component mounts

  // Get the current persons for the current page
  const getCurrentPersons = () => {
    const indexOfLastPerson = currentPage * personsPerPage;
    const indexOfFirstPerson = indexOfLastPerson - personsPerPage;
    return persons.slice(indexOfFirstPerson, indexOfLastPerson);
  };

  // Handle the "Next" button click to go to the next page
  const handleNextPage = () => {
    const totalPages = Math.ceil(persons.length / personsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Loading state
  if (loading) {
    return <div className='loader'>
      <p className='loader-des'>Loading...</p>
      </div>;
  }

  const currentPersons = getCurrentPersons();

  return (
    <div className='container-element'>
      <div className='header-section'>
      <h1 className='heading'>Displaying Data</h1>
        <button onClick={handleNextPage}  className='buttonElement'>Next</button>
      </div>
      <ul>
        {currentPersons.map((person) => (
          <li key={person.id} className='eachItem'> {/* Assuming each person has an 'id' */}
            <div>
            <p className='description'>Name: {person.name}</p> {/* Adjust this based on actual data fields */}
            <p className='description'>Address: {person.address}</p>
            <p className='description'>Avatar: {person.avatar}</p>
            </div>
            <p className='description'>{person.createdAt}</p>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default PersonList;
