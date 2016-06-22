import React from 'react';

var LogOut = React.createClass({
	componentDidMount:function() {
        localStorage.clear();
		window.location.href = window.location.pathname + "#/login";
    },
	render:function() {
        return (
            <p>You have been logged out.</p>
        );
    }
});

export default LogOut;