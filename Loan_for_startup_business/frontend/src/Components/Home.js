import React from 'react'
import EMICal from './Homepage/EMICal'

function Home() {
  return (
    <>
      <center><h1 style={{color:'yellow'}}>Welcome to TechGrow Home</h1></center><hr style={{color:'white'}}/>
      <div className='row'>
        <div style={{marginLeft:600}}>
          <EMICal/>
        </div>
      </div>
    </>
  )
}

export default Home