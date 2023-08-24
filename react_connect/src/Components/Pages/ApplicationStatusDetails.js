import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

function ApplicationStatusDetails() {

    const {register,formState:{errors}, handleSubmit} = useForm();
    const [sts, setStatus] = useState([])
    async function getStatus(data){
        //console.log(data.status)
        const statusdata = await axios.get("http://127.0.0.1:8000/application/")
        let filterApplication = [];
        for (let i= 0; i<statusdata.data.length; i++) {
        if (statusdata.data[i].status === data.status ) 
        {
            filterApplication = [...filterApplication, statusdata.data[i]];
            setStatus(filterApplication);
        }}
    }
    
    useEffect(()=>{
    },[])


  return (
    <>
    <div style={{backgroundColor:"#3d3840", height:"1800px"}}>
    <div className='container'>
        <br/>
        <div className='container' style={{width:"500px", height:"250px", }}>
        <form onSubmit={handleSubmit(getStatus)}><br/>
        <center><label htmlFor='ex'><h2 style={{color:"white"}} ><b>Check Application Status</b></h2></label></center><br/><br/>
        <center><select id="ex" style={{width:"300px", textAlign:"center", backgroundColor:"#e6d3c5"}} {...register('status', {
            required:{
                value:true,
                message:"please select any status"
            }
        })}>
            <option value="">Select</option>
            <option value="Pending" >Pending</option>
            <option value="verify" >Verify</option>
            <option value="Apporve" >Apporve</option>
            <option  value="Rejected" >Rejected</option>
            <option value="Disbursed" >Disbursed</option>
        </select>
        <p style={{color:"red"}}>
                    { errors.status && errors.status.message }
        </p>
        </center>
        <center><input type='submit' className='btn2 col-5'/></center>
        </form>
        </div>
        <br/>
        <center><h1 style={{color:"white"}}>Application Status</h1></center><br/>
        <center><table className='table table-dark table-hover' style={{textAlign:"center", width:"800px"}}>
            <thead>
                <tr>
                    <th>Application Id</th>
                    <th>Application Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    sts.map(obj=>{
                        return(
                            <tr>
                                <td>{obj.id}</td>
                                <td>{obj.status}</td>
                            </tr>
                        )
                    })

                }

            </tbody>
        </table></center>

    </div>
    </div>
    </>
  )
}

export default ApplicationStatusDetails