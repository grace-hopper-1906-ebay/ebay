import React from 'react'
import {Row, Col} from 'react-bootstrap'

const ErrorPageAPI = () => {
  return (
    <div className="body" id="api-error-background">
      <Row>
        <Col />
        <Col sm={10}>
          <p className="error-words">
            `Our younger students; please note, the Forbidden Forest is out of
            bounds to all students…and a few of our older students ought to
            remember that too..’
          </p>
          <p className="error-words">-Dumbledore, J.K Rowling</p>
        </Col>
        <Col />
      </Row>
    </div>
  )
}

export default ErrorPageAPI
