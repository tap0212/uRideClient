import React, {useEffect, useContext, useState} from 'react'
import NavBar from '../NavBar/navbar'
import {AppContext} from '../../context'
import {ReactComponent as Step3} from '../../assets/step4.svg'
import {getCars, getCar} from '../../APICalls/car'
import Skeleton from 'react-loading-skeleton';
import {getAllCities} from '../../APICalls/utils'
import {findUser} from '../../APICalls/auth'
import {Grid} from '@material-ui/core'
import {ReactComponent as C1} from '../../assets/cityscape-svgrepo-com (1).svg'
import {ReactComponent as C2} from '../../assets/cityscape-svgrepo-com (2).svg'
import {ReactComponent as C3} from '../../assets/cityscape-svgrepo-com (3).svg'
import {ReactComponent as C4} from '../../assets/cityscape-svgrepo-com.svg'
import {ReactComponent as Car} from '../../assets/undraw_order_a_car_3tww.svg'
import Tile from '../tile/tile'
import './ride.scss'
const  Ride = (props) => {
    const {dark} = useContext(AppContext)
    const [cities, setCities] = useState("")
    const [city, setCity] = useState(null)
    const [cars, setCars] = useState(null)
    const [filteredCars, setFilteredCars] = useState("")
    const [userOrder, setUserOrder] = useState("")
    const [orderedCar, setOrderedCar] = useState("")
    useEffect(() => {
        User()
        setCity(JSON.parse(localStorage.getItem("city")))
        getCars()
            .then((response) => setCars(response) )
            .catch((err) => console.log(err))
        getAllCities()
            .then((response) =>  setCities(response) )
            .catch((err) => console.log(err))
    }, [])
    useEffect(() => {
        RenderCar()
    }, [city, cars])

    const User = async() => {
        if(localStorage.getItem("jwt")){
            const userID = JSON.parse(localStorage.getItem("jwt")).user._id
        const token= JSON.parse(localStorage.getItem("jwt")).token;
       await findUser(userID, token)
         .then(data => {
             if(data.error){
                 console.log(data.error)
                 
             }else{
                 if(data.order){
                    const order = {
                        "carId" : data.order,
                        "dateFrom":data.orderDateFrom,
                        "dateTo":data.orderDateExpire,
                        "price":data.totalOrderCost,
                        "location":data.location
                    }
                    setUserOrder(order)
                    getCar(order.carId)
                    .then(res => setOrderedCar(res))
                    .catch(err => console.log(err))
                }
             }
         }).catch(err => console.log(err))
        }
    }

    const SelectCity = (n) => {
        setCity(cities[n])
        localStorage.setItem("city", JSON.stringify(cities[n]))
    }
    const RenderCar = () => {
        if(city !== null && cars !== null){
            setFilteredCars(cars.filter(car => car.city.name === city.name))
        }
    }
    const deleteCity =  () => {
        localStorage.removeItem("city")
        setCity(null)
    }


    
    const RenderCurrentCity = () => {
        if(city){
            switch(city.name){
                case 'Mumbai':
                    return (
                        <>
                        <h1 className="uCity">uRides in Mumbai</h1>
                        <button className="uButton" onClick={deleteCity}>Change Location</button>
                        </>
                    )
                case "Bangalore":
                    return (
                        <>
                        <h1 className="uCity">uRides in Bangalore</h1>
                        <button className="uButton" onClick={deleteCity}>Change Location</button>
                        </>
                    )
                case "Hyderabad":
                    return (
                        <>
                        <h1 className="uCity">uRides in Hyderabad</h1>
                        <button className="uButton" onClick={deleteCity}>Change Location</button>
                        </>
                    )
                default: 
                    return (
                        <>
                        <h1 className="uCity">uRides in Delhi</h1>
                        <button className="uButton" onClick={deleteCity}>Change Location</button>
                        </>
                    )
            }
        }
    }

    const renderPrevOrder = () => {
        if(userOrder){
           
        }
        if(userOrder && orderedCar){
            return(
                <div className="prevOrder">
                    <h2>Your previous uRide</h2>
                    <h3>{orderedCar.brand}  {orderedCar.modelName}</h3>
                    <h4>Location: {userOrder.location}</h4>
                    <h4>Pickup Date: {JSON.parse(userOrder.dateFrom)}</h4>
                    <h4>Drop Date: {JSON.parse(userOrder.dateTo)}</h4>
                    <h4>Total Amount to be payed: &#8377;{userOrder.price}/-</h4>
                    <h6>*You can only have one uRide at a time</h6>
                    <h6>**If you place another uRide your previous uRide will be cancelled automatically</h6>
                </div>
            )
        }
    }
    return (
        <div >
            <NavBar/>
            <div className="a">
            <div className="lend-head">    
                <h1>Ride a fully sanitised car with uRide</h1>
                <h2>Book your ride now!</h2>
                <Step3  className="hero-icon-svg"/> 
                <div className='icon-scroll'></div>
            </div>

            {city ?
                <div className="zoom">
                <Grid container >
                    <Grid item xs={12} md={6}>
                        <div className={dark ? "ride-left tiles-container tiles-container-bright" : "ride-left tiles-container tiles-container-dark"}>
                            {RenderCurrentCity()}
                            {renderPrevOrder()}
                            <div className="tile-section">
                            {
                                (filteredCars.length>0) ?
                                filteredCars.map((car, index) => {
                                    return(

                                        <>
                                             <Tile  key={index} {...props} city={city} car={car}/>
                                        </>
                                    )
                                }) : <div className="car-tile">
                                        <Skeleton count={7}/>
                                    </div>
                            }
                            </div>
                        </div>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <div className={dark ? "ride-right ride-right-bright" : "ride-right ride-right-dark"}>
                            <Car className="car-svg" />
                        </div>
                    </Grid>
                </Grid>
                </div>
                :
                <div id="section-2" className={dark ? "city-box city-box-bright" : "city-box city-box-dark"}>
                       <div className="city-box-container">
                       <h1 className="city-h1">Select you city</h1>
                       <h2 className="city-h2">In case your city is not in listed nothing to worry, We are on it.</h2>
                       <Grid  className="city-container" container spacing={0}>

                            <Grid onClick={() => {SelectCity(2)}} className="city-icon-container" item xs={3}>
                                <div className="city-icon-div">
                                <C1  className="city-icon"/>
                                <p className="city-p">Mumbai</p>   
                                </div>
                            </Grid>

                            <Grid onClick={() => {SelectCity(1)}} className="city-icon-container"  item xs={3}>
                                <div className="city-icon-div">
                                <C2  className="city-icon"/>  
                                <p className="city-p">Hyderabad</p>     
                                </div>
                            </Grid>

                            <Grid onClick={() => {SelectCity(0)}}  className="city-icon-container" item xs={3}>
                                <div className="city-icon-div">
                                <C3  className="city-icon"/>    
                                <p className="city-p">Bangalore</p>   
                                </div>
                            </Grid>
                            <Grid onClick={() => {SelectCity(3)}} className="city-icon-container" item xs={3}>
                                <div className="city-icon-div">
                                <C4  className="city-icon"/>  
                                <p className="city-p">Delhi</p>     
                                </div>
                            </Grid>  
                        </Grid>
                       </div>
            
            </div>

            }
            </div>

            <div className="footer">
                <h3>Designed and Developed with <span role="img">❤️</span></h3>
                <h4>&copy; uRide India</h4>
            </div>
        </div>
    )
}

export default Ride
