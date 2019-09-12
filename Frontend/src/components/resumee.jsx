import React, { Component } from 'react';
import { WOW } from 'wowjs/dist/wow';
import { Waypoint } from 'react-waypoint';

import Actions from '../events/actions';

class Resumee extends Component {
  constructor(props) {
    super(props);
  }

  onEnter() {
    Actions.navigatedTo("resumee");
  }

  render() {
    let profile = this.props.profile || null;
    let studyHistories = [];
    let workHistories = [];

    if (profile) {
      studyHistories = profile.histories.filter(history => history.kind === 'study');
      workHistories = profile.histories.filter(history => history.kind === 'work');
    }

    return (
      <div>
        {
          profile ?
            <div>
              <section id="resumee">
                <Waypoint
                  onEnter={this.onEnter}
                />
                <div className="container wow fadeIn">
                  <div className="section-header">
                    <h3 className="section-title">Resumee</h3>
                    <p className="nopad section-description">
                      Hi! I'm {profile.name} and developing software is both my job and my passion. I'm currently working for <a href={profile.currentEmployerUrl} target="_blank">{profile.currentEmployer}</a> in <a href={profile.locationMapLink} target="_blank">{profile.location}</a>
                    </p>
                    <p>
                      <a href={profile.cvUrl} target="_blank" className="btn-get-started">Download Resumee</a>
                    </p>
                  </div>

                  <div className="row spacer-xl">
                    <div className="col-lg-8 col-md-8 wow fadeInUp" data-wow-delay="0.2s">
                      <div className="box">
                        <div className="icon"><i className="fa fa-desktop"></i></div>
                        <h4 className="title">Skills</h4>
                        <div className="description">
                          {
                            profile.skills.map((skill, index) => {
                              return <button key={index} type="button" className="btn btn-outline-secondary" disabled>{skill.name}</button>
                            })
                          }
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 wow fadeInUp" data-wow-delay="0.4s">
                      <div className="box">
                        <div className="icon"><i className="fa fa-globe"></i></div>
                        <h4 className="title">Languages</h4>
                        <div className="description">
                          {
                            profile.languages.map((language, index) => {
                              return <h5 key={index}>{language.name}</h5>
                            })
                          }
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8 col-md-8 spacer-xl wow fadeInUp" data-wow-delay="0.6s">
                      <div className="box">
                        <div className="icon"><i className="fa fa-gamepad"></i></div>
                        <h4 className="title">Interests</h4>
                        <div className="description">
                          {
                            profile.interests.map((interest, index) => {
                              return <button key={index} type="button" className="btn btn-outline-secondary" disabled>{interest}</button>
                            })
                          }
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 spacer-xl wow fadeInUp" data-wow-delay="0.8s">
                      <div className="box">
                        <div className="icon"><i className="fa fa-certificate"></i></div>
                        <h4 className="title">Certifications</h4>
                        <div className="description">
                          {
                            profile.certifications.map((certification, index) => {
                              return <h5 key={index}>{certification}</h5>
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  {
                    workHistories.length === 0 ?
                      <div></div>
                      :
                      <div>
                        <div className="spacer-xl wow fadeInUp" data-wow-delay="0.2s">
                          <h3>Work</h3>
                        </div>
                        <div id="content" className="row">
                          <div className="col-lg-12 col-md-12 wow fadeInUp" data-wow-delay="0.4s">
                            <ul className="timeline">
                              {
                                workHistories.map((history, index) => {
                                  const delay = (0.6 + (index * 0.1)) + 's';
                                  let startDate = new Date(history.startDate);
                                  startDate = `${startDate.getMonth() + 1}/${startDate.getFullYear()}`;

                                  let endDate = history.current ? '' : new Date(history.endDate);
                                  if (endDate) {
                                    endDate = ` - ${endDate.getMonth() + 1}/${endDate.getFullYear()}`;
                                  }
                                  return <li key={index} className="event wow fadeInUp" data-wow-delay={delay}>
                                    <h3>{history.title}</h3>
                                    <p>{history.place}</p>
                                    <p>{startDate}{endDate}</p>
                                    <p className="description" >{history.description}</p>
                                  </li>
                                })
                              }
                            </ul>
                          </div>
                        </div>
                      </div>
                  }
                  {
                    studyHistories.length === 0 ?
                      <div></div>
                      :
                      <div>
                        <div className="wow fadeInUp" data-wow-delay="0.2s">
                          <h3>Education</h3>
                        </div>
                        <div className="row">
                          {
                            studyHistories.map((history, index) => {
                              const delay = (0.4 + (index * 0.1)) + 's';
                              return <div key={index} className="col-lg-6 col-md-6 wow fadeInUp" data-wow-delay={delay}>
                                <div className="education-box box">
                                  <h4 className="title">{history.title}</h4>
                                  <div className="un-description">
                                    {history.place}
                                  </div>
                                  <div className="un-date-description">
                                    {
                                      new Date(history.startDate).getFullYear()
                                    }
                                    <span>-</span>
                                    {
                                      new Date(history.endDate).getFullYear()
                                    }
                                  </div>
                                  <p className="description">
                                    {history.description}
                                  </p>
                                </div>
                              </div>
                            })
                          }
                        </div>

                      </div>
                  }
                </div>
              </section>
            </div>
            :
            <div></div>
        }
      </div>
    );
  }
}

export default Resumee;
