import React from 'react'
import DatePicker from "react-datepicker";
 import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from 'react-google-autocomplete';

 
const opportunity = ({ 
    opportunity,apply,handleChange,handleDateChange,handleSelectChange, 
    backgroundOptions, skillOptions ,backgrounds,skills, handleNestedObjChange, handleLocationChange}) => {


const updateOpportunity = (e) => {
    e.persist();


    let data = {
    	"opportunity": opportunity,
     	"access_token" : "dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c"
     }
     console.log(data)
    fetch("https://api-staging.aiesec.org/v2/opportunities/6125", {
    method : 'PATCH',
    headers : {'Content-Type' : 'application/json'},
    body : JSON.stringify(data)
   
  })
  .then(res => res.json())
  .then(data => {
   console.log(data);

  })

}

	return (
		
	<div className="table">
		<div className="tableRow">
	        <div className="w-90 w-40-m w-50-l tableColumn">
	          <label  className="labelCSS">Title </label>
	          <input  className="inputStyle w-100" 
	          onChange={handleChange.bind(this)}
	          name = "title"
	          type="text" 
	          defaultValue={opportunity.title}/>
	          
	        </div>
	        <div className="w-90 w-40-m w-50-l tableColumn" >
	        
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

        <div className="tableRow">
	        <div className="w-90 w-40-m w-50-l tableColumn">
	          <label  className="labelCSS">Application close date</label>
	          <div className="inputStyle w-100">
	           <DatePicker
	           className="datepickerStyle"
	              selected={opportunity.applications_close_date}
	        	  onChange={handleDateChange('applications_close_date')}
	        	  defaultValue={null}
	     		/>
	        </div>
	        </div>
	        <div className="w-90 w-40-m w-50-l tableColumn" >
	        
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

        <div className="tableRow">
	        <div className="w-90 w-40-m w-50-l tableColumn">
	          <label  className="labelCSS">Duration<span className="normal black-60">(In weeks)</span></label>
	          <input  className="inputStyle w-100" 
	          onChange={handleChange.bind(this)}
	          name = "project_duration"
	          type="text" 
	          defaultValue={opportunity.project_duration}/>
	          
	        </div>
	        <div className="w-90 w-40-m w-50-l tableColumn" >
	        
	          <label  className="labelCSS">Positions</label>
	          <input  className="inputStyle w-100" 
	          onChange={handleChange.bind(this)}
	          name = "available_openings"
	          type="text" defaultValue={opportunity.available_openings}/>
	          
	        </div>
        </div>

        <div className="tableRow">
	        <div className="w-90 w-40-m w-50-l tableColumn">
	          <label  className="labelCSS">Salary <span className="normal black-60">(In dollars)</span>  </label>
	          <input  className="inputStyle w-100" 
	          onChange={handleNestedObjChange.bind(this)}
	          name = "specifics_info.salary"
	          type="text" 
	          value={opportunity.specifics_info ? opportunity.specifics_info.salary : ""}/>
	          
	        </div>
	        <div className="w-90 w-40-m w-50-l tableColumn" >
	        
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
         
 		<div className="tableRow pb3">
	        <div className="w-90 w-40-m w-50-l tableColumn">
	          <label  className="labelCSS">Background <span className="normal black-60">(In dollars)</span>  </label>
	         <Select
	         isMulti
          value= {backgrounds}
          options={backgroundOptions}
          placeholder = "Select required background"
          classNamePrefix ="w-100"
          name  = "backgrounds"
          isSearchable 
          onChange={handleSelectChange('backgrounds')}
          />
	        </div>
	        <div className="w-90 w-40-m w-50-l tableColumn" >
	        
	          <label  className="labelCSS">Skills</label>
	        <Select
	        className="datepickerStyle"
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
		<div className="tableRow">
		<div className="w-90 w-40-m w-50-l tableColumn" >
          <label className="labelCSS">Description <span className="normal black-60">(Max 180 characters)</span></label>
          <textarea value={opportunity.description} 
          onChange={handleChange.bind(this)}
          name = "description"
          className="textareaStyle w-100 tableColumn " aria-describedby="comment-desc"></textarea>
 		 </div>
 		 <div className="w-90 w-40-m w-50-l tableColumn">
              <label  className="labelCSS">Selection Process</label>
              <input  className="inputStyle w-100" 
              onChange={handleNestedObjChange.bind(this)}
              name = "role_info.selection_process"
              type="text" 
              value={opportunity.role_info ? opportunity.role_info.selection_process : ""}/>
              
            </div>
	</div>

	<div onClick={(event) => updateOpportunity(event)}  className="f6   link dim br1 ph5 pv2 mb2 dib white bg-dark-blue" >Edit</div>
	</div>
	
	);
}



export default opportunity;