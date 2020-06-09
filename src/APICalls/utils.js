import {API} from '../backend'


export const getAllCities = () => {
    return fetch(`${API}/cities`,{
        method:"GET"
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}
export const getAllCategories = () => {
    return fetch(`${API}/categories`,{
        method:"GET"
    }).then(response => {
        return response.json()
    })
    .catch(err => console.log(err))
}

