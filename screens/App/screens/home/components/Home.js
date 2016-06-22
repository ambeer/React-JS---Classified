import React from 'react';
import { Link } from 'react-router';

var Home = React.createClass({
	getInitialState : function(){
        return { Message : ''};
    },
    componentDidMount : function() {
    	var minHeight = $(window).height()-$('#header').outerHeight()-$('#footer').outerHeight()-parseInt($('.app > div').css('margin-top'))-parseInt($('.app > div').css('margin-bottom'));
        $('.app > div').css('min-height',minHeight);
		$("#carousel").Carousel(); 
	},
    componentWillUnmount : function(){
    },
    render : function(){
        return (
             <div className="homepage-section">
                <section className="banner">
					<div id="carousel" className="carousel">
						<ul className="images">
							<li className="slide">
								<img src="images/appliances-banner.png" alt="banner-image not loaded" title="Banner-image"/>
								<div className="slide-content">Want to sell old home appliances, post here</div>
							</li>
							<li className="slide">
								<img src="images/car-banner-bg.png" alt="banner-image not loaded" title="Banner-image"/>
								<div className="slide-content">Thinking of buying new wheels, post ad of your old vehicles here</div>
							</li>
							<li className="slide">
								<img src="images/mobile-phone-banner.jpg" alt="banner-image not loaded" title="banner-image"/>
								<div className="slide-content">Get rid of your old Mobiles by posting ad here</div>
							</li>
						</ul>
						<span className="control prev"></span>
						<span className="control next"></span>
						<ul className="pagersList">    
							<li></li>
							<li></li>
							<li></li>
						</ul>
					</div>
				</section>
				<div className="postad-section">
					<span className="title">Sell or Advertise anything using</span>
					<span className="postad-btn"><Link to="/postad">PostAd</Link></span>
				</div>
            </div>     
        );
    }
});

export default Home;



