import React, {useContext, useState, useEffect} from 'react'
import Navbar from '../NavBar/navbar'
import {AppContext} from '../../context'
import {Grid} from "@material-ui/core"
import { getCars, deleteCar} from '../../APICalls/car'
import Lottie from 'react-lottie'
import animationData from '../../assets/23564-success-tick-animation.json'
import { css } from "@emotion/core";
import {PropagateLoader} from "react-spinners";
import {Link} from 'react-router-dom'
import {ReactComponent as Sell} from '../../assets/undraw_Vehicle_sale_a645.svg'
import LendForm from './lendForm'
import {ReactComponent as Step3} from '../../assets/step4.svg'
import './lend.scss'
const  Lend = () => {
    const override = css`
    display: block;
    margin-left:50%;
   `;


    const {dark} = useContext(AppContext)
    const [car, setUserCar] = useState("")
    const [carDeleted, setCarDeleted] = useState(false)
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect( () => {
        getUserCar()
    }, [])

    const getUserCar = () => {
        getCars()
            .then(cars => {
                cars.map(car => {
                    const ID = JSON.parse(localStorage.getItem("jwt")).user._id
                    if(car.user._id === ID){
                        setUserCar(car)
                    }
                })
            })
            .catch(e => console.log(e))
    }

    const handleDeleteCar = () => {
        setLoading(true)
        const ID = JSON.parse(localStorage.getItem("jwt")).user._id;
        const token = JSON.parse(localStorage.getItem("jwt")).token
        deleteCar(car._id, ID, token)
            .then(res => {
                setCarDeleted(true)
                 setLoading(false)
            })
            .catch(e => console.log(e))
    }



    const DeletedCar = () => {
        if(carDeleted){
            return (
                <>
                <h1>Car Deleted</h1>
                </>
            )
        }
    }
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    const SuccessMessage = () => {
      if(success){
        return (
            <Lottie options={defaultOptions}
            height={400}
            width={400}
            isStopped={success}
            />
            )
      }
    }
    const RenderExistingCar = () => {
        return (<>
            <h1>Already registered {car.brand} {car.modelName}</h1>
        
            {loading ?
                <button className="btn-disabled" disabled>
                    <PropagateLoader
                    css={override}
                    size={10}
                    color={"#ffffff"}
                    loading={loading}
                    />
                </button>
             :
                <button className="btn" onClick={handleDeleteCar}>Remove {car.modelName}</button>
             }
        </>)
    }




    return (
        <div>
            <Navbar />
            <div className="lend-head">    
                <h1>Don't let your car wait in garage</h1>
                <h2>Earn when you're not using it.</h2>
                <Step3  className="hero-icon-svg"/>   
                <div className='icon-scroll'></div>
            </div>
            <div className={dark ? "plan-container plan-container-bright" : "plan-container plan-container-dark"}>
                        <Grid container >
                            <Grid item xs={12} md={6}>
                               <div className="plant-text">
                                    <h1>List you vehicle on uRide Now!</h1>
                                    <h3>By just filling out a simple form</h3>
                                    <Link to="/ride" className="ride-link">Lend Now</Link>
                               </div>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <div className="plan-svg-container">
                                    <Sell  className="plan-svg"/>
                                </div>
                            </Grid>
                        </Grid>
            </div>
            <div className={dark ? "lend-form-container lend-form-container-bright" : "lend-form-container lend-form-container-dark"}>
                {
                    carDeleted &&
                        DeletedCar()
                }
                {(car && !carDeleted) ? 
                    RenderExistingCar()
                 :
                (success ?
                     SuccessMessage()
                : 
                    <LendForm  setSuccess={setSuccess}/>
                ) 
                 }
            </div>

            <div className="footer">
                <h3>Designed and Developed with <span role="img">❤️</span></h3>
                <h4>&copy; uRide India</h4>
            </div>
        </div>
    )
}

export default Lend
