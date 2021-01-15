import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <Link to="/aboutus">About Us</Link>
          <Link to="/contact">Contact Us</Link>
          Genuis Guavas - 2011-GHP-RM-WEB-FT
        </p>
      </div>
    </footer>
  )
}

export default Footer
