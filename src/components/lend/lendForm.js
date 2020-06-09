import React, {useState, useEffect, useContext} from 'react'
import {AppContext} from '../../context'
import {getAllCities, getAllCategories} from '../../APICalls/utils'
import {createCar} from '../../APICalls/car'
import {Grid} from '@material-ui/core'
import { css } from "@emotion/core";
import {Alert} from '@material-ui/lab'
import {PropagateLoader} from "react-spinners";
import { isAuthenticated } from '../../APICalls/auth'
import {ReactComponent as Step3} from '../../assets/step4.svg'

 const  LendForm = (props) => {
    const override = css`
    display: block;
    margin-left:50%;
   `;

   const {dark} = useContext(AppContext)
    const [cities, setCities] = useState("")
    const [categories, setCategories] = useState("")
    const [categoryId, setCategoryId] = useState("5ed1e8231448d23446570f2a")
    const [brand, setBrand] = useState("")
    const [model, setModel] = useState("")
    const [year, setYear] = useState("")
    const [cityId, setCityId] = useState("5ed28e01eceb371db1e52ef7")
    const [price, setPrice] = useState("")
    const [userId, setUserId] = useState("")
    const [userToken , setToken] = useState("")
    const [photo, setPhoto] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    useEffect( () => {
        const {user, token} = isAuthenticated()
        setUserId(user._id)
        setToken(token)
        getCities()
        getCategories()  
          
    }, [])



    
    const getCities = async () => {
        setLoading(true)
        await  getAllCities().then(response => {
         setCities(response)
         setLoading(false)
        }).catch(err => console.log(err))
    }
    const getCategories = async () => {
        setLoading(true)
        await  getAllCategories().then(response => {
           setCategories(response)
           setLoading(false)
        }).catch(err => console.log(err))
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        setError("")
        setSubmitting(true)
        let formData = new FormData()
        formData.append("brand", brand);
        formData.append("modelName", model)
        formData.append("year", year)
        formData.append("category", categoryId)
        formData.append("user", userId)
        formData.append("city", cityId)
        formData.append("price", price)
        formData.append("photo", photo)
        createCar(userId, userToken, formData)
            .then(data => {
                if(data.error){
                    setError(data.error)
                    setLoading(false)
                    props.setSuccess(false)
                }else{
                    setBrand("")
                    setModel("")
                    setYear("")
                    setCategoryId("")
                    setCityId("")
                    setPrice("")
                    setPhoto("")
                    setSubmitting(false)
                    props.setSuccess(true)
                }
            })
            .catch(err => console.log(err))
    }

   const Flash = () => {
        if(error){
          return  <Alert  severity="error"><span className="flash">{error}</span></Alert>
        }
        
        if(loading === true){
            return <PropagateLoader
            css={override}
            size={25}
            color={"#6C63FE"}
            loading={loading}
          />
        }
    }


    return (
        <>
            <h1>Lend you car Now!</h1>
            <div id="car-svg">
                <Step3  className="hero-icon-svg"/>  
            </div> 
            <form className={dark ? "lend-form lend-form-bright" : "lend-form lend-form-dark"}>
            {Flash()}
                <h2>Peeps will definitely like your ride give us some basic details</h2>
            <Grid container spacing={3}>
                <Grid item xs={6} className="lend-form-control">
                    <label htmlFor="category">Category</label>
                    <select
                        className="lend-select" placeholder="Choose Category"
                        onChange={(e) => {setCategoryId(e.target.value)}}
                        >
                        {categories &&
                            categories.map((cate, index) => (
                            <option  key={index} value={cate._id}>
                                {cate.name}
                            </option>
                            ))}
                    </select>
                </Grid>

                <Grid item xs={6} className="lend-form-control">
                    <label htmlFor="brand">Car Brand</label>
                    <input className="input"
                        type="text"
                        placeholder="Toyota"
                        name="brand"
                        onChange={(e) => {setBrand(e.target.value)}}
                        required
                        />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={6} className="lend-form-control">
                    <label htmlFor="model">Car Model</label>
                    <input className="input"
                        type="text"
                        placeholder="Corola Altis"
                        name="model"
                        onChange={(e) => {setModel(e.target.value)}}
                        required
                    />
                </Grid>

                <Grid item xs={6} className="lend-form-control">
                    <label htmlFor="year">Model Year</label>
                    <input className="input"
                        type="text"
                        placeholder="2017"
                        name="year"
                        onChange={(e) => {setYear(e.target.value)}}
                        required
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={6} className="lend-form-control">
                    <label htmlFor="year">Price for 24 Hours</label>
                    <input className="input"
                        type="number"
                        placeholder="$$$"
                        name="price"
                        onChange={(e) => {setPrice(e.target.value)}}
                        required
                    />
                </Grid>
                    
                <Grid item xs={6} className="lend-form-control">
                    <label htmlFor="city">Choose your Location</label>
                    <select
                    className="lend-select"
                    onChange={(e) => {setCityId(e.target.value)}}
                    >
                    {cities &&
                        cities.map((cate, index) => (
                        <option key={index} value={cate._id}>
                            {cate.name}
                        </option>
                        ))}
                    </select>
                </Grid>
            </Grid>
            <div className="img-upload">
                <input
                    onChange={(e) => {setPhoto(e.target.files[0])}}
                 className="img-input" type="file" />
                <p className="img-p">Drag vehicle image here or click in this area.</p>
            </div>
                {
                    submitting 
                    ? <button className="btn-disabled" disabled><PropagateLoader
                        css={override}
                        size={10}
                        color={"#ffffff"}
                        loading={submitting}
                    /></button>

                    : 
                    
                    <button className="btn" onClick={handleSubmit}>Submit</button>
                }

            </form>
        </>
    )
}



export default LendForm