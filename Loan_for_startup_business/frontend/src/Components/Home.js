import React from 'react'
import EMICal from './Homepage/EMICal'
import SimpleImageSlider from "react-simple-image-slider";
import  St from './Backgroundimage/Startup.webp';
import  P2 from './Backgroundimage/P2.jpg';
import  P3 from './Backgroundimage/P3.jpg';
import  P4 from './Backgroundimage/P4.jpg';
import  P1 from './Backgroundimage/P1.jpg';
function Home() {

    const images = [
      {url : P2},
      {url : St},
      {url : P3},
      {url : P4},
      {url : P1},
    ]


  return (
    <>
      <center><h1 style={{color:'yellow'}}>Welcome to TechGrow Home</h1></center><hr style={{color:'white'}}/>
      <div className='row' style={{marginLeft:30,display:'flex'}}>
        <div className='col-6'>
        <SimpleImageSlider
          width={1096}
          height={680}
          images={images}
          showBullets={true}
          showNavs={true}
          autoPlay={true}
          autoPlayDelay={2}
        />
        </div>
        <div className="col-6" style={{marginLeft:0}}>
          <EMICal/>
        </div>
      </div>
    </>
  )
}

export default Home