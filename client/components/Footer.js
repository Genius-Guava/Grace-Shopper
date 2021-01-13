import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <Link to="/aboutus">About Us</Link>
        <Link to="/contact">Contact Us</Link>
        <p>Genuis Guavas - 2011-GHP-RM-WEB-FT</p>
      </footer>
    </div>
  )
}

export default Footer
