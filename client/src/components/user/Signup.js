import React, {useState} from 'react'
import Layout from '../layout/Layout' 
import {Link} from 'react-router-dom'
import {signup} from '../../api/auth'

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    })

    const {name, email, password, error, success} = values

    //handle changes
    const handleChange = name => e => {
        setValues({...values, error:false, [name]: e.target.value })
    }

    //submit changes
    const handleSubmit = e => {
        e.preventDefault()

        setValues({...values, error: false})

        signup({name, email, password}).then(data => {
            if(data.error){
                setValues({...values, error: data.error, success: false})
            }
            else{
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    }
  
    return (
        <div>
            <Layout title='Signup' description="Node React Ecommerce site"></Layout>
            <div className='section container'>
                <div className='row'>
                    <div className="col s12 l5">
                        <div className='container'>
                            <div className="center  teal accent-1" id="alert_box" style={{display: success ? '': 'none'}}>
                                Account is created.. Please <Link to='/signin'>Signin</Link>   
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
                                <i className="material-icons prefix">tag_faces</i>
                                <input onChange={handleChange('name')} type="text" id="name" value={name} />
                                <label htmlFor="name">Your Name</label>
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
        </div>
    )
}

export default Signup
