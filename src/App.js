import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Opportunity from './Components/opportunity.js'
import OpportunityDisplay from './Components/opportunityDisplay.js'

const initialState = {
         opportunity : {},
       selectedBackgrounds : [],
      selectedSkills : [],     
}
class App extends React.Component {

	constructor(){
		super()
		this.state = initialState;
	}

componentWillMount = () => {

  document.title = "Job Search";

  let getOpportunityByID = `https://api-staging.aiesec.org/v2/opportunities/6125?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c`
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

 

  render() {
  	
    const {opportunity,backgroundOptions,skillOptions, backgrounds,skills} = this.state; 

     return (
      <Router  >
      <div>
       <Route path="/opportunity/:OpportunityID" component={OpportunityDisplay}></Route>
       
       <Route path='/editOpportunity/:OpportunityID' 
        render={({props}) => <Opportunity {...props}
         opportunity={opportunity} 
         backgroundOptions = {backgroundOptions}
         skillOptions = {skillOptions}
         backgrounds = {backgrounds} 
         skills = {skills} 
         handleDateChange = {this.handleDateChange}
         handleChange={this.handleChange}
         handleSelectChange = {this.handleSelectChange}
         handleNestedObjChange = {this.handleNestedObjChange}
         handleLocationChange = {this.handleLocationChange}
           />
         }
                 
        
        />
        </div>
      </Router>
    )

  }
}

export default App;
