import React from 'react'
import  {useLocation,NavLink, useNavigate} from 'react-router-dom'


function LRDocumentCard() {

    const navigate = useNavigate()
    const {state} = useLocation();
    const { user } = state; // Read values passed on state  
    const baseurl="http://127.0.0.1:8000"
    const access = sessionStorage.getItem('access')
    

        
  return (
    <>
        <hr style={{color:'white'}}/>
        <div>
        
        
        <center><div style={{color:'black',backgroundColor:'khaki',padding:20}}><h2>Applicants Documents</h2></div></center>
              <div className='row' style={{display:'flex',}}>
              <div className='col-10'>
                <NavLink to={baseurl+user.aadhar_card}><button style={{fontWeight:500,height:150,width:300, padding:20,fontSize:20,borderRadius:10,marginLeft:50,marginTop:50}} type="button" >Aadhar Card</button></NavLink>
                <NavLink to={baseurl+user.pan_card}><button style={{fontWeight:500,textAlign:'center',height:150,width:300, padding:20,fontSize:20,borderRadius:10,marginLeft:50,marginTop:50}} type="button" >Pan Card</button></NavLink>
                <NavLink to={baseurl+user.business_address_proff_or_copy_of_rent_agreement}><button style={{fontWeight:500,textAlign:'center',height:150,width:300,padding:20,fontSize:20,borderRadius:10,marginLeft:50,marginTop:50}} type="button" >Business Adress Proof</button></NavLink>
                <NavLink to={baseurl+user.electricity_bill}><button style={{fontWeight:500,height:150,width:300,padding:20,fontSize:20,borderRadius:10,marginLeft:50,marginTop:50}} type="button" >Electricity Bill</button></NavLink>
                <NavLink to={baseurl+user.msme_certificate}><button style={{fontWeight:500,height:150,width:300,padding:20,fontSize:20,borderRadius:10,marginLeft:50,marginTop:50}} type="button" >MSME Certificate</button></NavLink>
                <NavLink to={baseurl+user.gst_cerificate}><button style={{fontWeight:500,height:150,width:300,padding:20,fontSize:20,borderRadius:10,marginLeft:50,marginTop:50}} type="button">Electricity Bill</button></NavLink>
                <NavLink to={baseurl+user.udhyog_adhar_registration}><button style={{fontWeight:500,height:150,width:300,padding:20,fontSize:20,borderRadius:10,marginLeft:50,marginTop:50}} type="button" >Udyog Adhar Registration</button></NavLink>
                <NavLink to={baseurl+user.business_lincense}><button style={{fontWeight:500,height:150,width:300,padding:20,fontSize:20,borderRadius:10,marginLeft:50,marginTop:50}} >Business License</button></NavLink>
                <NavLink to={baseurl+user.business_plan_or_proposal}><button style={{fontWeight:500,height:150,width:300,padding:20,fontSize:20,borderRadius:10,marginLeft:50,marginTop:50}} type="button" >Business Plan</button></NavLink>
                <NavLink to={baseurl+user.three_year_itr_with_balance_sheet}><button style={{fontWeight:500,height:150,width:300,padding:20,fontSize:20,borderRadius:10,marginLeft:50,marginTop:50}} type="button" >Three year balance sheet</button></NavLink>
                <NavLink to={baseurl+user.collateral_document}><button style={{fontWeight:500,height:150,width:300,padding:20,fontSize:20,borderRadius:10,marginLeft:50,marginTop:50}} type="button" >Collateral Documents</button></NavLink>
                <NavLink to={baseurl+user.stamp_duty}><button style={{fontWeight:500,height:150,width:300,padding:20,fontSize:20,borderRadius:10,marginLeft:50,marginTop:50}} type="button" >Stamp Duty</button></NavLink>

              </div>
              
              </div>

        </div>
    
    </>
  )
}

export default LRDocumentCard