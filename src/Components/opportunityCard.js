import React from 'react';
import coverImg from './jobCoverPic.jpeg';
const opportunityCard = ({opportunityId,title, duration, organisation, location, cover_photo_urls}) => {
  console.log(opportunityId, title, duration, organisation, location)
	return (
 <div className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center">
 <div class="container">
  <img src={coverImg}
   className="db w-100 br2 br--top Cover" alt="Cover"/>
  <div className="centered">{title}</div>
  </div>
  <div className="pa2 ph3-ns pb3-ns">
    <div className="dt w-100 mt1">
      <div className="dtc">
        <h1 className="f5 f4-ns mv0">{organisation}</h1>
      </div>
     
    </div>
    
  </div>
  <div className="pa2 ">
      <a className="f6 db link dark-blue hover-blue" href="#">{location}</a>
      <p className="f6 gray mv1">{duration} weeks</p>
      <a className="link tc ph3 pv1 db bg-animate bg-dark-blue hover-bg-blue white f6 br1" href="#">Edit</a>
    </div>
    <a className="child absolute top-1 right-1 ba bw1 black-40 grow no-underline br-100 w1 h1 pa2 lh-solid b" href="#">×</a>
</div>


	);
}

export default opportunityCard;

