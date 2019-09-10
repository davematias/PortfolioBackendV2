import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import About from "../components/about"
import SEO from "../components/seo"

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: null,
    }
  }

  componentDidMount() {

  }

  render() {
    return (
      <Layout>
        <SEO title="Home" />
        <section id="hero">
          {
            this.state.profile ?
              <div className="hero-container">
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
                  <a href={this.state.profile.googlePlusUrl} target="_blank"><i className="fa fa-google-plus"></i></a>
                  <a href={this.state.profile.linkedinUrl} target="_blank"><i className="fa fa-linkedin"></i></a>
                  <a href={this.state.profile.githubUrl} target="_blank"><i className="fa fa-github"></i></a>
                </div>
              </div>
              : <div className="hero-container"><i class="fa-5x fa fa-spinner fa-spin loader"></i></div>
          }
        </section>
        {
          this.state.profile ?
            <>
              {/*  <Resumee profile={this.state.profile} />
            <Portfolio />
            <Contact />*/}
            </>
            : <></>
        }
        <About />
      </Layout >
    )
  }
}
