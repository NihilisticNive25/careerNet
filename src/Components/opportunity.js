import React from 'react'
import DatePicker from "react-datepicker";
 import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from 'react-google-autocomplete';
import { Redirect } from 'react-router-dom';
import ReactDOM from "react-dom";;

 class opportunity extends React.Component {
 constructor(props){
  super(props);
  this.state = {
    redirect: false,
    errors: [],
  }
}
 
    render(){

const { opportunity,handleChange,handleDateChange,handleSelectChange, 
    backgroundOptions, skillOptions ,backgrounds,skills, handleNestedObjChange, handleLocationChange} = this.props

let url = `/opportunity/${opportunity.id}`;

const  date_diff_indays = (applicationdate)=>  {
let dt1 = new Date(applicationdate);
let dt2 = new Date();
return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

const validateFields = () => {

let errors = [];

let node = ReactDOM.findDOMNode(this);
 const title = node.getElementsByClassName("title");        

if(title[0].defaultValue.length > 100){
errors.push("Title should be less than 100 characters");
}

let days = date_diff_indays(opportunity.applications_close_date)
if(Math.abs(days) > 90)
{
    errors.push("Application date cannot be greater than 90 days from current date")
}
if(days > 30){
    errors.push("Application date cannot be less than 30 days from current date")
}

if(opportunity.backgrounds.length > 3){
    errors.push("Maximum of 3 backgrounds");
}

this.setState({errors});
return errors.length > 0 ? false : true;
 
}

const errorList = (feature) => ( feature.map( (a) => <li key={a}>{a}</li> )); 


const updateOpportunity = (e) => {
    e.persist();
   let formIsValid =  validateFields();
   if(!formIsValid)
    return formIsValid;

    let data = {
    	"opportunity": opportunity,
     	"access_token" : "dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c"
     }
     
    fetch(`https://api-staging.aiesec.org/v2/opportunities/${opportunity.id}`, {
    method : 'PATCH',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify(data)
   
  })
  .then(res => res.json())
  .then(data => {
    this.setState({redirect : true});
    
        console.log(data);
  })

}

    if(this.state.redirect) 
       return <Redirect to={url} push/>
   
	return (
		
	<div className="table mid-gray">
    <div className="tableRow mb5">

    <nav className="dt w-100 fl center  ">
         <div className="dtc v-top tr pa3 w-100 z1  fixed bg-blue ">
        <img alt="logo" className="dib pv2 ph3-l ph2 w-50 w-10-l h-20-l w-20-ns fl " src="https://cdn-expa.aiesec.org/assets/images/aiesec-logo-white-blue.svg"/>
        <div className="v-mid">
        <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/" >Careers</a> 
          <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/" >About</a> 
          <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/" >Help</a>           
          <a className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" href="/" >Sign Up</a> 
        </div>
        </div>
      </nav> 
      </div>
      <div className="tableRow">
        <p  className="b pl3 w-100 tl">Edit Details: </p>
      </div>
<div className="tableRow w-100 justify-start">
            <div className="w-100 red fl ">
            {
                this.state.errors.length > 0 ? 
             <ul>{errorList(this.state.errors)}</ul> : true
            }
            </div>
            </div>
		<div className="tableRow ph3 ">
	        <div className="w-90 w-40-m w-50-l tableColumnForm">
	          <label  className="labelCSS">Title </label>
	          <input  className="inputStyle title w-100" 
	          onChange={handleChange.bind(this)}
	          name = "title"
	          type="text" 
	          defaultValue={opportunity.title}/>
	          
	        </div>
	        <div className="w-90 w-40-m w-50-l tableColumnForm" >
	        
	          <label  className="labelCSS">Earliest start date</label>
	          <div className="inputStyle w-100">
	           <DatePicker
	           className="datepickerStyle"
	              selected={opportunity.earliest_start_date}
	        	  onChange={handleDateChange('earliest_start_date')}
	        	  defaultValue={null}
	     		/>
	        </div>
	        </div>
        </div>

        <div className="tableRow  ph3 ">
	        <div className="w-90 w-40-m w-50-l tableColumnForm">
	          <label  className="labelCSS">Application close date</label>
	          <div className="inputStyle w-100">
	           <DatePicker
	           className="datepickerStyle applicationDate"
	              selected={opportunity.applications_close_date}
	        	  onChange={handleDateChange('applications_close_date')}
	        	  defaultValue={null}
	     		/>
	        </div>
	        </div>
	        <div className="w-90 w-40-m w-50-l tableColumnForm" >
	        
	          <label  className="labelCSS">Latest end date</label>
	          <div className="inputStyle w-100">
	           <DatePicker
	           className="datepickerStyle"
	              selected={opportunity.latest_end_date}
	        	  onChange={handleDateChange('latest_end_date')}
	        	  defaultValue={null}
	     		/>
	        </div>
	        </div>
        </div>

        <div className="tableRow  ph3 ">
	        <div className="w-90 w-40-m w-50-l tableColumnForm">
	          <label  className="labelCSS">Duration<span className="normal black-60">(In weeks)</span></label>
	          <input  className="inputStyle w-100" 
	          onChange={handleChange.bind(this)}
	          name = "project_duration"
	          type="text" 
	          defaultValue={opportunity.project_duration}/>
	          
	        </div>
	        <div className="w-90 w-40-m w-50-l tableColumnForm" >
	        
	          <label  className="labelCSS">Positions</label>
	          <input  className="inputStyle w-100" 
	          onChange={handleChange.bind(this)}
	          name = "available_openings"
	          type="text" defaultValue={opportunity.available_openings}/>
	          
	        </div>
        </div>

        <div className="tableRow  ph3 ">
	        <div className="w-90 w-40-m w-50-l tableColumnForm">
	          <label  className="labelCSS">Salary <span className="normal black-60">(In dollars)</span>  </label>
	          <input  className="inputStyle w-100" 
	          onChange={handleNestedObjChange.bind(this)}
	          name = "specifics_info.salary"
	          type="text" 
	          value={opportunity.specifics_info ? opportunity.specifics_info.salary : ""}/>
	          
	        </div>
	        <div className="w-90 w-40-m w-50-l tableColumnForm" >
	        
	          <label  className="labelCSS">Location</label>
	           <Autocomplete
  				   className="inputStyle w-100"
                   name="opportunity.role_info"
   				 types={['address']}
   				 defaultValue={opportunity.role_info ? opportunity.role_info.city : ""}
                 onPlaceSelected={handleLocationChange.bind(this)}
/>
	        </div>
        </div>
         
 		<div className="tableRow  ph3 pb3">
	        <div className="w-90 w-40-m w-50-l tableColumnForm">
	          <label  className="labelCSS">Background <span className="normal black-60">(In dollars)</span>  </label>
            <Select
            isMulti
          value={backgrounds}          
          options={backgroundOptions}
          placeholder = "Select required background"
          classNamePrefix ="w-100"
          name  = "backgrounds"
          isSearchable 
          onChange={handleSelectChange('backgrounds')}
          />
	        </div>
	        <div className="w-90 w-40-m w-50-l tableColumnForm" >
	        
	          <label  className="labelCSS">Skills</label>
	        <Select
	        isMulti
          value={skills}          
          options={skillOptions}
          placeholder = "Select required skills"
          classNamePrefix ="w-100"
          name  = "skills"
          isSearchable 
          onChange={handleSelectChange('skills')}
          />
	          
	        </div>
        </div>
		<div className="tableRow ph3">
		<div className="w-90 w-40-m w-50-l tableColumnForm" >
          <label className="labelCSS">Description <span className="normal black-60">(Max 180 characters)</span></label>
          <textarea value={opportunity.description} 
          onChange={handleChange.bind(this)}
          name = "description"
          className="textareaStyle w-100 tableColumnForm " aria-describedby="comment-desc"></textarea>
 		 </div>
 		 <div className="w-90 w-40-m w-50-l tableColumnForm">
              <label  className="labelCSS">Selection Process</label>
              <input  className="inputStyle w-100" 
              onChange={handleNestedObjChange.bind(this)}
              name = "role_info.selection_process"
              type="text" 
              value={opportunity.role_info ? opportunity.role_info.selection_process : ""}/>
              
            </div>
	</div>

	<div onClick={(event) => updateOpportunity(event)}  className="f6   link dim br1 ph5 pv2 mb2 dib white ma3 bg-blue" >Save</div>
	
    <div className="pv4 bt ph3 ph5-m ph6-l bg-black white">
  <small className="f6 db tc">© 2019 <b className="ttu">Job Site Inc</b>., All Rights Reserved</small>
  <div className="tc mt3">
    <p  className="f6 dib ph2 link mid-gray dim">Language</p>
    <p  className="f6 dib ph2 link mid-gray dim">Terms of Use</p>
    <p  className="f6 dib ph2 link mid-gray dim">Privacy</p>
  </div>
</div>

    </div>
 );
    }
}



export default opportunity;