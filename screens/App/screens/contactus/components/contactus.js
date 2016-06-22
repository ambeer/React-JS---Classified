import React from 'react';
var app  = require("../../../../../config/app-config.js");

var ContactUs = React.createClass({
	getInitialState : function(){
        return { 
        	Name : '',
			Email : '',
			Subject : '',
			Message : ''
        };
    },
    handleSubmit : function(e){
		e.preventDefault();
		var self = this;
		//var formData = new FormData();

		var Name = this.state.Name;
		var Email = this.state.Email;
		var Subject = this.state.Subject;
		var Message = this.state.Message;

		var PostData = (function (Name, Email, Subject, Message) {
		    return JSON.stringify({
		        Name: Name,
		        Email : Email,
		        Subject : Subject,
		        Message : Message
		    });
		})(Name, Email, Subject, Message);

		$.ajax({
			url : app.protocol +'://'+ app.server + ':' + app.port + '/taclassified/contactus', 
			type: 'POST',
			dataType: "json",
			cache: false,
			contentType : 'application/json; charset=utf-8',
			data: PostData,
			beforeSend: function() {				
			},
			success: function(data, status, req){		
				if(data.resultInfo == "Success"){
					//alert(data.classifiedId);
					//formData.append('id', data.classifiedId);
					//self.postFormData(formData);
					$('.msg-contactus').show();
					$('#Name').val('');
					$('#Email').val('');
					$('#Subject').val('');
					$('#Message').val('');	
					$('input, textarea').removeAttr('required');
				}		
			},
			error: function(jqXHR) {				
			}
		});		
	},
	setValue: function (field, event) {
		//If the input fields were directly within this
		//this component, we could use this.refs.[FIELD].value
		//Instead, we want to save the data for when the form is submitted
		var object = {};
		object[field] = event.target.value;
		this.setState(object);
	},
    componentDidMount : function(){
        var self = this;
        var minHeight = $(window).height()-$('#header').outerHeight()-$('#footer').outerHeight()-parseInt($('.app > div').css('margin-top'))-parseInt($('.app > div').css('margin-bottom'));
        $('.app > div').css('min-height',minHeight);
    },
    componentWillUnmount : function(){

    },
    render : function(){
        return (
            <div className="contactus-container">
				<h1>Contact Us</h1>
				<form className="contactus-form" onSubmit={this.handleSubmit} enctype="multipart/form-data">
					<div className="credentials-wrapper">
						<label>Name<span className="required">*</span></label>
						<input type="text" id="Name" placeholder="Name" name="Name" value={this.state.Name}  onChange={this.setValue.bind(this, 'Name')} required/>
					</div>
					<div className="credentials-wrapper">
						<label>Email<span className="required">*</span></label>
						<input type="email" id="Email" placeholder="Email" name="Email" value={this.state.Email}  onChange={this.setValue.bind(this, 'Email')} required/>
					</div>
					<div className="credentials-wrapper">
						<label>Subject<span className="required">*</span></label>
						<input type="text" id="Subject" placeholder="Subject" name="subject" value={this.state.Subject}  onChange={this.setValue.bind(this, 'Subject')} required/>
					</div>
					<div className="credentials-wrapper">
						<label>Message<span className="required">*</span></label>
						<textarea rows="4" cols="50" id="Message" placeholder="Message" name="message" value={this.state.Message}  onChange={this.setValue.bind(this, 'Message')} required></textarea>
					</div>
					<div className="success-msg">your msg has been sent successfully !!</div>
					<input type="submit" value="Contact Us" className="contactus-btn"/>
				</form>
            </div>     
        );
    }
});
export default ContactUs;
