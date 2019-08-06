import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap'

class orderConfirmation extends Component {
  componentDidMount() {}
  render() {
    return (
      <div className="body">
        <Row>
          <Col sm={4} className="margins">
            <h3 className="center color">Order Placed</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="color center">
              Order Number: {this.props.orderNumber}
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {orderNumber: state.cart.orderNumber}
}

export default connect(mapStateToProps)(orderConfirmation)
