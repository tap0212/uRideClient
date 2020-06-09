import {API} from '../backend'


//create an event
export const createCar = (userId, token, car) => {
    return fetch(`${API}/car/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: car
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
  //get all events
  export const getCars = () => {
    return fetch(`${API}/cars`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
  //delete an event
  
  export const deleteCar = (carId, userId, token) => {
    return fetch(`${API}/car/${carId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
  //get an event
  
  export const getCar = carId => {
    return fetch(`${API}/car/${carId}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  
  //update an event
  
  export const updateCar = (carId, userId, token, car) => {
    return fetch(`${API}/car/${carId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: car
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.log(err));
  };
  

  //photo

  export const getPhoto = (carId) => {
    return fetch(`${API}/car/photo/${carId}`,{
      method:"GET"
    })
    .then(response => {
      return response;
    })
    .catch(err => console.log(err));
  }