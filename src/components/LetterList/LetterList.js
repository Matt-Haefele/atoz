import React, { Component } from 'react'

class LetterList extends Component {
  render() {
    let gyms = this.props.letterObj.gymNames.map((a, index) => {
      return (<li>{a}</li>)
    })
    return <ul><li>{this.props.letterObj.group}</li>
      <ul><li>{gyms}</li></ul></ul>
  }
}

export default LetterList;