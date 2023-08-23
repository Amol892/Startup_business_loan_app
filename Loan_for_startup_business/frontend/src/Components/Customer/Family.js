import React, {useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate,NavLink } from 'react-router-dom';

function Family() {

  const {register,formState:{errors},handleSubmit, watch}=useForm({mode:'all'})
  const [message, setMessage] = useState([]);
  const [error, setError] = useState([]);

  const [userIds, setUserIds] = useState([]);
  const watcheduser = watch('user');
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchUserIds() {
      try {
        const response = await axios.get('http://localhost:8000/admin_app/f_user_ids/');
        setUserIds(response.data);
      } catch (error) {
        console.error('Error fetching user IDs:', error);
      }
    }

    fetchUserIds();
  }, []);

  


  async function saveData(data){
        console.log(data.user)
        await axios.post('http://localhost:8000/admin_app/family/',data).then(response=>{
            console.log(response.data)
            setMessage(response.data.message)
            navigate('/bank')
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
                <h1>Add Family details</h1>

                <center style={{color:'aqua'}}><h3>{message}</h3></center><br/>
                <center style={{color:'red'}}><h3>{error}</h3></center><br/>
                </center><hr/>              
                
                <form onSubmit={handleSubmit(saveData)}>

                    <label>
                      <b>Select User ID:</b>&nbsp;&nbsp;&nbsp;&nbsp;
                      <select {...register('user')} style={{padding:8}}>
                        <option value="">Select an ID</option>
                        {userIds.map(userId => (
                          <option key={userId} value={userId}>{userId}</option>
                        ))}
                      </select>
                    </label><br/><br/>

                    
                    <label htmlFor='fn'><b>Father name</b></label>
                    <input type='text' id='fn' className='form-control' placeholder='Enter father_name' {...register('father_name')}/><br/>
                    
                    <label htmlFor='fp'><b>Father profeesion</b></label>
                    <input type='text' id='fp' className='form-control' placeholder='Enter father_profeesion' {...register('father_profeesion')}/><br/>
                    
                    <label htmlFor='fi'><b>Father incomee</b></label>
                    <input type='number' step="0.01" id='fi' className='form-control' placeholder='Enter father_income' {...register('father_income',{required:'This field is required'})}/><br/>

                    <label htmlFor='fc'><b>Father contact</b></label>
                    <input type='text' id='fc' className='form-control' placeholder='Enter father_contact' {...register('father_contact')}/><br/>

                    <label htmlFor='mn'><b>Mother name</b></label>
                    <input type='text' id='mn' className='form-control' placeholder='Enter mother_name' {...register('mother_name')}/><br/>

                    <label htmlFor='mp'><b>Mother profeesion</b></label>
                    <input type='text' id='mp' className='form-control' placeholder='Enter mother_profeesion' {...register('mother_profeesion')}/><br/>

                    <label htmlFor='mi'><b>Mother income</b></label>
                    <input type='number' step="0.01" id='mi' className='form-control' placeholder='Enter mother_income' {...register('mother_income',{required:'This field is required'})}/><br/>

                    <label htmlFor='mc'><b>Mother contact</b></label>
                    <input type='text' id='mc' className='form-control' placeholder='Enter mother_contact' {...register('mother_contact')}/><br/>

                    <label htmlFor='ms'>Martial status</label><br/>
                    <input type='radio' id='ms' value='married' {...register('martial_status',{required:'This field is required'})}/><b>Married</b><br/><br/>
                    <input type='radio' id='ms' value='unmarried' {...register('martial_status',{required:'This field is required'})}/><b>Unmarried</b><br/><br/>
                    <input type='radio' id='ms' value='divorced' {...register('martial_status',{required:'This field is required'})}/><b>Divorced</b><br/><br/>

                    <label htmlFor='sn'><b>Spouse name</b></label>
                    <input type='text' id='sn' className='form-control' placeholder='Enter spouse_name' {...register('spouse_name')}/><br/>

                    <label htmlFor='si'><b>Spouse income</b></label>
                    <input type='number' step="0.01" id='si' className='form-control' placeholder='Enter spouse_income' {...register('spouse_income',{required:'This field is required'})}/><br/>

                    <label htmlFor='sp'><b>Spouse profeesion</b></label>
                    <input type='text' id='sp' className='form-control' placeholder='Enter spouse_profeesion' {...register('spouse_profeesion')}/><br/>

                    <label htmlFor='sc'><b>Spouce contact</b></label>
                    <input type='text' id='sc' className='form-control' placeholder='Enter spouce_contact' {...register('spouce_contact')}/><br/><br/>
                    <hr/>
                    <center>
                    <input type='submit' value='Register' style={{padding:10,fontSize:20}} className='btn btn-success col-8'/><br/><br/>
                    </center>
                </form>
            </div>
            </div>
    
    </>
  )
}

export default Family