import React from 'react';
//npm install --save react-tilt pour avoir le package
import Tilt from 'react-tilt';
import brain from './brain.png';
import './Logo.css';
//shadow = ombre br2 = la bordure
const Logo =()=>{
return (
	<div className='ma4 mt0'>
		<Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
		 	<div className="tilt Tilt-inner pa3"> <img style={{paddingTop:'5px'},{paddingBottom:'5px'}} alt="logo" src={brain}/> </div>
		</Tilt>
	</div>
	);
}
export default Logo;