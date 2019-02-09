import React from 'react';


const SearchBox = ({searchChange}) => {
	return (
		<div className='pa2'>
		<input className='pa2 w5 ba b--white bg-light-silver' 
		 type='search' 
		 placeholder='search movies' 
		 onChange={searchChange}
		 />
		 </div>
	);
}

export default SearchBox;