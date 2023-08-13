import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

function ApplicationStatusDetails() {

    const {register, handleSubmit} = useForm();
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
    <div className='container'>
        <br/>
        <div className='container' style={{width:"500px", height:"250px", backgroundColor:"lightgray"}}>
        <form onSubmit={handleSubmit(getStatus)}><br/>
        <label htmlFor='ex'><h2 style={{color:"rebeccapurple"}} >Selete Type Application Status</h2></label>&nbsp;&nbsp;&nbsp;<br/><br/>
        <center><select id="ex"  {...register('status')}>
            <option value=""></option>
            <option value="Pending" >Pending</option>
            <option value="Apporve" >Apporve</option>
            <option  value="Rejected" >Rejected</option>
            <option value="Disbursed" >Disbursed</option>
        </select></center><br/><br/>
        <center><input type='submit' className='btn btn-success col-5'/></center>
        </form>
        </div>

        <center><h1 style={{color:"rebeccapurple"}}>Application Status</h1></center>
        <table className='table table-success table-striped' style={{textAlign:"center"}}>
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
        </table>

    </div>
    </>
  )
}

export default ApplicationStatusDetails