import React from 'react';
import { Link } from 'react-router';

var AfterLogin = React.createClass({ 
	componentDidMount : function(){
		$("html").on('click','*',function(){
			if($(this).attr("id")!="MyAccount")
			$(".myaccount-menu").slideUp();
		});
		$(".main-nav").on('click','#MyAccount',function(){
			$(".myaccount-menu").slideToggle();
			return false;
		});
    },
    render : function(){
        return (
            <nav className="main-nav">
                <div>
                    Welcome <span className="user-name">{this.props.name}</span>
                </div>
                <Link to="/home">Home</Link>
                <Link to="/list">List</Link>
                <Link to="/login">PostAd</Link>                 
                <Link to="/contactus">ContactUs</Link>
                <Link to="#" id="MyAccount">MyAccount</Link> 
				<ul className="myaccount-menu">
					<li><a href= {window.location.pathname + "#/myads"} className="">View Myads</a></li>
					<li><a href={window.location.pathname + "#/logout"} className="logout">LogOut</a></li>
				</ul> 
            </nav>     
        );
    }
});
export default AfterLogin;
