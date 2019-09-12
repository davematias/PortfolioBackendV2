import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class PortfolioItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    let item = this.props.item;
    let classComposition = `col-lg-3 col-md-6 portfolio-item filter-${item.kind}`;

    return (
      <div onClick={this.toggle} className={classComposition}>
       <img src={item.screenshotLinks[0]} alt="" />
       <div className="details">
        <h4>{item.title}</h4>
       </div>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="modal-dialog modal-lg">
          <ModalHeader toggle={this.toggle}>{item.title}</ModalHeader>
          <ModalBody>
            <img className="modal-img"  src={item.screenshotLinks[0]} alt="" />
            <p>{item.description}</p>
            {
              item.link && item.link !== '#' ?
              <a href={item.link} target="_blank">See More</a>
              :
              <span></span>
            }
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default PortfolioItem;