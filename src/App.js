import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLikeForm from './components/ImageLikeForm/ImageLikeForm.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import Rank from './components/Rank/Rank.js';
//npm install react-particles-js
import Particles from 'react-particles-js';
//npm install clarifai
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
 apiKey: 'c65277861dac410b90ae5d7e4aa4dacc'
});
/*const particulesOptions = {
  particles: 
  {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 5
      }
    }
  }
}*/
const particulesOptions = {
  particles: 
  {
    number: {
      value:60,
      density:{
        enable:true,
        value_area:600
      }
    }
  }
}
class App extends Component {
  constructor(){
    super();
    this.state={
      input:'',
      imageUrl:'',
      boxList:[{}],
      route:'signin',
      isSignedIn:false

    }
  }
  calculateFacLocation = (data) =>{
    const clarifaiFace = data.outputs[0];
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const list = [];

    for (let i = 0; i < clarifaiFace.data.regions.length; i++) {
      //console.log('mon i '+i);
      list.push(
        { //object
          leftCol: clarifaiFace.data.regions[i].region_info.bounding_box.left_col * width,
          topRow: clarifaiFace.data.regions[i].region_info.bounding_box.top_row * height,
          rightCol: width - (clarifaiFace.data.regions[i].region_info.bounding_box.right_col * width),
          bottomRow: height - (clarifaiFace.data.regions[i].region_info.bounding_box.bottom_row * height)
        }
      );
     
    }
    //console.log('clarifaiFace '+clarifaiFace.data.regions.length);
    //console.log('ma liste'+list.length);
    //const src = image.src;
    //console.log(width,height,src);
    //console.log(clarifaiFace.bottom_row);
    return list;
  }

  displayFaceBox = (boxList) => {
    this.setState({boxList:boxList});
    //console.log(boxList);
   }

  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
    //npm install clarifai
    app.models.predict(
      /*provient de l'api d02b4508df58432fbb84e800597b8959'*/
      Clarifai.FACE_DETECT_MODEL,
      this.state.input // lien de la photo ce qu'on a ecrit
      ).then(
      /* 
      function(response){
        //console.log(response);
        //because we use the fonction in this class we have to put this.
        this.calculateFacLocation(response);
      },
        function(err){
      }
      */
      /*arrow function*/
      response => this.displayFaceBox(this.calculateFacLocation(response)))
      .catch( err => console.log(err));
  }
  onRouteChange = (route)=>{ 
    //because it's an object so you have to put {}
    if(route === 'signOut'){
      this.setState({isSignedIn:false})

    }else if( route === 'home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route});

  }

  render(){
    //pour enlever les this.state partout
    //const { isSignedIn, imageUrl,route, boxList } = this.state;
    return (
        <div className="App">
          <Particles  className='particles'
            params={particulesOptions} />
         <Navigation onRouteChange={this.onRouteChange}/>
            
              <Logo />
              <Rank />
              <ImageLikeForm onInputChange ={this.onInputChange} onButtonSubmit = {this.onButtonSubmit}/>
              <FaceRecognition boxList={this.state.boxList} imageUrl={this.state.imageUrl}/>            
        </div>
      );
  }
}

export default App;
