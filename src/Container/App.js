import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Opportunity from '../Components/opportunity.js'
import OpportunityDisplay from '../Components/opportunityDisplay.js'

const initialState = {
         opportunity : {},
       selectedBackgrounds : [],
      selectedSkills : [], 
      OpportunityID : "" ,   
}
class App extends React.Component {

	constructor(){
		super()
		this.state = initialState;
	}

componentDidMount = () => {
  document.title = "Job Search";
}



  render() {
  	
    const {opportunity,backgroundOptions,skillOptions, backgrounds,skills} = this.state; 

     return (
      <Router  >
      <div>
       <Route path="/opportunity/:OpportunityID" component={OpportunityDisplay}></Route>
        <Route path='/editOpportunity/:OpportunityID' 
        component ={() => <Opportunity/> }        
        />
        </div>
      </Router>
    )

  }
}

export default App;
