import React from 'react'
import { scroller } from "react-scroll";
import axios from 'axios'

import NavigationStore from "../events/navigationStore";

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: null,
      activeItem: 'hero',
      menuOpen: false
    }
  }

  componentDidMount() {
    axios
      .get(`${process.env.API_URL}/profile`)
      .then(result => {
        this.setState({ profile: result.data });
      })
      .catch(error => { });

    NavigationStore.addChangeListener(() => this._onChange());

    const body = document.getElementsByTagName("body")[0];
    body.onclick = () => {
      if(this.state.menuOpen) {
        this.toggleMobileMenu();
      }
    };
  }

  componentWillUnmount() {
    NavigationStore.removeChangeListener(() => this._onChange());
  }

  _onChange() {
    let visibleElement = '';

    const anchors = ["hero", "resumee", "portfolio", "contact", "about"];

    for (let index = 0; index < anchors.length; index++) {
      const item = anchors[index];

      if (this.isInViewport(document.getElementById(item))) {
        visibleElement = item;
        break;
      }
    }

    this.setState({ activeItem: visibleElement });
  }

  isInViewport(elem) {
    const bounding = elem.getBoundingClientRect();
    return bounding.top >= 0;
  }

  scrollTo(evt, elementId) {
    evt.preventDefault();
    evt.stopPropagation();

    scroller.scrollTo(elementId, {
      duration: 500,
      smooth: true
    });

    if(this.state.menuOpen) {
      this.toggleMobileMenu();
    }
  }

  getNav(navClass) {
    return <ul className={navClass}>
      <li className={this.state.activeItem === "hero" ? "menu-active" : null}>
        <a onClick={(e) => this.scrollTo(e, "hero")} href="#hero">Home</a>
      </li>
      {
        this.state.profile ?
          <>
            <li onClick={(e) => this.scrollTo(e, "resumee")} className={this.state.activeItem === "resumee" ? "menu-active" : null}>
              <a href="#resumee">Resumee</a>
            </li>
            <li onClick={(e) => this.scrollTo(e, "portfolio")} className={this.state.activeItem === "portfolio" ? "menu-active" : null}>
              <a href="#portfolio">Portfolio</a>
            </li>
            <li onClick={(e) => this.scrollTo(e, "contact")} className={this.state.activeItem === "contact" ? "menu-active" : null}>
              <a href="#contact">Contact</a>
            </li>
          </>
          : <></>
      }
      <li onClick={(e) => this.scrollTo(e, "about")} className={this.state.activeItem === "about" ? "menu-active" : null}>
        <a href="#about">About</a>
      </li>
    </ul>;
  }

  toggleMobileMenu() {
    const open = !this.state.menuOpen;   
    this.setState({ menuOpen: open});

    document.getElementsByTagName("body")[0].classList.toggle("mobile-nav-active");
  }

  render() {
    return (
      <div id="header">
        <div className="container">

          <div id="logo" className="pull-left">
            <a onClick={(e) => this.scrollTo(e, "hero")} href="#hero">
              <h1>{this.state.profile ? this.state.profile.name : ""}</h1>
            </a>
          </div>

          <button
            onClick={() => this.toggleMobileMenu()}
            type="button"
            id="mobile-nav-toggle">
            <i className={this.state.menuOpen ? "fa fa-times" : "fa fa-bars"}></i>
          </button>
          <div
            id="mobile-body-overly"
          >
          </div>

          <nav id="mobile-nav">
            {
              this.getNav()
            }
          </nav>

          <nav id="nav-menu-container">
            {
              this.getNav("nav-menu")
            }
          </nav>
        </div>
      </div>
    )
  }
}
