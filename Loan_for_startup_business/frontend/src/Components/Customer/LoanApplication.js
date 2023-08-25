import React, {useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate,NavLink } from 'react-router-dom';

function LoanApplication() {

    const {register,formState:{errors},handleSubmit, watch}=useForm({mode:'all'})
    const [message, setMessage] = useState([]);
    const [error, setError] = useState([]);
    const [userIds, setUserIds] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchUserIds() {
          try {
            const response = await axios.get('http://localhost:8000/admin_app/a_user_ids/');
            setUserIds(response.data);
          } catch (error) {
            console.error('Error fetching user IDs:', error);
          }
        }
    
        fetchUserIds();
      }, []);

    async function saveData(data){
        console.log(data)
            
            await axios.post('http://localhost:8000/application_generation/createapplication/',data).then(response=>{
                console.log(response.data)
                setMessage(response.data.message)
                navigate('/family')
            }).catch(error=>{
                console.log(error.response.data)
                setError(error.response.data)
            })
        }
  return (
    <>
        <hr style={{color:'white'}}/>
        <div style={{ display: 'flex'}}>
        <div className ="col-2" style={{backgroundColor:'white',borderRadius:20,marginTop:10,padding:10,height:1000}} >
            <ul className ="nav navbar-nav">
            <li>
            <NavLink style={{ alignItems: 'center',fontSize:30, backgroundColor:'aquamarine',fontWeight: 'bold' }} className ="btn btn col-10" to="/createuser"> Create User </NavLink>
            </li>
            <li className ="nav-item">
            <NavLink style={{ alignItems: 'center',fontSize:30, backgroundColor:'coral',fontWeight: 'bold'}} className ="btn btn col-10" to="/loanapplication"> Loan Application </NavLink>
            </li>
            <li className ="nav-item">
            <NavLink style={{ alignItems: 'center',fontSize:30, backgroundColor:'darkgoldenrod',fontWeight: 'bold' }} className ="btn btn col-10" to="/family"> Family details </NavLink>
            </li>
            <li className ="nav-item">
            <NavLink style={{ alignItems: 'center',fontSize:30, backgroundColor:'slateblue',fontWeight: 'bold' }} className ="btn btn col-10" to="/bank"> Bank details </NavLink>
            </li>
            </ul>
            </div>



        <div className='col-12' style={{backgroundColor:'palegoldenrod',borderRadius:20,padding:40,width:1400,marginLeft:100,marginTop:10}}>
                <center style={{color:'midnightblue'}}>
                <h1>Loan Application</h1>
                </center><hr/>              
                
                <form onSubmit={handleSubmit(saveData)}>

                        <div>
                            <label>
                            <b>Select User ID:</b>&nbsp;&nbsp;&nbsp;&nbsp;
                            <select {...register('user')} style={{padding:8}}>
                                <option value="">Select an ID</option>
                                {userIds.map(userId => (
                                <option key={userId} value={userId}>{userId}</option>
                                ))}
                            </select>
                            </label>
                            <p style={{color:"red"}}>{ errors.user && errors.user.message }</p>
                        </div>

                        <br/><br/>

                        <div>
                        <label htmlFor='aadhar_no'>Adhar Number</label>
                        <input id="aadhar_no" type='text' className='form-control' {...register("aaddar_no", 
                                    {required:{
                                        value: true,
                                        message: "This field is required"
                                    },
                                    minLength:{
                                        value:12,
                                        message:"Aadhar Number can not less than 12 digits"
                                    },
                                    maxLength:{
                                        value:12,
                                        message:"Aadhar Number can not greater than 12 digits"
                                    }
                                    })} />
                                    <p style={{color:"red"}}>
                                        { errors.aaddar_no && errors.aaddar_no.message }
                                    </p>
                        </div>

                        <br/><br/>

                        <div>
                        <label htmlFor='pan_no'>PAN Number</label>
                        <input id="pan_no" type='text' className='form-control' {...register("pan_no", 
                                    {required:{
                                        value: true,
                                        message: "This field is required"
                                    },
                                    minLength:{
                                        value:10,
                                        message:"Please Enter 10 character PAN Number"
                                    },
                                    maxLength:{
                                        value:10,
                                        message:"Please Enter 10 character PAN Number"
                                    },
                                    pattern:{
                                        value: /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/,
                                        message:"Please Enter Valid Pan Number"
                                    }
                                    })}/>
                                    <p style={{color:"red"}}>
                                        { errors.pan_no && errors.pan_no.message }
                                    </p>
                        </div>

                        <br/><br/>

                        <dv>
                        <label htmlFor='type_of_employmenet'>Employement Type</label>&nbsp;&nbsp;
                        <select id="type_of_employmenet" style={{width:"300px", textAlign:"center",padding:8}} {...register("type_of_employment",
                        {
                            required:{
                                value: true,
                                message: "This field is required"
                            }
                        })}>
                            <option value=""></option>
                            <option value="Salaried">Salaried</option>
                            <option value="Self-Employed">Selfemployed</option>
                        </select>
                        <p style={{color:"red"}}>
                            { errors.type_of_employment && errors.type_of_employment.message }
                        </p>
                        </dv>

                        <br/><br/><br/>

                        <div>
                        <label htmlFor='business_title'>Business Tile</label>
                        <input id='business_title' type='text' className='form-control' {...register("business_title", 
                                    {required:{
                                        value: true,
                                        message: "This field is required"
                                    },
                                    minLength:{
                                        value:5,
                                        message:"Please Enter at least 5 chanracter"
                                    },
                                    maxLength:{
                                        value:20,
                                        message:"Please Enter do enter above 50 chanracter"
                                    }
                        })}/>
                        <p style={{color:"red"}}>
                            { errors.business_title && errors.business_title.message }
                        </p>
                        </div>

                        <br/><br/>
                        
                        <div>
                        <label htmlFor='business_type'>Business Type</label>&nbsp;&nbsp;
                        <select id="business_type" style={{width:"300px", textAlign:"center",padding:8}} {...register("business_type",
                        {
                            required:{
                                value: true,
                                message: "This field is required"
                            }
                        })}>
                            <option value=""></option>
                            <option value="Service">Service</option>
                            <option value="Manufacturing">Manufacturing</option>
                            <option value="Treders">Treders</option>
                        </select>
                        <p style={{color:"red"}}>
                            { errors.business_type && errors.business_type.message }
                        </p>
                        </div>
                        
                        <br/><br/><br/>
                        
                        <div>
                        <label htmlFor='business_address'>Business Address</label>
                        <input id='business_address' type='text' className='form-control' {...register("business_address", 
                                    {required:{
                                        value: true,
                                        message: "This field is required"
                                    },
                                    minLength:{
                                        value:5,
                                        message:"Please Enter at least 5 chanracter"
                                    },
                                    maxLength:{
                                        value:100,
                                        message:"Please Enter do enter above 100 chanracter"
                                    }
                        })} />
                        <p style={{color:"red"}}>
                            { errors.business_address && errors.business_address.message }
                        </p>
                        </div>

                        <br/><br/>
                        
                        <div>
                        <label htmlFor='gst_registration_no'>GST Registration Number</label>
                        <input id="gst_registration_no" type='text' className='form-control' {...register("gst_registration_no", 
                                    {required:{
                                        value: true,
                                        message: "This field is required"
                                    },
                                    minLength:{
                                        value:15,
                                        message:"Please Enter 15 chanracter GST Registration Number"
                                    },
                                    maxLength:{
                                        value:15,
                                        message:"Please Enter do enter above 15 chanracter"
                                    },
                                    pattern:{
                                        value:/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                                        message:"Please Enter Valid Gst Registration Number"
                                    }
                        })}/>
                        </div>
                        <p style={{color:"red"}}>
                            { errors.gst_registration_no && errors.gst_registration_no.message }
                        </p>
                        <br/><br/>
                        
                        <div>
                        <label htmlFor='business_license_no'>Business Licence Number</label>
                        <input id='business_license_no' type='text' className='form-control' {...register("business_license_no", 
                                    {required:{
                                        value: true,
                                        message: "This field is required"
                                    },
                                    minLength:{
                                        value:16,
                                        message:"Please Enter 16 chanracter"
                                    },
                                    maxLength:{
                                        value:16,
                                        message:"Please Enter do enter above 16 chanracter"
                                    }
                        })}/>
                        <p style={{color:"red"}}>
                            { errors.business_license_no && errors.business_license_no.message }
                        </p>
                        </div>
                        
                        <br/><br/>

                        <div>
                        <label htmlFor='expected_average_annual_turnover'>Annual Turnover</label>
                        <input id='expected_average_annual_turnover' type='text' className='form-control' {...register("expected_average_annual_turnover", 
                                    {required:{
                                        value: true,
                                        message: "This field is required"
                                    },
                                    min:{
                                        value:1,
                                        message:"Annual Turnover cannot be less than zero"
                                    }
                                    })} />
                        <p style={{color:"red"}}>
                            { errors.expected_average_annual_turnover && errors.expected_average_annual_turnover.message }
                        </p>
                        </div>
                        
                        <br/><br/>
                        
                        <div>
                        <label htmlFor='years_in_current_business'>How Many Years You are In Business ?</label>
                        <input id='years_in_current_business' type='number' className='form-control' {...register("years_in_current_business", 
                                    {required:{
                                        value: true,
                                        message: "This field is required"
                                    },
                                    min:{
                                        value:1,
                                        message:"Business cannot be less than zero"
                                    }
                                    })} />
                            <p style={{color:"red"}}>
                                { errors.years_in_current_business && errors.years_in_current_business.message }
                            </p>
                        </div>
                        
                        <br/><br/>
                        
                        <div>
                        <label htmlFor='collateral'>Collateral</label>
                        <input id='collateral' type='text' className='form-control' {...register("collateral", 
                                    {required:{
                                        value: true,
                                        message: "This field is required"
                                    },
                                    minLength:{
                                        value:5,
                                        message:"Please Enter 5 chanracter"
                                    },
                                    maxLength:{
                                        value:50,
                                        message:"Please Enter do enter above 50 chanracter"
                                    }
                        })} />
                        <p style={{color:"red"}}>
                                { errors.collateral && errors.collateral.message }
                            </p>
                        </div>
                        
                        <br/><br/>
                        
                        <div>
                        <label htmlFor='status'>Status</label>&nbsp;&nbsp;
                        <select id="status" style={{width:"300px", textAlign:"center",padding:8}} {...register("status",
                        {
                            required:{
                                value: true,
                                message: "This field is required"
                            }
                        })}>
                            <option value=""></option>
                            <option value="Pending">Pending</option>
                            <option value="Apporve">Apporve</option>
                            <option value="Rejected">Rejected</option>
                            
                        </select>
                        <p style={{color:"red"}}>
                                { errors.status && errors.status.message }
                            </p>
                        </div>

                        <br/><br/><br/>
                        
                        <div>
                        <label htmlFor='timestamp'>Application Timestamp</label>
                        <input id='timestamp' type='datetime-local' className='form-control' {...register("application_timestamp",
                        {
                            required:{
                                value: true,
                                message: "This field is required"
                            }
                        })}/>
                        <p style={{color:"red"}}>
                                { errors.application_timestamp && errors.application_timestamp.message }
                        </p>
                        </div>

                        <br/><br/>
                        
                        <div>
                        <label htmlFor='remark'>Remark</label>
                        <input id='remark' type='text' className='form-control' {...register("remark", 
                                    {required:{
                                        value: true,
                                        message: "This field is required"
                                    },
                                    minLength:{
                                        value:5,
                                        message:"Please Enter 5 chanracter"
                                    },
                                    maxLength:{
                                        value:50,
                                        message:"Please Enter do enter above 50 chanracter"
                                    }
                        })}/>
                        <p style={{color:"red"}}>
                                { errors.remark && errors.remark.message }
                        </p>
                        </div>

                        <br/><br/>
    
                    <hr/>
                    <center>
                    <input type='submit' value='Create Application' style={{padding:10,fontSize:20}} className='btn btn-success col-8'/><br/><br/>
                    </center>
                    
                </form>
            </div>
            </div>
    
    </>
  )
}

export default LoanApplication