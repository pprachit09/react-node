import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Layout from '../layout/Layout'
import {signin, authenticate} from '../../api/auth'

const Signin = () => {

    const [values, setValues] = useState({
        email: 'wayne@wayne.com',
        password: 'Wayne@12345',
        error: '',
        loading: false,
        redirectToReferrer: false
    })

    const {email, password, error, loading, redirectToReferrer} = values

    //handle changes
    const handleChange = name => e => {
        setValues({...values, error:false, [name]: e.target.value })
    }

    //submit changes
    const handleSubmit = e => {
        e.preventDefault()

        setValues({...values, error: false, loading: true})

        signin({email, password}).then(data => {
            if(data.err){
                setValues({...values, error: data.err, loading: false})
            }
            else{
                authenticate(data , () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    })
                })
            }
        })
    }

    //redirect a user
    const redirectUser = () => {
        if(redirectToReferrer){
            return <Redirect to='/' />
        }
    }

    return (
        <div>
            <Layout title='Signin' description="Node React Ecommerce site"></Layout>
            <div className='section container'>
                <div className='row'>
                    <div className="col s12 l5">
                        <div className='container'>
                            <div className="center  teal accent-1" id="alert_box" style={{display: loading ? '': 'none'}}>
                                <i>Loading...</i>   
                            </div>
                            <div className="center red darken-2" id="alert_box" style={{display: error ? '': 'none'}}>{error}</div>
                        </div>

                        <form>
                            <div className="input-field">
                                <i className="material-icons prefix">email</i>
                                <input onChange={handleChange('email')} type="email" id="email" value={email} />
                                <label htmlFor="email">Your Email</label>
                            </div>
                            <div className="input-field">
                                <i className="material-icons prefix">vpn_key</i>
                                <input onChange={handleChange('password')} type="password" id="password" value={password} />
                                <label htmlFor="password">Your Password</label>
                            </div>
                            <div className="input-field center">
                                <button onClick={handleSubmit} className="btn indigo accent-4">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {redirectUser()}
        </div>
    )
}

export default Signin
