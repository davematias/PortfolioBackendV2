import React from 'react'
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import axios from 'axios'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: null
    }
  }

  componentDidMount() {
    axios
      .get(`${process.env.API_URL}/profile`)
      .then(result => {        
        this.setState({profile: result.data});
      })
      .catch(error => { });
  }

  render() {
    return (
      <div id="header">
        <div className="container">

          <div id="logo" className="pull-left">
            <a href="#hero">
              <h1>{this.state.profile ? this.state.profile.name : ""}</h1>
            </a>
          </div>

          <nav id="nav-menu-container">
            <ul className="nav-menu">
              <li>
                <ScrollLink
                  activeClass="menu-active"
                  to="hero"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                >
                  Home
              </ScrollLink>
              </li>
              {
                this.state.profile ?
                  <>
                    <li>
                      <ScrollLink
                        activeClass="menu-active"
                        to="resumee"
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={500}
                      >
                        Resumee
                    </ScrollLink>
                    </li>
                    <li><a href="#portfolio">Portfolio</a></li>
                    <li><a href="#contact">Contact</a></li>
                  </>
                  : <></>
              }
              <li>
                <ScrollLink
                  activeClass="menu-active"
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={0}
                  duration={500}
                >
                  About
              </ScrollLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
