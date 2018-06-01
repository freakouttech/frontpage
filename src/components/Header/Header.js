import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import Cookies from 'cookies-js';
import { toggleTooltips } from './../../actions/index';
import SocketLibrary from '../../components/Library/';

// import { removeUser } from './../../actions/index';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
      user: props.user,
      tooltip: props.tooltip,
      notification: 5
    };
  }

  componentDidMount() {

    if (this.state.user.affiliates) {
      if (Object.keys(this.state.user.affiliates).length === 0) {
        this.handleToggle();
      }
    }
  }

  componentWillReceiveProps(nextProps) {
     this.setState({
      user: nextProps.user,
      tooltip: nextProps.tooltip
    });
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  handleToggle = () => {
    this.props.dispatch(toggleTooltips(this.state.tooltip));
  }
  logOut = () => {
    return fetch('/user/logout', {
      accept: 'application/json',
    }).then(res => res.json())
    .then(r => {
      // this.props.removeUser(this.state.user);
      Cookies.expire('sti-user');
      Cookies.expire('jwtToken');
      window.location.hash = '/login';
    });
  }

  sidebarToggle = (e) => {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  mobileSidebarToggle = (e) => {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle = (e) => {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  testAPI = () => {
    return fetch('/ping', {
      accept: 'application/json',
    }).then(res => res.json())
    .then(r => console.log(r));
  }

  testSocket = () => {
  }

  render() {
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" onClick={this.mobileSidebarToggle} type="button">&#9776;</button>
        <a className="navbar-brand" href="#"></a>
        <ul className="nav navbar-nav d-md-down-none">
          <li className="nav-item">
            <a className="nav-link navbar-toggler sidebar-toggler" onClick={this.sidebarToggle}>&#9776;</a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="">Dashboard</a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="">Users</a>
          </li>
          <li className="nav-item px-3">
            <a className="nav-link" href="">Settings</a>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href=""><i className="icon-list"></i></a>
          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link" href=""><i className="icon-location-pin"></i></a>
          </li>
          <li className="nav-item dropdown">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <a onClick={this.toggle} className="nav-link dropdown-toggle nav-link" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
                <img src={'img/avatars/6.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com"/>
                <span className="d-md-down-none capitalize">{this.state.user.name}</span>
              </a>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem header className="text-center"><strong>Account</strong></DropdownItem>

                <DropdownItem onClick={this.testAPI} ><i className="fa fa-bell-o"></i> Updates<span className="badge badge-info">42</span></DropdownItem>
                <DropdownItem onClick={this.testSocket}><i className="fa fa-envelope-o"></i> Messages<span className="badge badge-success">42</span></DropdownItem>
                <DropdownItem onClick={this.handleToggle}><i className="fa fa-tasks"></i> Tasks<span className="badge badge-danger">42</span></DropdownItem>
                <DropdownItem><i className="fa fa-comments"></i> Comments<span className="badge badge-warning">42</span></DropdownItem>

                <DropdownItem header className="text-center"><strong>Settings</strong></DropdownItem>

                <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
                <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                <DropdownItem><i className="fa fa-usd"></i> Payments<span className="badge badge-default">42</span></DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.logOut} ><i className="fa fa-lock"></i> Logout</DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </li>
          <li className="nav-item d-md-down-none">
            <a className="nav-link navbar-toggler aside-menu-toggler" onClick={this.asideToggle} href=""><i className="icon-bell"></i><span style={{  marginTop: "-17px", fontSize: "10px"}} className="badge badge-pill badge-danger">{this.state.notification}</span></a>
          </li>
        </ul>
      </header>
    )
  }
}
function mapStateToProps(state, ownProps) {
  return {
    user: state.STI.user,
    tooltip: state.STI.tooltip
  };
}

export default connect(mapStateToProps, null)(Header);