import React from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation'
import ImageLinkForm from './components/image-link-form/ImageLinkForm'
import Entries from './components/entries/Entries'
import FaceDetection from './components/face-detection/FaceDetection'
import SignIn from './components/login/SignIn';
import Register from './components/login/Register';
import Scroll from './components/scroll/Scroll';

const initialState = {
  input: '',
  imageUrl: '', 
  boxArr: [],
  route: 'signin',
  isSignedIn: false,
  // User profile
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends React.Component {
  constructor(){
    super()
    this.state = initialState
  }

  loadUser = (userData) => {
    const { id, name, email, entries, joined } = userData;
    this.setState({user: {
      id: id,
      name: name,
      email: email,
      entries: entries,
      joined: joined
    }})
  }

  // Indicate page changes
  onRouteChange = (currentPage) => {
    if (currentPage === 'home') {
      this.setState({isSignedIn: true});
    }
    else if (currentPage === 'signin') {
      this.setState(initialState);
    }

    this.setState({route: currentPage});
  }
  
  // Get coordinates for face box
  calculateFaceLocation = (info) => {
    console.log("Info", info)
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    let boxArr = info.outputs[0].data.regions.map((item, i) => {
      const location = item.region_info.bounding_box
      return {
        leftCol: location.left_col * width,
        topRow: location.top_row * height,
        rightCol: width - (location.right_col * width),
        bottomRow: height - (location.bottom_row * height)
      }
    })
    return boxArr;
  }

  // Draw face box on retrieved coordinates
  displayFaceBox = (boxArr) => {
    console.log(boxArr);
    this.setState({boxArr: boxArr});
  }

  // Input for image link
  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  // Submit button for face detection
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    fetch('https://fierce-temple-27744.herokuapp.com/imageurl', {
      method: 'post', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        console.log('response', response)
        fetch('https://fierce-temple-27744.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        //.then(response => response.json())
        .then(entryCount => {
          this.setState(Object.assign(this.state.user, { entries: entryCount }));
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(error => console.log(error));
  }
  
  render() {
    return (
      <div className="App">
        <link href="https://fonts.googleapis.com/css?family=Ultra|Work+Sans:400,500" rel="stylesheet"></link>
        {
          this.state.route === 'home'
          ? (
            <div>
            <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
            <Scroll>
            <div className='vh-100 dt w-100 tc' style={{paddingTop:'15%', paddingBottom:'15%'}}>
                <div className='tc dtc v-mid'>
                  <Entries name={this.state.user.name} entries={this.state.user.entries} />
                  <ImageLinkForm onInputChangeProp={this.onInputChange} onButtonSubmitProp={this.onButtonSubmit} />
                  <FaceDetection imageUrl={this.state.imageUrl} boxArr={this.state.boxArr} />
                </div>
            </div>
            </Scroll>
            </div>
          )
          : (
            this.state.route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
      </div>
    );
  }
}
 
export default App;