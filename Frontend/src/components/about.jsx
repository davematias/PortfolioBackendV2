import React, { Component } from 'react';
import { Waypoint } from 'react-waypoint';

import Actions from '../events/actions';

class About extends Component {
  onEnter() {
    Actions.navigatedTo("about");
  }

  onLeave() {
    Actions.navigatedTo("contact");
  }

  render() {
    return (
      <div>
        <section id="about">
          <div className="container">
            <div className="row about-container">
              <div className="col-lg-12 content order-lg-1 order-1">
                <h2 className="title">About</h2>                
                <p>
                  This website was made with <a href="https://flask.palletsprojects.com/en/1.1.x/" rel="noopener noreferrer" target="_blank">Flask</a> + <a href="https://aws.amazon.com/dynamodb" rel="noopener noreferrer" target="_blank">DynamoDB</a> for the back-end and <a href="https://www.gatsbyjs.org/" rel="noopener noreferrer" target="_blank">Gatsby</a> + <a href="https://getbootstrap.com/" rel="noopener noreferrer" target="_blank">Bootstrap</a> for the front-end.
                  The server is hosted on <a href="https://aws.amazon.com" rel="noopener noreferrer" target="_blank">AWS</a>.
                </p>
                <p>
                  The bootstrap template was based on <a href="https://bootstrapmade.com/regna-bootstrap-onepage-template/" rel="noopener noreferrer" target="_blank">Regna</a> and the icons were made by <a href="https://fontawesome.com/" rel="noopener noreferrer" target="_blank">FontAwesome</a> and <a href="https://www.flaticon.com/authors/freepik" rel="noopener noreferrer" target="_blank">Freepik </a>
                  from <a href="https://www.flaticon.com/" rel="noopener noreferrer" target="_blank">www.flaticon.com</a> (licensed by <a href="https://creativecommons.org/licenses/by/3.0/" rel="noopener noreferrer" target="_blank">CC 3.0 BY</a>)
                </p>
                <p>
                  Fork it on <a href="https://github.com/davematias/PortfolioV2" rel="noopener noreferrer" target="_blank">Github!</a>
                </p>
              </div>
            </div>
          </div>
        </section>
        <Waypoint
                  onEnter={this.onEnter}
                  onLeave={this.onLeave}                  
                />
      </div>
    );
  }
}

export default About;
