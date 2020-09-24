import React from 'react'

import {
  Link
} from 'react-router-dom';

function Home() {
  return (
    <div style={{ display: "flex" }} >
      <Link className="mainLink" to="/profile">Profile</Link>
      <Link className="mainLink" to="/carousel">Carousel</Link>
    </div>
  )
}

export default Home
