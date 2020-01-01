import React, { Component } from 'react';
import './footerComponentStyles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { SocialIcon } from 'react-social-icons';
export default class Footer extends Component{
	componentDidMount(){
  }
	render(){
		return(
			<div className="row primaryBackground footerMainDiv">	
		        	<div className="col-md-1"></div>
	            	
	            	<div className="col-md-4">
	            		<h6>About Us</h6>
	            		<p className="tinyTxt">
	            		NextExhibition.com is an Exhibitions Owner, Trade Fair, Trade Shows Exhibition Organizer, 
	            		Event Management Company with strategic partners and major operations in Pakistan. 
	            		Since its inception in 2018, NextExhibition.com has, through a two-prong strategy, extended its reach to cover 
	            		all major cities of Pakistan, simultaneously establishing a network of partners in China, Turkey, 
	            		South Korea, U.K., Malaysia, U.A.E., Central Asian Republics, Middle East, India and Far East.
	            		</p>
	            		<SocialIcon network="facebook" url="https://www.facebook.com/nextexhibition" fgColor="white" bgColor="#ffa257" target="_blank"/>
	            		<SocialIcon network="linkedin" url="https://www.linkedin.com/company/31067869/" fgColor="white" bgColor="#ffa257" className="s_icons" target="_blank"/>
	            		<SocialIcon network="twitter" url="https://www.linkedin.com/company/31067869/" fgColor="white" bgColor="#ffa257" className="s_icons" target="_blank"/>
	            	</div>

	            	<div className="col-md-4">
		            	<h6>Contact Us</h6>
		            	<h8>Email:</h8>
		            	<p className="tinyTxt inlineDisplay" > info@nextexhibition.com</p>
		            	<br/>	
		            	<h8>Telephone: </h8>
		            	<p className="tinyTxt inlineDisplay">(+92) 345 416 5259</p>
	            		<br/>	
		            	<h8>Address: </h8>
		            	<p className="tinyTxt inlineDisplay">NextExhibition (Pvt) Ltd, Office # 10, Ground Floor Al-Hafeez Suites 69-B2 M M Alam Road Gulberg III, Lahore, Pakistan</p>
		            	<br/>
		            </div>

	            	<div className="col-md-2"> 
	            		<h6>Quick Links</h6>
	            		<a href="/" className="main2">Services</a>
	            		<a href="/" className="main2">Feedback</a>
	            		<a href="/" className="main2">Career(join us)</a>
	            		<a href="/" className="main2">List your Event</a>
	            		<a href="/" className="main2">Event Marketing</a>
	            		<a href="/" className="main2">Help Center(FAQ)</a>
	            	</div>
	            	<div className="col-md-1"></div>
	            </div>
			
		


			)
	}
}