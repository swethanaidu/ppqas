import React, { Component } from 'react'
import axios from 'axios';
import SideNav from './SideNav';
import PageContent from './PageContent'

export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            // email: '',
            // password: '',
            // lastName: '',
            user: undefined,
            isLoggedIn: false,
            // loginError: undefined,
        };
    }

    componentDidMount() {
        //get location
        // axios.get('http://localhost:5454/getAllLocations')
        // .then(resp => {
        //     this.setState({
        //         location: resp.data.location
        //     })
        // })
        // .catch(error => {
        //     this.setState({
        //         error
        //     })
        // })
        const isLoggedIn = localStorage.getItem("isLoggedIn");
        let user = localStorage.getItem("user");
        console.log(user);
        if (user) {
            user = JSON.parse(user);
        }
        else {
            window.location.href = '/login'
        }
        this.setState({
            user: user,
            isLoggedIn: isLoggedIn
        });
        //get property types
        // axios.get('<URL>')
        // .then(resp => {
        //     this.setState({
        //         propertyTypes: resp.data.propertyTypes
        //     })
        // })
        // .catch(error => {
        //     this.setState({
        //         error
        //     })
        // })
    }
    render() {
        const { isLoggedIn, user } = this.state;
        
        return (
            <React.Fragment>
                <div className='qa'>
                    <SideNav />
                    <PageContent />
                </div>
                {/* <h1> { user}</h1> */}
                {/* <Wallpaper locationData={location} />
                <QuickSearches qsData={propertyTypes} /> */}
                {/* <Register /> */}
            </React.Fragment>
        )
    }
}
