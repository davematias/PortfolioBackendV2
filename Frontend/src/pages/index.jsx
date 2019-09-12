import React from "react"
import axios from 'axios'
import { WOW } from 'wowjs/dist/wow';
import { Waypoint } from 'react-waypoint';

import Layout from "../components/layout"
import Contact from "../components/Contact"
import Portfolio from "../components/Portfolio"
import About from "../components/about"
import Resumee from "../components/resumee"
import SEO from "../components/seo"
import Actions from '../events/actions';

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: null,
    }
  }

  componentDidMount() {
    const wow = new WOW();
    wow.init();

    axios
      .get(`${process.env.API_URL}/profile`)
      .then(result => {
        this.setState({ profile: result.data });
        wow.sync();
      })
      .catch(error => { });
  }

  onLeave() {
    document.getElementById('header').setAttribute('class', 'header-fixed');
  }

  onEnter() {
    document.getElementById('header').setAttribute('class', '');
  }

  onReachTop() {
    Actions.navigatedTo("home");
  }

  render() {
    return (
      <Layout>
        <Waypoint
          onEnter={this.onReachTop}
        />
        <SEO title="Home" />
        <section id="hero">
          {
            this.state.profile ?
              <div className="hero-container">
                <Waypoint
                  onEnter={this.onEnter}
                  onLeave={this.onLeave}
                />
                <img className="profile-img" src={this.state.profile.photoUrl} alt="" />
                <h1>
                  {
                    this.state.profile.role
                  }
                </h1>
                <h2>
                  {
                    this.state.profile.skills.filter(skill => skill.expert).map(skill => {
                      return skill.name;
                    }).sort().join(' - ')
                  }
                </h2>
                <div id="social">
                  <a href={this.state.profile.twitterUrl} target="_blank"><i className="fa fa-twitter"></i></a>
                  <a href={this.state.profile.facebookUrl} target="_blank"><i className="fa fa-facebook"></i></a>
                  <a href={this.state.profile.linkedinUrl} target="_blank"><i className="fa fa-linkedin"></i></a>
                  <a href={this.state.profile.githubUrl} target="_blank"><i className="fa fa-github"></i></a>
                </div>
              </div>
              : <div className="hero-container">
                <i className="fa-5x fa fa-spinner fa-spin loader"></i>

              </div>
          }

        </section>
        {
          this.state.profile ?
            <>
              <Resumee profile={this.state.profile} />
              <Portfolio profile={this.state.profile} />
            </>
            : <></>
        }
        <Contact />
        <About />
      </Layout >
    )
  }
}
