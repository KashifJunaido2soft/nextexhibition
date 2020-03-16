import React, { Component } from 'react';
import '../assets/css/footerComponentStyles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { SocialIcon } from 'react-social-icons';
import appStore from '../assets/images/appStore.png';
import playStore from '../assets/images/playstore.png';

export default class Footer extends Component{
	componentDidMount(){
	}
	appStoreLink(){
		alert("Coming Soon")
	}
  	playStoreLink(){
		alert("Coming Soon")
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
						<h6 className="footerEmail">Email : nextexibition@gmail.com</h6>
						{/* <p className="tinyTxt inlineDisplay" > nextexibition@gmail.com</p> */}
						<br/>
					</div>
					<div className="col-md-3">
						<h6>Social Links</h6>
						<SocialIcon network="facebook" url="https://www.facebook.com/NextExibition-107305510797064/" fgColor="#ffa257" bgColor="white" target="_blank" />
						<SocialIcon network="linkedin" url="https://www.linkedin.com/company/31067869/" fgColor="#ffa257" bgColor="white" className="s_icons" target="_blank"/>
						<SocialIcon network="twitter" url="https://twitter.com/nextexibition" fgColor="#ffa257" bgColor="white" className="s_icons" target="_blank"/>
						<br/><br/>
						<div className="row">
							<div className="col-md-5 col-sm-4 appStoreDiv">
								<img className="appStoreImg" src={appStore} alt="get from app store" onClick={() => this.appStoreLink()}/>
							</div>
							<div className="col-md-5 col-sm-4 playStoreDiv">
								<a href="https://play.google.com/store/apps/details?id=com.o2soft.nextexibition" target="_blank"><img className="playStoreImg" src={playStore} alt="get from play store"/></a>
							</div>
							<div className="col-md-2 col-sm-12"></div>
						</div>
					</div>
				</div>
				<br/>
				<div className="row footerData2">
					<div className="col-md-1"></div>
					<div className="col-md-10">
						<span className="tinyTxt1 inlineDisplay">By continuing to this page, you agree to our Terms of Service, Privacy Policy and Content Policies. All trademarks are properties of their respective owners.
						© 2020 - NextExibition Online Private Limited. All rights reserved.</span>
					</div>
					<div className="col-md-1"></div>
				</div>
			</div>
		)
	}
}