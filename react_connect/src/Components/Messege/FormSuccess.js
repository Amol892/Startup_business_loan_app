import React, { useState } from 'react'

function FormSuccess() {

    const [app_id, setAppID] = useState({})
    const application_id = sessionStorage.getItem("application_id")
    console.log(application_id)
    
  return (
    <>
    <h1>Congratulation Your Application has been save success </h1>
    <h2>Please Check Your Email and upload document</h2>
    </>
  )
}

export default FormSuccess