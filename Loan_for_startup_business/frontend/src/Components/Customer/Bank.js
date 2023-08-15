import React, {useState,useEffect} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useNavigate,NavLink } from 'react-router-dom';
function Bank() {

    const {register,formState:{errors},handleSubmit, watch}=useForm({mode:'all'})
    const [message, setMessage] = useState([]);
    const [error, setError] = useState([]);
    const navigate = useNavigate()
    const [userIds, setUserIds] = useState([]);
    const watcheduser = watch('user');
    const [selectedUserId, setSelectedUserId] = useState('');
    
    const handleUserChange = (event) => {
      setSelectedUserId(event.target.value);
    };

    useEffect(() => {
        async function fetchUserIds() {
          try {
            const response = await axios.get('http://localhost:8000/admin_app/b_user_ids/');
            setUserIds(response.data);
          } catch (error) {
            console.error('Error fetching user IDs:', error);
          }
        }
    
        fetchUserIds();
      }, []);

    async function saveData(data){
        
            data.passbook_copy = data.passbook_copy[0]
          await axios.post('http://localhost:8000/admin_app/bank/',data,
          {headers:{'Content-Type':'multipart/form-data'}}).then(response=>{
              console.log(response.data)
              setMessage(response.data.message)
              navigate('/bank')
          }).catch(error=>{
              console.log(error.response.data)
              setError(error.response.data.email)
          })
      }

  return (
    <>
        <div style={{ display: 'flex'}}>
        <div className ="col-2" style={{ marginTop:100}} >
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



        <div className='col-12' style={{backgroundColor:'palegoldenrod',borderRadius:20,padding:40,width:1400}}>
                <center style={{color:'midnightblue'}}>
                <h1>Add Bank details</h1>
                </center><hr/>               
                
                <form onSubmit={handleSubmit(saveData)}>

                    <label>
                      <b>Select User ID:</b>&nbsp;&nbsp;&nbsp;&nbsp;
                      <select {...register('user')} style={{padding:8}} value={selectedUserId} onChange={handleUserChange}>
                        <option value="">Select an ID</option>
                        {userIds.map(userId => (
                          <option key={userId} value={userId}>{userId}</option>
                        ))}
                      </select>
                    </label><br/><br/>

                    
                    <label htmlFor='bn'><b>Bank_name</b></label>
                    <input type='text' id='bn' className='form-control' placeholder='Enter bank_name' {...register('bank_name',{required:'This field is required'})}/><br/>
                    
                    <label htmlFor='an'><b>Account_number</b></label>
                    <input type='text' id='an' className='form-control' placeholder='Enter account_number' {...register('account_number',{required:'This field is required'})}/><br/>
                    
                    <label htmlFor='ic'><b>ifsc code</b></label>
                    <input type='text' step="0.01" id='ic' className='form-control' placeholder='Enter ifsc_code' {...register('ifsc_code',{required:'This field is required'})}/><br/>

                    <label htmlFor='ic'><b>Passbook copy</b></label>
                    <input type='file' step="0.01" id='ic' className='form-control'  {...register('passbook_copy',{required:'This field is required'})}/><br/>

                    <label htmlFor='ba'><b>Bank address</b></label>
                    <input type='text' step="0.01" id='ba' className='form-control' placeholder='Enter bank_address' {...register('bank_address',{required:'This field is required'})}/><br/>
                    <br/><hr/>
                    <center>
                    <input type='submit' value='Register' style={{padding:10,fontSize:20}} className='btn btn-success col-8'/><br/><br/>
                    </center>
                    
                </form>
            </div>
            </div>
    
    </>
  )
}

export default Bank