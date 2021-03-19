import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl,boxList})=>{
	return (

		<div className='center ma'>
			
			<div className = 'absolute mt2'>
				<img id ='inputImage' className='center' alt ='' src={imageUrl} width='500px'  height='auto'/>
			
			  {boxList.map((obj,i) => (
			   	<div className='bounding-Box' style={{top:boxList[i].topRow,left:boxList[i].leftCol,right:boxList[i].rightCol,bottom:boxList[i].bottomRow}}></div>
			  ))}	
			 
			</div>
			
		</div>

		);

}
export default FaceRecognition;
