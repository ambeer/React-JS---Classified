import React from 'react';
var app  = require("../../../../../config/app-config.js");

var viewMyads = React.createClass({
  getInitialState : function(){
      return {
          data : {Message:[]},
          userData : '',
          email : '',
          isRecord: 1
      };
  },
  getAllUsers : function(){
      var self = this;
      $.ajax({
        url: app.protocol +'://'+ app.server + ':' + app.port + '/taclassified/myAdds',
        dataType: 'json',
	      type:'POST',
        data: JSON.stringify({"email" :this.state.email}),
        contentType : 'application/json; charset=utf-8', 
        success: function(data) {
          this.setState({data:data,isRecord:data.Message.length});

        }.bind(this),
        error : function() {
        }.bind(this)
      }); 
  },    
  componentDidMount : function() {
    var minHeight = $(window).height()-$('#header').outerHeight()-$('#footer').outerHeight()-parseInt($('.app > div').css('margin-top'))-parseInt($('.app > div').css('margin-bottom'));
    $('.app > div').css('min-height',minHeight);
  },
  componentWillMount : function(){  
	var email = localStorage.getItem('email');
      if(email){
          this.state.email = email;
      }
	this.getAllUsers();
      
  },
  render : function(){       
    return (
      <div className="components-list-container">
        <h1>My Posted Ads</h1>
        <ul className="components-list-heading">
          <li>
            <div>Classified Title</div>
            <div>Description</div>
            <div>Amount</div>
          </li>
          {this.state.isRecord
            ? this.state.data.Message.map(function(item, index) {
              return (
                <li>
                  <div>
                    <p><a href={window.location.pathname + '#/' + item.classifiedID }>{item.name}</a></p>
                    <p>By : {item.email}</p>
                    <p>On : XX-XX-XXXX</p>
                  </div>
                  <div>
                    <ul className="component-desc-list">
                      <li>{item.description}</li>
                    </ul>     
                  </div>
                  <div>{item.price}</div>
                </li>
              );
              }, this)
            : <li className="no-records">No records found</li>
          }
        </ul>
      </div>              
    );
  }
});

export default viewMyads;
