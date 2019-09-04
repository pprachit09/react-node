import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import Layout from "../layout/Layout";
import { isAuthenticated } from "../../api/auth";
import { createCategory } from "../../api/admin"
 
const AddCategory = () => {

    const [name , setName] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    //get user and token from localstorage

    const {user, token} = isAuthenticated()

    const categoryForm = () => (
        <div className='row'>
            <div className='col s12'>
                <div className='row'>
                    <div className='input-field col s6'>
                        <i className='material-icons prefix'>add_circle_outline</i>
                        <input id="icon_prefix" type="text" className="validate" onChange={handleChange} value={name} />
                        <label htmlFor="icon_prefix">Category</label>
                    </div>
                    <div className='input-field col s6'>
                        <button className="btn waves-effect waves-light lime lighten-2" type="submit" onClick={handleSubmit}>Create
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
    
    const handleChange = e => {
        setError('')
        setName(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault()
        setError('')
        setSuccess(false)
        //call API to add category
        createCategory(user._id, token, {name})
            .then(data => {
                if(data.error){
                    setError(data.error)
                }
                else{
                    setError('')
                    setSuccess(true)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    const showSuccess = () => {
        if (success) {
            return <h5 className='green-text text-darken-3'>{name} is created</h5>
        }
    }

    const showError = () => {
        if (error) {
            return <h5 className='red-text text-darken-3'>{name} already exist</h5>
        }
    }

    const goBack = () => (
        <div className='container'>
            <Link className='red-text text-darken-2' to='/admin/dashboard'>Back to Dashboard</Link>
        </div>
    )

    return (
        <div>
            <Layout title="Add a new Category" description={`${user.name} are you ready add new category?`} />
            {showSuccess()}
            {showError()}
            {categoryForm()}
            {goBack()}
        </div>
    )
}

export default AddCategory
