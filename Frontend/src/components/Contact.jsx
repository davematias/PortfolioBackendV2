import React, { Component } from 'react';
import { Waypoint } from 'react-waypoint';

import Actions from '../events/actions';

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      subject: '',
      message: '',
      sendError: false,
      sendDone: false,
      sending: false,
      errors: {
        name: '',
        nameValid: false,
        email: '',
        emailValid: false,
        subject: '',
        subjectValid: false,
        message: '',
        messageValid: false,
        formValid: false
      }
    };
  }

  onEnter() {
    Actions.navigatedTo("contact");
  }

  validateField(fieldName, value) {
    let errors = this.state.errors;

    switch (fieldName) {
      case 'email':
        errors.emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        errors.email = errors.emailValid ? '' : 'Please enter a valid email';
        break;
      case 'name':
        errors.nameValid = value.length > 0;
        errors.name = errors.nameValid ? '' : 'Please enter a name';
        break;
      case 'subject':
        errors.subjectValid = value.length > 0;
        errors.subject = errors.subjectValid ? '' : 'Please enter a subject';
        break;
      case 'message':
        errors.messageValid = value.length > 0;
        errors.message = errors.messageValid ? '' : 'Please enter a message';
        break;
      default:
        break;
    }

    errors.formValid = errors.emailValid && errors.messageValid && errors.nameValid && errors.subjectValid;
    this.setState({ errors });
  }

  handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  sendEmail() {
    this.setState({sending: true});

    const { name, email, subject, message } = this.state;
    fetch(`${process.env.API_URL}/contact`, {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message
      })
    })
      .then(response => {
        this.setState({ sendDone: true, sending: false });
        setTimeout(() => this.setState({ sendDone: false }), 3000);
      })
      .catch(error => {
        console.error('error', error);
        this.setState({ sendError: true, sending: false });
        setTimeout(() => this.setState({ sendError: false }), 3000);
      });
  }

  render() {
    return (
      <div>
        <section id="contact">

          <div className="container wow fadeInUp">
            <div className="section-header">
              <h3 className="section-title">Contact Me</h3>
              <p className="section-description">The best way to get hold of me if by using this contact form, i'll try to get back to you within a day</p>
            </div>
          </div>
          <div className="container wow fadeInUp">
            <div className="row justify-content-center">

              <div className="col-lg-5 col-md-8">
                <div className="form">
                  <Waypoint
                    onEnter={this.onEnter}
                  />
                  {
                    this.state.sendDone ?
                      <div id="sendmessage">Your message has been sent. Thank you!</div>
                      : <div></div>
                  }
                  {
                    this.state.sendError ?
                      <div id="errormessage">Sorry an error ocurred while sending the message.</div>
                      : <div></div>
                  }
                  <div className="contactForm">
                    <div className="form-group">
                      <input type="text" autoComplete="off" name="name" className="form-control" id="name" placeholder="Your Name" onChange={e => this.handleUserInput(e)} />
                      <div className="validation">
                        {
                          this.state.errors.name
                        }
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="email" autoComplete="off" className="form-control" name="email" id="email" placeholder="Your Email" onChange={e => this.handleUserInput(e)} />
                      <div className="validation">
                        {
                          this.state.errors.email
                        }
                      </div>
                    </div>
                    <div className="form-group">
                      <input type="text" autoComplete="off" className="form-control" name="subject" id="subject" placeholder="Subject" onChange={e => this.handleUserInput(e)} />
                      <div className="validation">
                        {
                          this.state.errors.subject
                        }
                      </div>
                    </div>
                    <div className="form-group">
                      <textarea className="form-control" autoComplete="off" id="message" name="message" rows="5" placeholder="Message" onChange={e => this.handleUserInput(e)}></textarea>
                      <div className="validation">
                        {
                          this.state.errors.message
                        }
                      </div>
                    </div>
                    <div className="text-center">
                      <button type="button" onClick={() => this.sendEmail()} disabled={!this.state.errors.formValid}>
                        Send Message
                        {
                          this.state.sending ?
                            <i className="fa fa-spinner fa-spin loader contact"></i>
                            :
                            <></>
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>
      </div>
    );
  }
}