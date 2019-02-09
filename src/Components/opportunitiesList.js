import React from 'react'
import OpportunityCard from './opportunityCard.js'

const OpportunitiesList = ({ opportunitiesList }) => {
	
	return (
		<div>
		<h2 className=''>List of Opportunities</h2>
		<div className='flex flex-wrap justify-center'>
		
		{
			opportunitiesList.map((opportunity, i) => {
			return (
			<OpportunityCard 
				key= {i}
				opportunityId = {opportunity.id}
				title={opportunity.title} 
				duration={opportunity.duration}
				organisation = {opportunity.branch.organisation.name}
				location = {opportunity.location}
				cover_photo_urls={opportunity.branch.organisation.cover_photo_urls}
			/>
			);
		})
		}
	</div>
	</div>
	);
}



export default OpportunitiesList;