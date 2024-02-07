import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'

function PlacesList() {
  const [ loading, setLoading ] = useState(true)
  const [ loadedPlaces, setLoadedPlaces ] = useState([])

  useEffect(() => {
    const apiEndpoint = "api/places"
    fetch(apiEndpoint)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setLoadedPlaces(data.places)
        setLoading(false)
      })
  }, [])
  
  if (loading) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
      <>
        {
          loadedPlaces.map((place, index) => (
            <div key={index}>
              <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th>Recent Upload Speed</th>
                  <th>Recent Upload Speed Units</th>
                  <th>Number of measurements</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{place.name}</td>
                  <td>{place.city}</td>
                  <td>{place.most_recent_download_speed}</td>
                  <td>{place.most_recent_download_speed_units}</td>
                  <td>{place.number_of_measurements}</td>
                </tr>
              </tbody>
              </table>
            </div>    
          ))
        }
      </>
    )
  }
}

const placesList = ReactDOM.createRoot((document.getElementById("places-list-container")))
placesList.render(<PlacesList/>)