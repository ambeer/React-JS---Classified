import React from 'react';
import { Link } from 'react-router';

var BeforeLogin = React.createClass({        
    render : function(){
        return (
            <nav className="main-nav">
				<div class="nav-bar">
					<Link to="/home">Home</Link>
					<Link to="/list">List</Link>
					<Link to="/login">PostAd</Link>
					<Link to="/contactus">ContactUs</Link> 
				</div>
            </nav>     
        );
    }
});
export default BeforeLogin;
