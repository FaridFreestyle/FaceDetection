
import React from 'react';
import './ImageLikeForm.css';
const ImageLikeForm =({onInputChange,onButtonSubmit})=>{
return (
	<div>
		<p className='f4'>
			{'This Magic Brain will detect faces in your pictures. Get it try.'}
		</p>
		<p className='f4'>
			{'Put a image link ex: https://www.spsp.org/sites/default/files/fisher-single-people-social-groups.jpg'}
		</p>
		<div className='center'>
			<div className=' form center pa4 br3 shadow-5'>
				<input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
				<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
			</div>
		</div>
	</div>
	);
}
export default ImageLikeForm;