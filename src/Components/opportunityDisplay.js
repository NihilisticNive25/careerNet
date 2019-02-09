import React from 'react'
 import Background from './jobCoverPic.jpeg';
 import Food from './food.png';
 import Hotel from './hotel.png';
 import Laptop from './laptop.png';
 import location from './map-marker.png';
 import unavailable from './no.png';
 import available from './yes.png';
 
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

let backgroundListItems;
      let skillListItems;
      let citizenshipListItems;
      let languagesListItems;
      let studylevelsListItems;
class opportunityDisplay extends React.Component  {

  constructor(props){
  super(props);
  this.state = {
    opportunity : "",
    workHours : "",
    visa :"",
    logistics :"",
    OpportunityID : ""
  }


}

componentWillMount = () => {

const { OpportunityID } = this.props.match.params
this.setState({OpportunityID});

  let getOpportunityByID = `http://gisapi-web-staging-1636833739.eu-west-1.elb.amazonaws.com/v2/opportunities/${OpportunityID}?access_token=dd0df21c8af5d929dff19f74506c4a8153d7acd34306b9761fd4a57cfa1d483c`
      fetch(getOpportunityByID)
      .then(res => res.json())
      .then((result) => {          
      this.setState({opportunity : result}, this.updateLists);
      })
      .catch(err => console.log(err));
  }

 updateLists = () => {   

      const detail = this.state.opportunity;
      
      if(detail)
      {        
        if(detail.backgrounds)
          backgroundListItems = this.createLI(detail.backgrounds);
        
        if(detail.skills)
          skillListItems = this.createLI(detail.skills);
        
        if(detail.nationalities)
          citizenshipListItems = this.createLI(detail.nationalities);  

        if(detail.languages)
          languagesListItems = this.createLI(detail.languages);  

        if(detail.study_levels)
        studylevelsListItems = this.createLI(detail.study_levels);  
        
        if(detail.specifics_info)
          this.setState({workHours : detail.specifics_info.expected_work_schedule})

        this.setState({logistics : detail.logistics_info})
        this.setState({visa : detail.legal_info})
      }

       
      
}

   createLI = (feature) => ( feature.map( (a) => <li key={a.id}>{a.name}</li> )); 

