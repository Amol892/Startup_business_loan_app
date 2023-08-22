import React from 'react'
import { useLocation } from 'react-router-dom'
import Plot from 'react-plotly.js'
function MACReport({monthly}) {

    

    const Month_loan_amount = monthly.MLAmount
    

    const Month_loan_count = monthly.MACount 
    const Months = monthly.Months
    console.log(Month_loan_amount)
    console.log(Month_loan_count)
    console.log(monthly)

    var M_A_data = [{
      type:'bar',
      x:Months,
      y:Month_loan_amount,
      
      //name:'Monthly Loan sanctioning amount',
      text : Month_loan_amount,
      marker : {color : ['coral','purple']},
    },
    
  ]

    var layout = {autosize: false,
      width: 1600, height: 500, 
      title: 'Monthly Loan sanctioning amount', 
      margin: {l:100,r:0,b: 100,t: 100,pad:10},
      barmode : 'overlay',
      xaxis :{title:'Month'},
      yaxis : {title:'Loan Amount'},
      font : {size: 16},
      //barmode : 'overlay',
      
    }

    var M_C_data = [{
      type:'bar',
      x:Months,
      y:Month_loan_count,
      //name:'Monthly Loan sanctioning amount',
      text : Month_loan_count,
      marker : {color : ['coral','brown']},
    },
    
    
  ]

    var layout1 = {autosize: false,
      width: 1600, height: 500, 
      title: 'Number of Applicants', 
      margin: {l:100,r:0,b: 100,t: 100,pad:10},
      //barmode : 'overlay',
      xaxis :{title:'Month'},
      yaxis : {title:'Count'},
      font : {size: 16},
      //barmode : 'overlay',
      
    }
  return (
    <>
        <div style={{backgroundColor:'olive',borderRadius:20}}>
          <h1 style={{color:'white'}}>Monthly total loan sanctioning amount :</h1>
        <Plot data={M_A_data} layout={layout}/>
        </div>
        <div style={{backgroundColor:'olive',borderRadius:20}}>
        <h1 style={{color:'white'}}>Monthly Application count :</h1>
        <Plot data={M_C_data} layout={layout1}/>
        </div>
        
    
    </>
  )
}

export default MACReport