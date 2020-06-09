import React, {useContext} from 'react'
import Navbar from '../NavBar/navbar'
import {AppContext} from '../../context'
import {Grid} from "@material-ui/core"
import {Link} from 'react-router-dom'
import {ReactComponent as C1} from '../../assets/cityscape-svgrepo-com (1).svg'
import {ReactComponent as C2} from '../../assets/cityscape-svgrepo-com (2).svg'
import {ReactComponent as C3} from '../../assets/cityscape-svgrepo-com (3).svg'
import {ReactComponent as C4} from '../../assets/cityscape-svgrepo-com.svg'
import {ReactComponent as Step1} from '../../assets/step1.svg'
import {ReactComponent as Step2} from '../../assets/step2.svg'
import {ReactComponent as Step3} from '../../assets/step4.svg'
import {ReactComponent as Step4} from '../../assets/step5.svg'
import {ReactComponent as Plan } from '../../assets/undraw_navigator_a479.svg'
import {ReactComponent as Earn} from '../../assets/undraw_order_a_car_3tww.svg'
import './home.scss'
const  Home = () =>  {
    const {dark} = useContext(AppContext)

    return (
        <div>
            <Navbar/>
                    

                    <div id="section1" className={dark ?" hero-box hero-box-bright" : "hero-box hero-box-dark"}>
                        <h1 className="hero-h1">Hassle free self driving car experience with uRide</h1>  
                        <Step3  className="hero-icon-svg"/>   
                        <div className='icon-scroll'></div>
                    </div>

                    <div id="section-2" className={dark ? "city-box city-box-bright" : "city-box city-box-dark"}>
                       <div className="city-box-container">
                       <h1 className="city-h1">We are in these Cities</h1>
                       <h2 className="city-h2">What's you plan?</h2>
                       <Grid className="city-container" container spacing={0}>

                            <Grid  className="city-icon-container" item xs={3}>
                               <Link to="/ride" style={{textDecoration:"none"}}>
                                <div className="city-icon-div">
                                    <C1  className="city-icon"/>
                                    <p className="city-p">Mumbai</p>   
                                    </div>
                               </Link>
                            </Grid>

                            <Grid className="city-icon-container"  item xs={3}>
                               <Link to="/ride" style={{textDecoration:"none"}}>
                               <div className="city-icon-div">
                                <C2  className="city-icon"/>  
                                <p className="city-p">Hyderabad</p>     
                                </div>
                               </Link>
                            </Grid>

                            <Grid  className="city-icon-container" item xs={3}>
                               <Link to="/ride" style={{textDecoration:"none"}}>
                               <div className="city-icon-div">
                                <C3  className="city-icon"/>    
                                <p className="city-p">Bangalore</p>   
                                </div>
                               </Link>
                            </Grid>
                            <Grid  className="city-icon-container" item xs={3}>
                               <Link to="/ride" style={{textDecoration:"none"}}>
                               <div className="city-icon-div">
                                <C4  className="city-icon"/>  
                                <p className="city-p">Delhi</p>     
                                </div>
                               </Link>
                            </Grid>  
                        </Grid>
                       </div>
                    </div>


                    <div className={dark ? "plan-container plan-container-bright" : "plan-container plan-container-dark"}>
                        <Grid container >
                            <Grid item xs={12} md={6}>
                               <div className="plant-text">
                                    <h1>Pre-Plan your ride</h1>
                                    <h3>uRide provides 30 Day before booking</h3>
                                    <Link to="/ride" className="ride-link">Book Now</Link>
                               </div>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <div className="plan-svg-container">
                                    <Plan  className="plan-svg"/>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <div className={dark ? "how-container how-container-bright" : "how-container how-container-dark"} id="section-2">
                        <h1 className="how-h1">
                            How uRide Works?
                        </h1>
                        <h4 className="how-h4">
                            Drive yourself to an adventure and back in 4 simple steps
                        </h4>

                        <Grid container className="steps">

                            <Grid item xs={6} md={3}>
                                <div className="step">
                                    <Step1 className="how-icon"/>
                                    <h4>Book</h4>
                                    <p>Search for and book a car on our website!</p>
                                </div>
                            </Grid>
                            <Grid item xs={6} md={3} >
                                  <div className="step">
                                    <Step2 className="how-icon"/>
                                    <h4>Provide License</h4>
                                    <p>Provide your driver's license, and pay on site</p>
                                  </div>
                            </Grid>
                        
                            <Grid item xs={6} md={3} >
                                  <div className="step">
                                    <Step3 className="how-icon"/>
                                    <h4>Ride</h4>
                                    <p>Get the car keys and enjoy your ride</p>
                                  </div>
                            </Grid>
                            <Grid item xs={6} md={3}>
                                 <div className="step">
                                    <Step4 className="how-icon"/>
                                    <h4>Return</h4>
                                    <p>Return the car to the same location and fill the end checklist to end your trip.</p>
                                 </div>
                            </Grid>
                        </Grid>
                    </div>


                    <div className={dark ? "earn-container earn-container-bright" : "earn-container earn-container-dark"}>
                        <Grid container >

                            <Grid item xs={12} md={6}>
                                <div className="earn-svg-container">
                                    <Earn  className="earn-svg"/>
                                </div>
                            </Grid>


                            <Grid item xs={12} md={6}>
                               <div className="earn-text">
                                    <h1>Earn with uRide</h1>
                                    <h3>Lend your car on uRide when you don't use it.</h3>
                                    <Link to="/lend" className="lend-link">Be a Lender</Link>
                               </div>
                            </Grid>

                            
                        </Grid>
                    </div>

                    <div className="footer">
                        <h3>Designed and Developed with <span role="img">❤️</span></h3>
                        <h4>&copy; uRide India</h4>
                    </div>
        </div>
    )
}

export default Home