 render (){
    const { opportunity,workHours,visa,logistics } = this.state;
 
	return (
		
	<div>

  <div className="cover bg-left bg-center-l" style={{backgroundImage: `url(${Background})`}}>
    <div className="bg-black-80 ">
      <nav className="dt w-100 mw8 fl center "> 
        <div className="dtc v-top tr pa3 w-100   fixed bg-blue ">
        
        <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/" >Careers</a> 
          <a className="f6 fw4 hover-white no-underline white-70 dn dib-l pv2 ph3" href="/" >About</a> 
          <a className="f6 fw4 hover-white no-underline white-70 dn dib-ns pv2 ph3" href="/" >Help</a>           
          <a className="f6 fw4 hover-white no-underline white-70 dib ml2 pv2 ph3 ba" href="/" >Sign Up</a> 
        </div>
      </nav> 
      <div className="tc-l pv6 ph3">
        <h1 className="f2 f1-l mt0 fw2 white-90 mb0 lh-title">{opportunity.title}</h1>
        <h2 className="fw1 f3 white-80 mt3 mb4"> <img alt='location' className="v-mid availability" src={location}/> {opportunity.location}</h2>
        <a className="f6 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3" href={`/editOpportunity/${this.state.OpportunityID}`}>Edit</a>

      </div>
     
</div>
</div>

<div className="tableRow">

<div className="w-100 w-50-l w-50-ns tableColumn">
  <div className="pa3 pa4-ns">
  <div className=" mid-gray">
  <h2 className="">Overview</h2>
  <h4>Role Description</h4>
  <p className="measure lh-copy">
    {opportunity.description}
  </p>
  </div>

  <div className="bt mid-gray">
  <h2 className="">Prerequisites</h2>

<div className="table">
 <div className="tableRow">
 <div className="w-100 w-40-m w-30-l tableColumn">
  <h4>Background</h4>
  </div>
  <div className="w-100 w-60-m w-70-l tableColumn bb">
  <div className="measure lh-copy">  <ul>{backgroundListItems}</ul>  </div>
  </div>
</div>


<div className="tableRow">
<div className="w-100 w-40-m w-30-l tableColumn">
  <h4>Skills</h4>
  </div>
  <div className="w-100 w-60-m w-70-l tableColumn bb">
  <div className="measure lh-copy"> <ul>{skillListItems}</ul>   </div>
  </div>
</div>

<div className="tableRow">
<div className="w-100 w-40-m w-30-l tableColumn">
  <h4>Citizenship</h4>
  </div>
  <div className="w-100 w-60-m w-70-l tableColumn bb">
  <div className="measure lh-copy">  <ul>{citizenshipListItems}</ul>  </div>
  </div>
</div>

<div className="tableRow">
<div className="w-100 w-40-m w-30-l tableColumn">
    <h4>Languages</h4>
    </div>
    <div className="w-100 w-60-m w-70-l tableColumn ">
  <div className="measure lh-copy">  <ul>{languagesListItems}</ul>  </div>
  </div>
  </div>


</div>
</div>
<div className="bt mid-gray">
   <h2 className="">Visa and Logistics</h2>


<div className="tableRow">
<div className="w-100 w-40-m w-30-l tableColumn">
  <h4>Working Hours</h4>
  </div>
  <div className="w-100 w-60-m w-70-l tableColumn bb">
<p className="measure lh-copy">
    {workHours.from}:00 to {workHours.to}:00
  </p>
  {!workHours.saturday_work ? <p className="measure i lh-copy">Not working on Saturdays </p> : true}
</div>
</div>

<div className="tableRow">
<div className="w-100 w-40-m w-30-l tableColumn">
<h4 className="">Logistics</h4>
</div>
<div className="w-100 w-60-m w-70-l tableColumn bb">
<div>
 <p className="measure lh-copy">

 <img alt='availability' className="v-mid availability"  src={logistics.accommodation_covered == "false" ? unavailable : available}/> Computer Provided <img alt='Laptop' className="v-mid" src={Laptop}/> </p>
</div>
<div>
  <p className="measure lh-copy"> 
  <img alt='availability' className="v-mid availability" src={logistics.accommodation_provided != "Provided" ? unavailable : available}/> Accommodation Provided <img alt='Hotel' className="v-mid" src={Hotel}/> </p>
</div>
<div>
  <p className="measure lh-copy"> 
  <img alt='availability' className="v-mid availability" src={logistics.accommodation_covered == "false" ? unavailable : available}/> Accommodation Covered <img alt='Hotel' className="v-mid" src={Hotel}/></p>
</div>
<div>
  <p className="measure lh-copy">
  <img alt='availability' className="v-mid availability" src={logistics.food_covered == "Not covered" ? unavailable : available}/> Food Provided <img alt='Food' className="v-mid" src={Food}/> </p>
</div>
</div>
</div>

<div className="tableRow bb">
<div className="w-100 w-40-m w-30-l tableColumn">
  <h4>Visa</h4>
</div>
<div className="w-100 w-60-m w-70-l tableColumn ">
    <h5 className="gray">VISA DURATION</h5>
    <p className="measure lh-copy">  
    {visa.visa_duration}
    </p>

    <h5 className="gray">VISA TYPE</h5>
    <p className="measure lh-copy">
    {visa.visa_type}
    </p>

    <h5 className="gray">VISA LINK</h5>
    <p className="measure lh-copy">
    {visa.visa_link}
    </p>
</div>
</div>
</div>

          </div>
        

</div>


<div className="w-100 w-50-m w-50-l pa3 tableColumn ">


<div className="table mid-gray pa3 pa4-ns center ba">
    <div className="tableRow ">
          <div className="w-100 w-100-m w-50-l tableColumn">
            <label  className="labelCSS">LOCATION </label>
            <div className="inputStyle w-100">
           <p className="measure lh-copy ">
            {opportunity.location}
            </p>
          </div>                
          </div>

          <div className="w-100 w-100-m w-50-l tableColumn" >
          
            <label  className="labelCSS">EARLIEST START DATE</label>
            <div className="inputStyle w-100">
            <p className="measure lh-copy ">
            {opportunity.earliest_start_date ? opportunity.earliest_start_date.substr(0,10) : true}
            </p>
                
            
          </div>
          </div>
          
        </div>

        <div className="tableRow">
        

          <div className="w-100  w-50-l tableColumn">
            <label  className="labelCSS">APPLICATION CLOSE DATE</label>
            <div className="inputStyle w-100">
           <p className="measure lh-copy ">
            {opportunity.applications_close_date ? opportunity.applications_close_date.substr(0,10) : true}
            </p>
                
            
          </div>
          </div>
          <div className="w-100  w-50-l tableColumn" >
          
            <label  className="labelCSS">LATEST END DATE</label>
            <div className="inputStyle w-100">
             <p className="measure lh-copy">
            {opportunity.latest_end_date ? opportunity.latest_end_date.substr(0,10) : true}
            </p>
                
           
          </div>
          </div>
        </div>
         <div className="tableRow">
        

          <div className="w-100 w-50-l tableColumn">
            <label  className="labelCSS">SALARY</label>
            <div className="inputStyle w-100">
        <p className="measure lh-copy ">
            {opportunity.specifics_info ? opportunity.specifics_info.salary : true}
            </p>
                
            
          </div>
          </div>
          <div className="w-100 w-50-l tableColumn" >
          
            <label  className="labelCSS">POSITION</label>
            <div className="inputStyle w-100">
             <p className="measure lh-copy">
            {opportunity.latest_end_date}
            </p>
                
           
          </div>
          </div>
        </div>
        <div className="center ph6">
        <a className="f6   link dim br1 ph5 pv2 mb2 dib white bg-dark-blue" href={`/editOpportunity/${this.state.OpportunityID}`}>Edit</a>
        </div>
</div>

</div>
</div>
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


export default opportunityDisplay;