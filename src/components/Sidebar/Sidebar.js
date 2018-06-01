import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Tooltip, Popover, PopoverTitle, PopoverContent } from 'reactstrap';
import { connect } from 'react-redux';
import { toggleTooltips, updateToolTip } from './../../actions/index';


class Sidebar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tooltip: !props.tooltip,
      step: props.step
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tooltip: !nextProps.tooltip,
      step: nextProps.step || 0
    });
  }

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.step === 1) {
      window.location.hash = '/dashboard';
    } else if (this.state.step === 2) {
      window.location.hash = '/affiliates/add';
    }else if (this.state.step === 4) {
      window.location.hash = '/affiliates/add';
    } else if (this.state.step === 6) {
      window.location.hash = '/products';
    } else if (this.state.step === 7) {
      window.location.hash = '/feed';
    } else {
      return;
    }
  }

  changeStep = (e) => {
      if (e.target.value === "next") {
        this.props.dispatch(updateToolTip(e.target.value, this.state.step));
      } else {
        this.props.dispatch(updateToolTip(e.target.value, this.state.step));
      }
  }

  render() {
    let buttonNext = 'Next';
    let popUpContent;
    let target;
    let popUpStyle = {};
    if (this.state.step === 1) {
      buttonNext = "Add Affiliate";
      target = 'DashboardTarget';
      popUpStyle = {
        top: '50px',
        left: '500px'

      };
      popUpContent = (
        <Popover placement="right" className="Popover-Dashboard" isOpen={this.state.tooltip} target="DashboardTarget" toggle={this.toggle}>
          <PopoverContent>  
            <div>
              <h5 className="modal-title">This is the Dashboard</h5><br/>
              Here you can view all your collated data from all your added affiliates. You can customise any and all data on this page, adding additional tables, graphs and tiles to display any information you please. This data can also be exported in a number of different formats.
              <br/><br/>
              Before you can start gathering data you need to add an Affiliate.
            </div>
            <br/>
            <div className="Popover-button-Sidebar">
              <Button className="btn btn-warning" value="back" onClick={this.changeStep}>Back</Button>{' '}
              <Button color="btn btn-info" value="next" onClick={this.changeStep}>{buttonNext}</Button>
            </div>
          </PopoverContent>
        </Popover>
      );
    } else if (this.state.step === 2) {
      buttonNext = "Let's do it"
      popUpContent = (
        <Popover placement="left" className="Popover-Affiliate" isOpen={this.state.tooltip} target="DashboardTarget" toggle={this.toggle}>
          <PopoverContent>  
            <div>
              <h5 className="modal-title">Select your Affiliate from the dropdown menu</h5><br/>
              Then insert your affiliate feed URL (<a href="/#/glossary" target="_blank">Where do I find this?</a>)<br/>
              Then click the <strong>"Add Affiliate"</strong> button.
            </div>
            <br/>
            <div className="Popover-button-Add">
              <Button color="btn btn-warning" value="back" onClick={this.changeStep}>Back</Button>{' '}
              <Button color="btn btn-info" value="next" onClick={this.changeStep}>{buttonNext}</Button>
            </div>
          </PopoverContent>
        </Popover>
      );
    }  

    return (

      <div className="sidebar">
            {popUpContent}
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-title">
              Dashboard
            </li>
            <li className="nav-item">
              <NavLink to={'/dashboard'} className="nav-link"><i className="icon-speedometer"></i> Dashboard <span className="badge badge-info">NEW</span></NavLink>
              <div id="DashboardTarget"></div>
            </li>

            <li className="nav-item">
              <NavLink to={'/affiliates'}  onClick={this.toggle} className="nav-link"><i className="icon-cursor"></i> Affiliates</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/products'} className="nav-link"><i className="icon-puzzle"></i> Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={'/feed'} className="nav-link"><i className="icon-note"></i> Feeds</NavLink>
            </li>
            <li className="divider"></li>
            <li className="nav-title">
              Extras
            </li>
            <li className="nav-item nav-dropdown">
              <a className="nav-link nav-dropdown-toggle" href="" onClick={this.handleClick.bind(this)}><i className="icon-star"></i> Pages</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/login'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/register'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Register</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/404'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Error 404</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/500'} className="nav-link" activeClassName="active"><i className="icon-star"></i> Error 500</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.STI.user,
    tooltip: state.STI.tooltip,
    step: state.STI.step
  };
}

export default connect(mapStateToProps, null)(Sidebar);