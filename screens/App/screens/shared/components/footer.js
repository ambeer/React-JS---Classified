import React from 'react';

var MyFooter = React.createClass({
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
            <div className="footer-container">
                <span>&copy; 2016 - <a href="http://www.techaspect.com/" target="_blank" title="Visit site">www.techaspect.com</a> - center of excellece</span>
            </div>     
        );
    }
});

export default MyFooter;