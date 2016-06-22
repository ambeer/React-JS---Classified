import React from 'react';
import { Link } from 'react-router';
import BeforeLogin from './mainNav';
import AfterLogin from './AfterLogin.js';

var MyHeader = React.createClass({
	getInitialState : function(){
        return { email : ''};
    },
    componentDidMount : function(){
        this.mobileNavigation();
    },
    componentWillMount : function(){     
    },
    componentWillUnmount : function(){
    },
    // mobile menu
    mobileNavigation : function(){
        if($(window).width()<768) {
            $('#mobile-menu-button').click(function(){
                if($('.main-nav').hasClass('show')){              
                    $('.main-nav').animate({ right: '-250px' }, 600,
                        function(){
                            $('.main-nav').hide();
                        }
                    );
                    $('.main-nav').removeClass('show')
                }
                else{
                    $('.main-nav').show();
                    $('.main-nav').animate({ right: 0 }, 600);
                    $('.main-nav').addClass('show');
                }   
            })
            $('.main-nav a').click(function(){  
                if($(this).attr("id")!="MyAccount"){         
                   $('.main-nav').animate({ right: '-250px' }, 600,
                        function(){
                            $('.main-nav').hide();
                        }
                    );
                    $('.main-nav').removeClass('show')
                }
            });
        }    
    },
    render : function(){
        var email = localStorage.getItem('email');
        var user = localStorage.getItem('user');
        return (
            <div className="header-container">
                <Link to="/">
                    <img src="images/talogo.png" alt="Techaspect logo" title="logo img"/>
					<span className="heading">Class<span className="highlight">ifieds</span></span>
                </Link>
                <button id="mobile-menu-button" className="navbar-toggle" type="button">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button> 
                {email
                   ? <AfterLogin name = {user} />
                   : <BeforeLogin />
                }
            </div>     
        );
    }
});

export default MyHeader;
