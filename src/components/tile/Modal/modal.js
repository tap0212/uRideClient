import React, {useState, useContext} from 'react'
import {AppContext} from '../../../context'

import { css } from "@emotion/core";
import {PropagateLoader} from "react-spinners";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DatePicker from 'react-date-picker';
import {updateUser} from '../../../APICalls/auth'
import Lottie from 'react-lottie'
import animationData from '../../../assets/23564-success-tick-animation.json'
import './model.scss'
const Popup = (props) => {
  const override = css`
  display: block;
  margin-left:50%;
 `;

    const {dark} = useContext(AppContext)
    const [CurrentStep, setCurrentStep] = useState(1)
    const [fromDate, setFromDate] = useState(new Date())
    const [toDate, setToDate] = useState(fromDate)
    const [city, setCity] = useState(JSON.parse(localStorage.getItem("city")).name)
    const [price, setPrice] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false)
  const  _next = () => {
        let currentStep = CurrentStep
        currentStep = currentStep >= 2? 3: currentStep + 1
        setCurrentStep(currentStep)
      }
        
    const  _prev = () => {
        let currentStep = CurrentStep
        currentStep = currentStep <= 1? 1: currentStep - 1
        setCurrentStep(currentStep)
      }

     const previousButton = () => {
        let currentStep = CurrentStep;
        if(currentStep !==1){
          return (
            <button 
              className="btn-prev" 
              type="button" onClick={_prev}>
            <ArrowBackIosIcon/>
            </button>
          )
        }
        return null;
      }
      
     const nextButton = () => {
        let currentStep = CurrentStep;
        if(currentStep <3){
          return (
            <button 
              className="btn-next" 
              type="button" onClick={_next}>
            <ArrowForwardIosIcon/>
            </button>        
          )
        }
        return null;
      }
     const onChangeFrom = date => setFromDate( date )
      const onChangeTo = date => setToDate( date )

      const SetPrice = (price) => {
        setPrice(price)
      }

      const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true)
        const price = ((toDate.getDate() - fromDate.getDate()) * props.car.price)
        const dateFrom = JSON.stringify(`${fromDate.getDate()}/${fromDate.getMonth()+1}/${fromDate.getFullYear()}`)
        const dateTo = JSON.stringify(`${toDate.getDate()}/${toDate.getMonth()+1}/${toDate.getFullYear()}`)
        const formData = new FormData()
        formData.append("order", props.car._id)
        formData.append("orderDateFrom", dateFrom)
        formData.append("orderDateExpire",dateTo )
        formData.append("totalOrderCost",price)
        formData.append("location", city)
        const userID = JSON.parse(localStorage.getItem("jwt")).user._id
       const token= JSON.parse(localStorage.getItem("jwt")).token
        updateUser(userID, token, formData)
          .then(res =>{
            if(res.error){
              setError(res.error)
            }
            setLoading(false)
            setSuccess(true)
          
            }
          )
          .catch(err => console.log(err))
      }

      const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

    return (
        <div className={dark ? "booking-popup booking-popup-bright" : "booking-popup booking-popup-dark"}>
            <h2>Schedule Your uRide</h2>
            <p>Step {CurrentStep}/3</p> 
            <Step1 
                currentStep={CurrentStep} 
                date={fromDate}
                setDate={setFromDate}
                onChange={onChangeFrom}
            />
            <Step2 
                currentStep={CurrentStep} 
                date={toDate}
                setDate={setToDate}
                onChange={onChangeTo}
            />
            <Step3 
                error={error}
                fromDate={fromDate}
                toDate={toDate}
                price={props.car.price}
                currentStep={CurrentStep} 
                SetPrice={SetPrice}
                handleSubmit={handleSubmit}
                loading={loading}
                override={override}
                success={success}
                defaultOptions={defaultOptions}
            />
            <h4>Pickup Point: {city}</h4>
            <h5>From: {fromDate.getDate()}/{fromDate.getMonth()+1}/{fromDate.getFullYear()}</h5>
            <h5>To: {toDate.getDate()}/{toDate.getMonth()+1}/{toDate.getFullYear()}</h5>
            <h5 className="last">uRide: {props.car.brand}, {props.car.modelName}</h5>
            {previousButton()}
            {nextButton()}
        </div>

    )
}

function Step1(props) {
    if (props.currentStep !== 1) {
      return null
    } 
    return(
      <div className="step1">
      <h2>From when do you need a uRide?</h2>
        <DatePicker
          onChange={props.onChange}
          value={props.date}
        />
      </div>
    );
  }
  
  function Step2(props) {
    if (props.currentStep !== 2) {
      return null
    } 
    return(
      <div className="step2">
        <h2>Till when do you need it?</h2>
        <DatePicker
          onChange={props.onChange}
          value={props.date}
        />
      </div>
    );
  }
  
  function Step3(props) {
    if (props.currentStep !== 3) {
      return null
    } 
    const days = props.toDate.getDate() - props.fromDate.getDate()
    return(
      <React.Fragment>
      {
        props.success 
        ?
        <div className="success-ride">
        <Lottie className="success-lottie" options={props.defaultOptions}
            height={220}
            width={220}
            isStopped={props.success}
            />
        </div>
        :
        <>
        <div className="step3">
        {props.error &&
          <h4 className="error">{props.error}</h4>
        }
        <h5>Total Days: {days}</h5>
        <h5>Fair/24hrs: {props.price}</h5>
        <h4>Total Fair: &#8377;{days*props.price}</h4>
        </div>
        {
          ((days*props.price <= 0)) ?
            <h4 className="caution">Please choose valid Dates</h4>
           :
          
             ( props.loading) ? 
              <button  className="btn-dis">
                <PropagateLoader
                    css={props.override}
                    size={25}
                    color={"#6C63FE"}
                    loading={props.loading}
                />
              </button>

              :
              <button onClick={props.handleSubmit} className="btn-confirm">Confirm Booking</button>
          
        }
        </>
      }
      </React.Fragment>
    );
  }
export default Popup

