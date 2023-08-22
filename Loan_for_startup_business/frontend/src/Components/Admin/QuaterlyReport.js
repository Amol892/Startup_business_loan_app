import React from 'react'
import Plot from 'react-plotly.js'
function QuaterlyReport({quaterly}) {

  const Quaterly_loan_amount = quaterly.Q_A_data
  const Quaterly_loan_count = quaterly.Q_C_data 
  const Quaters = quaterly.Quaters

  var QA_data = [{
    type:'bar',
    x:Quaters,
    y:Quaterly_loan_amount,
    //name:'Monthly Loan sanctioning amount',
    text : Quaterly_loan_amount,
    marker : {color : 'purple'},
  }]

  var layout = {autosize: false,
    width: 1600, height: 500, 
    title: 'Quaterly Loan sanctioning amount', 
    margin: {l:100,r:0,b: 100,t: 100,pad:10},
    //barmode : 'overlay',
    xaxis :{title:'Quater'},
    yaxis : {title:'Loan Amount'},
    font : {size: 16}
    
  }

  var QC_data = [{
    type:'bar',
    x:Quaters,
    y:Quaterly_loan_count,
    //name:'Monthly Loan sanctioning amount',
    text : Quaterly_loan_count,
    marker : {color : 'brown'},
  }]

  var layout1 = {autosize: false,
    width: 1600, height: 500, 
    title: 'Quaterly Number of Applicants', 
    margin: {l:100,r:0,b: 100,t: 100,pad:10},
    //barmode : 'overlay',
    xaxis :{title:'Quater'},
    yaxis : {title:'Count'},
    font : {size: 16}
  }
  return (
    <>
        <div style={{backgroundColor:'olive',borderRadius:20}}>
          <h1 style={{color:'white'}}>Quaterly total loan sanctioning amount :</h1>
        <Plot data={QA_data} layout={layout}/>
        </div>
        <div style={{backgroundColor:'olive',borderRadius:20}}>
        <h1 style={{color:'white'}}>Quaterly Application count :</h1>
        <Plot data={QC_data} layout={layout1}/>
        </div>
    
    </>
  )
}

export default QuaterlyReport