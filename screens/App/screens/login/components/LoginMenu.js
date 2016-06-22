import React from 'react';
import { Link } from 'react-router';

var LoginMenu = React.createClass({
	getInitialState : function(){
        return { Message : ''};
    },
    componentDidMount : function(){
        var self = this;
    },
    componentWillUnmount : function(){

    },
    render : function(){
        return (
            <nav className="login-nav">
                {/*<span>Click here to  </span> 
                <Link to="/signup">Sign up</Link>
            */}
            </nav>     
        );
    }
});

export default LoginMenu;
