import React from 'react'
// import {Link} from 'react-router-dom'
import {Carousel, Row, Col} from 'react-bootstrap'

const Main = () => {
  return (
    <Row>
      <Col sm={{span: 12}}>
        <Carousel centered className="body">
          <Carousel.Item>
            <img src="https://i.imgur.com/6lu9uZp.png" />
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://i.imgur.com/v1lj54Y.png" />
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://i.imgur.com/bxnjxfd.png" />
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://i.imgur.com/7aKc1Zw.png" />
          </Carousel.Item>
        </Carousel>
      </Col>
    </Row>
  )
}

export default Main
