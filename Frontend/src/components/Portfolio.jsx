import React, { Component } from 'react';
import PortfolioItem from './PortfolioItem';
import { Waypoint } from 'react-waypoint';

import Actions from '../events/actions';
import { FaKickstarter } from 'react-icons/fa';

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentList: this.props.profile.portfolio,
      currentFilter: 'all'
    };
  }

  onEnter() {
    Actions.navigatedTo("portfolio");
  }

  filterItems(filter) {
    let list;

    switch (filter) {
      case "work":
      case "hobby": list = this.props.profile.portfolio.filter(i => i.kind === filter);
        break;
      default: list = this.props.profile.portfolio;
        break;
    }

    this.setState({ currentList: list, currentFilter: filter });
  }

  render() {
    return (
      <div>
        {
          this.props.profile ?
            <section id="portfolio">
              <Waypoint
                onEnter={this.onEnter}
              />
              <div className="container wow fadeInUp">
                <div className="section-header">
                  <h3 className="section-title">Portfolio</h3>
                  <p className="section-description">See what i've been up to lately</p>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <ul id="portfolio-flters">
                      <li onClick={() => this.filterItems("all")}
                        className={this.state.currentFilter === "all" ? "filter-active" : ""}>
                        All
                        </li>
                      <li onClick={() => this.filterItems("work")}
                        className={this.state.currentFilter === "work" ? "filter-active" : ""} >
                        Work
                          </li>
                      <li onClick={() => this.filterItems("hobby")}
                        className={this.state.currentFilter === "hobby" ? "filter-active" : ""} >
                        Hobby
                        </li>
                    </ul>
                  </div>
                </div>
                <div className="row" id="portfolio-wrapper">
                  {
                    this.state.currentList.map((item, index) => {
                      return <PortfolioItem key={index} item={item} />
                    })
                  }
                </div>
              </div>
            </section> :
            <></>
        }
      </div>
    );
  }
}

export default Portfolio;
