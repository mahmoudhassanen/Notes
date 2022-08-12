import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Joi from "joi"
export default function Register() {
    let navigate = useNavigate()
    const [Loading, setLoading] = useState(false)
    const [Error, setError] = useState()
    const [ErrorList, setErrorList] = useState([])
    const [User, setUser] = useState({

        first_name : ' ',
        last_name : ' ' , 
        email : ' ' ,
        password : ''
    
        
    })
    function RegisterUser(e) {
        let user = {...User}
        user[e.target.name] = e.target.value;
        setUser(user);
        console.log(user)

        
    }

    
    async function RegisterSubmit(e) {
        e.preventDefault();
        setLoading(true)
        let ValidationResult = Validation(User)
        if (ValidationResult.error) {
          setLoading(false)
          setErrorList(ValidationResult.error.details)
          
        }
        else
        {
            let {data} = await axios.post('https://route-egypt-api.herokuapp.com/signup' , User)
            console.log(data);
            if (data.message === 'success') {
                setLoading(false)
                navigate('/Login')
                
            }
            else
            {
                setLoading(false)
                let message = data.message
                let result = message.substring(33 , 58)
                setError(result);
                console.log(result)
            }
        }
      
       
    }
    function Validation() {
        let schema = Joi.object(
            {
                first_name : Joi.string().alphanum().min(3).max(30).required(),
                last_name : Joi.string().alphanum().min(3).max(30).required(),
      
                email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
                password : Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
                
                }


        )
        return schema.validate(User , {abortEarly:false});
        
    }
    

  return (
    <div>
         <div className="container my-5 py-5">
                <div className="col-md-5 m-auto text-center">
                <div>
  {ErrorList.map((error , index)=>
  {
    if (index === 4) {
      return  <div key={index} className="alert alert-light" data-aos="fade-right"    role="alert">
     Password Invalid
      </div>
      
      
    }
    else
    {
      return  <div key={index} className="alert alert-light" data-aos="fade-right"    role="alert">
     {error.message}
       </div>
    }
  }
 
  )}
{Error?<div className="alert alert-light" data-aos="fade-right"    role="alert">
{Error}
</div> : ''}
</div>  
                    <form  onSubmit={RegisterSubmit}>
                        <div className="form-group">
                            <input onChange={RegisterUser}  placeholder="Enter your name" name="first_name" type="text" className=" form-control" />
                        </div>
                        <div className="form-group my-2 ">
                            <input   onChange={RegisterUser} placeholder="Enter your name" name="last_name" type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input  onChange={RegisterUser} placeholder="Enter email" type="email" name="email" className="form-control" />
                        </div>
                        <div className="form-group my-2">
                            <input   onChange={RegisterUser} placeholder="Enter you password" type="password" name="password" className=" form-control" />
                        </div>
                        <button type="submit" className="btn btn-info w-100">{Loading? <i class="fa-solid fa-spinner fa-spin"></i>: "SignUp"}</button>

                       
                    </form>
                </div>
            </div>
    </div>
  )
}
