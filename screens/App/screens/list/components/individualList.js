import React from 'react';
var app  = require("../../../../../config/app-config.js");

var UserList = React.createClass({
    getInitialState : function(){
        return {
            data : {Message:[]},
            userData : ''
        };
    }, 
    getIndividualUser : function(){
        var self = this;
        $.ajax({
          url: app.protocol +'://'+ app.server + ':' + app.port + '/taclassified/fetchAdds/'+ this.state.userData,
          dataType: 'json',
          cache: false,
          async: false,
          contentType: "application/json", 
          success: function(data) {
            this.setState({data:data});
          }.bind(this),
          error : function() {
            //console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },componentDidMount : function() {
      var minHeight = $(window).height()-$('#header').outerHeight()-$('#footer').outerHeight()-parseInt($('.app > div').css('margin-top'))-parseInt($('.app > div').css('margin-bottom'));
      $('.app > div').css('min-height',minHeight);
    },
    componentWillMount : function(){
        this.buildListData();        
    },
    buildListData : function(){
      var data = window.location.hash.split('/');
      var param = data[1].split('?')[0];
      this.state.userData = param;
      this.getIndividualUser();
    },
    render : function(){       
        return (
            <div className="individual-list-container">
                <ul className="individual-list-heading">
                    {
						this.state.data.Message.map(function(item, index) {
						return (
							<li>
								<div className="classified-image"> 
									<img src={"http://192.168.2.128:3000/"+ item.imagepath} /> 
								</div>
								<div className="classified-details">
									<div className="classified-name">{item.name}</div>
									<div className="classified-price">Rs.{item.price}</div>
									<div className="classified-description">
										<ul className="component-desc-list">
											<li>{item.description}</li>
										</ul>     
									</div>
									<div>
										<div className="contact">For further details,Please Contact at</div>
										<div className="mail-id">Mail : {item.email}</div>
										<div className="phone-number">Employee ID : {item.phoneno}</div>
									</div>
								</div>
							</li>
						);
                    }, this)} 

                </ul>
            </div>              
        );
    }
});

export default UserList;
