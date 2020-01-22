import React, { Component } from 'react';
import '../assets/css/footerComponentStyles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { SocialIcon } from 'react-social-icons';
export default class Footer extends Component{
	componentDidMount(){
  }
	render(){
		return(
			<div className="row primaryBackground footerMainDiv">
				<div className="row footerData1">
					<div className="col-md-1"></div>
					
					<div className="col-md-4">
						<h6>About Us</h6>
						<p className="tinyTxt">
						NextExibition.com is a platform for getting in touch of all the buzzing events around you.To meet to right opportunities you need to be at right place at right time with right information and meeting right people. Events are the perfect example and provide perfect platform for connecting with right opportunities. Our vast community of event goers share their reviews and photos, so you have all that you need to make an informed choice.
						</p>
					</div>
					<div className="col-md-1"></div>
					<div className="col-md-3">
						<h6>Contact Us</h6>
						<h8>Email:</h8>
						<p className="tinyTxt inlineDisplay" > nextexibition@gmail.com</p>
						<br/>
					</div>
					<div className="col-md-3">
						<h6>Social Links</h6>
						<SocialIcon network="facebook" url="https://www.facebook.com/NextExibition-107305510797064/" fgColor="#ffa257" bgColor="white" target="_blank" />
						<SocialIcon network="linkedin" url="https://www.linkedin.com/company/31067869/" fgColor="#ffa257" bgColor="white" className="s_icons" target="_blank"/>
						<SocialIcon network="twitter" url="https://twitter.com/nextexibition" fgColor="#ffa257" bgColor="white" className="s_icons" target="_blank"/>
					</div>
				</div>
				<br/>
				<div className="row footerData2">
					<div class="col-md-1"></div>
					<div class="col-md-10">
						<span className="tinyTxt1 inlineDisplay">By continuing to this page, you agree to our Terms of Service, Privacy Policy and Content Policies. All trademarks are properties of their respective owners.
						© 2020 - NextExibition Online Private Limited. All rights reserved.</span>
					</div>
					<div class="col-md-1"></div>
				</div>
			</div>
		)
	}
}