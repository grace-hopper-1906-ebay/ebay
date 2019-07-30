import React from 'react'

import {Navbar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes />
      </div>
      <Footer />
    </div>
  )
}

export default App
