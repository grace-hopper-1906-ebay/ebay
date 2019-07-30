import React from 'react'
import {Link} from 'react-router-dom'

const Main = () => {
  return (
    <div className="home-container">
      <div>
        <img src="https://i.ebayimg.com/images/g/nm4AAOSwgGdZmoDQ/s-l300.jpg" />
      </div>
      <Link to="/products">Check out our Products!</Link>
    </div>
  )
}

export default Main
