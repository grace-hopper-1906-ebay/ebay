import React from 'react'
import {Row, Col} from 'react-bootstrap'

const ErrorPage = () => {
  return (
    <div className="body">
      <Row className="error-info">
        <Col />
        <Col xs={10}>
          <h1 className="centering">
            the page requested has been erased from memory
          </h1>
        </Col>
        <Col />
      </Row>
      <Row className="error-pic">
        <Col />
        <Col>
          <img
            id="error"
            src="https://data.whicdn.com/images/94242698/original.gif"
          />
        </Col>
        <Col />
      </Row>
    </div>
  )
}

export default ErrorPage
