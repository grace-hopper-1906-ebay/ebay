import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class orderConfirmation extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <h3>Order Placed!!</h3>
        <p>Order Number: {}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(orderConfirmation)
