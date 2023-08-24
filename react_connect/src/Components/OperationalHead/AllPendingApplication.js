import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function AllPendingApplication() {
    const [sts, setStatus] = useState([])
    async function getStatus(){
        //console.log(data.status)
        const statusdata = await axios.get("http://127.0.0.1:8000/application/")
        let filterApplication = [];
        for (let i= 0; i<statusdata.data.length; i++) {
        if (statusdata.data[i].status === "Pending" ) 
        {
            filterApplication = [...filterApplication, statusdata.data[i]];
            setStatus(filterApplication);
        }}
    }


    useEffect(()=>{
        getStatus();
    },[])
  return (
    <>
    <div style={{backgroundColor:"#3d3840", height:"1800px"}}>
    <div className='container'>
    <br/><br/>
    <center><h1 style={{color:"white"}}><b>Pending Application </b></h1></center><br/><br/>
        <table className='table table-dark table-striped' style={{width:"1000px",marginLeft:"100px",textAlign:"center"}}>
            <thead>
                <tr>
                    <th>Application Id</th>
                    <th>Application Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    sts.map(obj=>{
                        return(
                            <tr>
                                <td>{obj.id}</td>
                                <td>{obj.status}</td>
                                <td>
                                    <NavLink to={`/view_application/${obj.id}`}><button className='btn2 col-4'>View Application</button></NavLink>&nbsp;&nbsp;
                                    <NavLink to={`/document_table/${obj.id}`}><button className='btn2 col-4'>View Document</button></NavLink>
                                </td>
                            </tr>
                        )
                    })

                }

            </tbody>
        </table>

    </div>
    </div>
    </>
  )
}

export default AllPendingApplication