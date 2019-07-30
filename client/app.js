import React from 'react'

import {Navbar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="main-container">
      <div id="nav">
        <Navbar />
      </div>
      <div id="main-body">
        <Routes />
      </div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  )
}

export default App
