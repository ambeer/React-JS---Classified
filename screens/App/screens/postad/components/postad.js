import React from 'react';
import Login from '../../login/components/login';
var app  = require("../../../../../config/app-config.js");

var PostAd = React.createClass({
	getInitialState : function(){
		return { 
			ClassifiedID : '',
			Name : '',
			Description : '',
			Amount : '',
			email : '',
			phone : ''
		};
		this.generateClassifiedID();
		this.getDataFromSession();
	},
	handleSubmit : function(e){		
		e.preventDefault();
		var self = this;
		var formData = new FormData();
		formData.append('file', $('input[type=file]')[0].files[0]);

		var ClassifiedID = this.state.ClassifiedID.trim();
		var Name = this.state.Name;
		var Description = this.state.Description.trim();
		var Amount = this.state.Amount;
		var email = this.state.email;
		var phoneno = this.state.phoneno;
		//var PostData = '{classifiedID:"'+ClassifiedID+'",Name:"'+ Name+'",Description:"'+ Description+'",Amount:"'+Amount+'"}';
		var PostData = (function (ClassifiedID, Name, Description, Amount, email, phoneno) {
		    return JSON.stringify({
		        ClassifiedID: ClassifiedID,
		        Name: Name,
		        Description : Description,
		        Amount : Amount,
		        email : email,
		        phoneno : phoneno
		    });
		})(ClassifiedID, Name, Description, Amount, email, phoneno);

		$.ajax({
			url : app.protocol +'://'+ app.server + ':' + app.port + '/taclassified/postAdd', 
			type: 'POST',
			dataType: "json",
			cache: false,
			contentType : 'application/json; charset=utf-8',
			data: PostData,
			beforeSend: function() {				
			},
			success: function(data, status, req){		
				if(data.resultInfo == "Success"){
					formData.append('id', data.classifiedId);
					self.postFormData(formData);
					$('.success-msg').show();
					$('#ClassifiedID').val('');
					$('#Name').val('');
					$('#description').val('');
					$('#Amount').val('');	
					$('input, textarea').removeAttr('required');
					window.scrollTo(0, 0);
				}		
				Loader.hideLoader();
			},
			error: function(jqXHR) {
				Loader.hideLoader();				
			}
		});	
		Loader.showLoader();	
	},
	postFormData : function(formData){
		$.ajax({
			url : app.protocol +'://'+ app.server + ':' + app.port + '/taclassified/fileupload',
			type: 'POST',
        	contentType: false,
        	processData: false,			
			data: formData,
			beforeSend: function() {				
			},
			success: function(data, status, req){		
				if(data.resultInfo == "Success"){
					if(data.isSizeLimit){
						alert(' Your Uploaded image is not supported as per our policy. We only accecpt jpeg/gif/png format images with below 2 MB Size.');
					}
		
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
		//this.generateClassifiedID();
		$('#ClassifiedID').prop('readonly', true);
		var minHeight = $(window).height()-$('#header').outerHeight()-$('#footer').outerHeight()-parseInt($('.app > div').css('margin-top'))-parseInt($('.app > div').css('margin-bottom'));
        $('.app > div').css('min-height',minHeight);
	},
	componentWillUnmount : function(){

	},
	componentWillMount : function(){		
		this.generateClassifiedID();
		this.getDataFromSession();
	},
	generateClassifiedID : function(){
		var min = 1;
		var max = 100000;
		var number = Math.round(Math.random() * (max - min) + min);
		this.state.ClassifiedID = "TA" + number;
	},
	getDataFromSession : function(){	 
		this.state.email =  localStorage.getItem('email') + '@techaspect.com';
		this.state.phoneno =  localStorage.getItem('id');		 
	},
	render : function(){
		var email = localStorage.getItem('email');
        if(email){
        	return (
				<div className="postad-container">				
					<h1>Post Your Ad</h1>
					<form className="postad-form" onSubmit={this.handleSubmit} enctype="multipart/form-data">
						<div className="success-msg">Your ad has been successfully posted !!</div>
						
						<div className="credentials-wrapper">
							<label> Title<span className="required">*</span></label>
							<input type="text" name="Name" id="Name" placeholder="Name" value={this.state.Name}  onChange={this.setValue.bind(this, 'Name')} required/>		
						</div>
						<div className="credentials-wrapper">
							<label>Description<span className="required">*</span></label>
							<textarea rows="4" cols="50" id="description" placeholder="Description of your content" name="description" value={this.state.Description}  onChange={this.setValue.bind(this, 'Description')} required></textarea>
						</div>
						<div className="credentials-wrapper">
							<label>Amount<span className="required">*</span></label>
							<input type="number" name="Amount" id="Amount" placeholder="Amount"  value={this.state.Amount}  onChange={this.setValue.bind(this, 'Amount')} required/>
						</div> 				

						<div className="credentials-wrapper">
							<label>Email<span className="required">*</span></label>
							<input type="text" id="email" name="email" placeholder="email" readOnly={true} defaultValue={this.state.email} required/>
						</div> 
						
						 <div className="credentials-wrapper">
							<label>EmployeeID<span className="required">*</span></label>
							<input type="text" id="phoneno" name="phoneno" placeholder="Employee ID" defaultValue={this.state.phoneno} readOnly={true} required/>
						</div> 					 	

						<div className="credentials-wrapper">
							<label>ClassifiedID<span className="required">*</span></label>
							<input type="text" id="ClassifiedID" name="ClassifiedID" placeholder="classifiedID" defaultValue={this.state.ClassifiedID} required/>
						</div> 

						<div className="credentials-wrapper">
							<label>Browse</label>
							<input type="file" accept="image/*" name="password" placeholder="Password" 	/>
							<span class="user-name"> Note : We Accept only jpg/png/gif image formats and size less than 2 MB </span>
						</div>				
					 
						<input type="submit" value="Post Ad" className="postad-button" />
					</form>

				</div>       
			);
		}else{
			window.location.href = window.location.pathname + "#/login";
            window.location.reload();
		}	
	}
});
export default PostAd;
