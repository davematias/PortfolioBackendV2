import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { FaAngleUp } from 'react-icons/fa';
import ScrollUpButton from 'react-scroll-up-button';

import Header from "./header"
import "../assets/bootstrap/css/bootstrap.min.css"
import "../assets/font-awesome/css/font-awesome.min.css"
import "../assets/css/style.css"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div>
        <main>{children}</main>
        <footer id="footer">
          <div className="footer-top">
            <div className="container"></div>
          </div>
          <div className="container">
            <div className="copyright">
              &copy; Copyright <strong>David Matias</strong>. All Rights Reserved
              </div>
          </div>
        </footer>
        <ScrollUpButton ContainerClassName="topcontrol" TransitionClassName="return-to-top-transition">
          <FaAngleUp />
        </ScrollUpButton>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
