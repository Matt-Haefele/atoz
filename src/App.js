import React, { Component } from 'react';
import './App.css';
import LetterList from './components/LetterList/LetterList';
import GymService from './api/GymService';

class App extends Component {
  state = {
    Gyms: null,
    isLoading: false
  }
  async componentDidMount() {
    try {
      // 1. Set isLoading to true (This will show a spinner eventually)
      this.setState({
        isLoading: true
      });

      // 2. Perform network request
      const gyms = await GymService.getGyms();     
      // 3. Update the state once the promise has been resolved
      this.setState({
        isLoading: false,
        Gyms: gyms
      });
    } catch (err) {
      // 4. Log any errors for now.... (Error state will be handled here once the UI is fleshed out)

      // 5. Set isLoading back to false
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    let gymObjects = null;
   if (this.state.Gyms && this.state.Gyms.length > 0) {
     gymObjects = this.state.Gyms.map((gym, index) => {
       return (<LetterList key={index} letterObj={gym} />);
     })
   }

    return (
      <>
        {this.state.isLoading ? (
          'loading....'
        ) : (
          <div>
            {gymObjects}
          </div>
          )}
      </>
    );
  }
}

export default App;
