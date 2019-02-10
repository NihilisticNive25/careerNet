import React from 'react'
import DatePicker from "react-datepicker";
 import Select from 'react-select';
import "react-datepicker/dist/react-datepicker.css";
import Autocomplete from 'react-google-autocomplete';
import { Redirect } from 'react-router-dom';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
 class opportunity extends React.Component {
 constructor(props){
  super(props);
  this.state = {
    redirect: false,
    errors: [],  
    opportunity:{},
    backgrounds:[],
    backgroundOptions:[],
    skills:[],
    skillOptions:[]    
  }
}

componentWillMount = () => {

  let getOpportunityByID = `https://api-staging.aiesec.org/v2/opportunities/${this.props.match.params.OpportunityID}?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c`
      fetch(getOpportunityByID)
      .then(res => res.json())
      .then((result) => {         
      this.setState({opportunity : result})
       
      let bacgroundObj = [];
            result.backgrounds.forEach(x =>bacgroundObj.push({value : x.id, label : x.name}) )            
            this.setState({backgrounds : bacgroundObj});

      let skillsObj = [];
      result.skills.forEach(x =>skillsObj.push({value : x.id, label : x.name}) )            
      this.setState({skills : skillsObj});


      })
      .catch(err => console.log(err));

  let getBackgrounds = `https://api-staging.aiesec.org/v2/lists/backgrounds?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c`
      fetch(getBackgrounds)
      .then(res => res.json())
      .then((result) => {     
        let bacgroundObj = []; 
        result.forEach(x =>bacgroundObj.push({value : x.id, label : x.name}) )   
        this.setState({backgroundOptions : bacgroundObj})
        
      })
      .catch(err => console.log(err));


  let getSkills = `https://api-staging.aiesec.org/v2/lists/skills?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c`
      fetch(getSkills)
      .then(res => res.json())
      .then((result) => {   
        let skillObj = [];
        result.forEach(x =>skillObj.push({value : x.id, label : x.name}) )     
        this.setState({skillOptions : skillObj})
      })
      .catch(err => console.log(err));
} 


handleSelectChange = name => value => {
 
  let opportunity = Object.assign({}, this.state.opportunity);
     let resetObj = [];
        value.forEach(x =>resetObj.push({id : x.value, name : x.label, "option": "preferred", "level": 0}) ) 

  opportunity[name] = {};
  opportunity[name] = resetObj;
  this.setState({opportunity});

  this.state[name]= [];
  this.state[name] = value;                       
  this.setState({name : value});
  
};

handleLocationChange = (e) => {

let opportunity = Object.assign({}, this.state.opportunity); 
     this.setState({opportunity : {...opportunity,"role_info":{ 
       ...opportunity["role_info"],
        "city":e.name
    }}});      

  };

  handleDateChange = name => value  => {

    let opportunity = Object.assign({}, this.state.opportunity);  
    let dateformat = new Date(value);
    opportunity[name] = dateformat.toISOString(); 
    this.setState({opportunity});      

  };
 
  handleChange = (event) => {
    
    const target = event.target;
    const value =  target.value;
    const name = target.name;

    let opportunity = Object.assign({}, this.state.opportunity);         
    opportunity[name] = value;   
                         
    this.setState({opportunity});

  }


  handleNestedObjChange = (event) => {

    const target = event.target;
    const value =  target.value;
    const name = target.name;
    const keys = name.split('.');

    let opportunity = Object.assign({}, this.state.opportunity);         
    opportunity[keys[0]][keys[1]] = value;                      
    this.setState({opportunity});
 
  }

    render(){

   const {opportunity,backgroundOptions, skillOptions ,backgrounds,skills } = this.state;

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
	          onChange={this.handleChange}
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
	        	  onChange={this.handleDateChange('earliest_start_date')}
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
	        	  onChange={this.handleDateChange('applications_close_date')}
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
	        	  onChange={this.handleDateChange('latest_end_date')}
	        	  defaultValue={null}
	     		/>
	        </div>
	        </div>
        </div>

        <div className="tableRow  ph3 ">
	        <div className="w-90 w-40-m w-50-l tableColumnForm">
	          <label  className="labelCSS">Duration<span className="normal black-60">(In weeks)</span></label>
	          <input  className="inputStyle w-100" 
	          onChange={this.handleChange}
	          name = "project_duration"
	          type="text" 
	          defaultValue={opportunity.project_duration}/>
	          
	        </div>
	        <div className="w-90 w-40-m w-50-l tableColumnForm" >
	        
	          <label  className="labelCSS">Positions</label>
	          <input  className="inputStyle w-100" 
	          onChange={this.handleChange}
	          name = "available_openings"
	          type="text" defaultValue={opportunity.available_openings}/>
	          
	        </div>
        </div>

        <div className="tableRow  ph3 ">
	        <div className="w-90 w-40-m w-50-l tableColumnForm">
	          <label  className="labelCSS">Salary <span className="normal black-60">(In dollars)</span>  </label>
	          <input  className="inputStyle w-100" 
	          onChange={this.handleNestedObjChange}
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
                 onPlaceSelected={this.handleLocationChange}
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
          onChange={this.handleSelectChange('backgrounds')}
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
          onChange={this.handleSelectChange('skills')}
          />
	          
	        </div>
        </div>
		<div className="tableRow ph3">
		<div className="w-90 w-40-m w-50-l tableColumnForm" >
          <label className="labelCSS">Description <span className="normal black-60">(Max 180 characters)</span></label>
          <textarea value={opportunity.description} 
          onChange={this.handleChange}
          name = "description"
          className="textareaStyle w-100 tableColumnForm " aria-describedby="comment-desc"></textarea>
 		 </div>
 		 <div className="w-90 w-40-m w-50-l tableColumnForm">
              <label  className="labelCSS">Selection Process</label>
              <input  className="inputStyle w-100" 
              onChange={this.handleNestedObjChange}
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



export default withRouter(opportunity);