import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Opportunity from '../Components/opportunity.js'
import OpportunityDisplay from '../Components/opportunityDisplay.js'

class App extends React.Component {

	constructor(){
		super()
	}

componentDidMount = () => {
  document.title = "Job Search";
}



  render() {

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
