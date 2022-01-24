import React, { Component } from 'react';
import '../Styles/Header.scss'

export default class Header extends Component {
  render() {
    return  <div className="qa-header">
    <div className="container-fluid">
        <div className="btn-group">
            <button type="button" className="btn btn-custom dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
            <span className='user-avatar'>SN</span>  Swetha Naidu  
            </button>
            <ul className="dropdown-menu dropdown-menu-lg-end">
              <li><button className="dropdown-item" type="button">Update Profile</button></li>
              <li><button className="dropdown-item" type="button">Change Password</button></li>
              <li><hr className="dropdown-divider" /></li>
              <li><button className="dropdown-item" type="button">Logout</button></li>
            </ul>
          </div>
    </div>
</div>;
  }
}
