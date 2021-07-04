import React from 'react'
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonsDisplay'
import Loader from './Loader'

// extends keyword tells to inherit all methods from React.Component
class App extends React.Component {
  // // when an instace of App is created(called) the constructor function gets called first
  // constructor(props) {
  //   // NOTE super function calls the constructor function from React.component as it is overrided by App's constructor function
  //   // super is the method inherited by extending the React.Component
  //   super(props)

  //   // State in React is a JS obj
  //   // ! this is the only time when we do direct assignment to the state obj!
  //   this.state = { lat: null, errorMessage: '' }
  // }

  // This is an alternate way to initialize state
  // with this we don't need to define the constructor funtion
  // it is possible dur to Babel as it converts it into the above code
  state = { lat: null, errorMessage: '' }

  // componentDidMount function runs automatically when the comoponent is rendered
  // this function is good place to do data one time initialization
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // ! to update a state use only setState method!!
        // updating a state makes the component to render
        this.setState({ lat: position.coords.latitude })
      },
      (err) => {
        // it is not necessary to update all states
        // setState never deletes another state when updating anyone
        this.setState({ errorMessage: err.message })
      }
    )
  }

  renderContent() {
    // we can use conditional statements to render stuff
    // but avoid using multiple returns in main render method
    if (this.state.errorMessage && !this.state.lat) {
      return <div>Error: {this.state.errorMessage}</div>
    }
    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }

    return <Loader message="Please accept location request" />
  }

  // render method is MUST!!
  // render must return JSX
  render() {
    return <div>{this.renderContent()}</div>
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
