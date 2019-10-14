import React, { Component } from 'react'
import classes from './LetterList.css';

class LetterList extends Component {
  render() {
    let gyms = this.props.letterObj.gymNames.map((a, index) => {
      return (<li key={index}>{a}</li>)
    })
    return (
      <div className={classes.LetterList}>
        <ul>
          <li>{this.props.letterObj.letter}</li>
          <ul>
            <li>{gyms}</li>
          </ul>
        </ul>
      </div>
    )
  }
}

export default LetterList;