import React from 'react'
import {connect} from 'react-redux'
import {Button, Section} from 'react-bulma-components'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

class Home extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {isLoggedIn, email} = this.props
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 3000,
      autoplaySpeed: 2000,
      cssEase: 'linear',
      pauseOnHover: true,
      adaptiveHeight: true
    }

    return (
      <div>
        <Slider {...settings} className="homeSlider">
          <div>
            <img src="../carousel/courousel1.jpg" />
          </div>
          <div>
            <img src="../carousel/courousel2.jpg" />
          </div>
          <div>
            <img src="../carousel/courousel3.jpg" />
          </div>
          <div>
            <img src="../carousel/courousel4.jpg" />
          </div>
          <div>
            <img src="../carousel/courousel5.jpg" />
          </div>
          <div>
            <img src="../carousel/courousel6.jpg" />
          </div>
          <div>
            <img src="../carousel/courousel7.jpg" />
          </div>
          <div>
            <img src="../carousel/courousel8.jpg" />
          </div>
          <div>
            <img src="../carousel/courousel9.jpg" />
          </div>
        </Slider>
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    email: state.user.email
  }
}

export default connect(mapState)(Home)

/*
 {
          <div>
          <Section align="center">
              <h1 align="center" className="appName">
                leafly
              </h1>
               <button class="button is-success is-light">Success</button>
              <Button className="home-btn button is-success is-light" size="small">
                <Link to="/plants">Shop Now</Link>
              </Button>
            </Section>
          </div>
          }

*/
