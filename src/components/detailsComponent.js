import React, { Component } from 'react';
import '../assets/css/detailsComponentStyles.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'; //adding import statement
import { Link } from 'react-router-dom';
import Footer from "./footerComponent";
import { withRouter } from "react-router";
import {
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	WhatsappShareButton,

	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
	WhatsappIcon,
} from 'react-share';

import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Cancel';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		color: theme.palette.text.primary,
	},
}));

class Details extends Component {
	constructor(props){
		super(props);
		this.state={
			eventDeatail:'',
			allTags:[],
			eventTags : [],
			eventCity : '',
			About : '1',
			Reviews : '0',
			Exibitors : '0',
			Photos : '0',
			Speakers : '0',
			relatedEvents : [],
			moreventsinCity : [],
			allCities:[],
			relatedEventByName : '',
			socialIconClass:'socialIconsDivHide',
			apiBaseUrl : 'http://64.225.33.244:8000/',
			baseUrl : 'http://64.225.33.244:3000/',
			baseLink : 'http://www.nextexibition.com/'
		}
	}
	componentDidMount(){
		const id = this.props.match.params.id;
		let eventUrl = this.state.apiBaseUrl + 'event/allEvents/?id='+id;
		let cityUrl = this.state.apiBaseUrl + "event/allCities/";
		let tagsUrl = this.state.apiBaseUrl + "event/allTags/";
		
		const cityDataReq = axios.get(cityUrl);
		const tagsDataReq = axios.get(tagsUrl);
		const eventDataReq = axios.get(eventUrl);

		axios.all([cityDataReq, tagsDataReq, eventDataReq]).then(axios.spread((...responses) => {
			
			const cityDataRes = responses[0].data;
			const tagsDataRes = responses[1].data;
			const eventDataRes = responses[2].data.results[0];
			
			let totalTagslen = tagsDataRes.length;
			let eventTagslen = eventDataRes.event_tag.length;
			let allCitieslen = cityDataRes.length;

			var thisEventCity='';
			
			for(let i = 0; i < allCitieslen; i++){
				let target = eventDataRes.event_city;
				if(target === cityDataRes[i].id){
					thisEventCity = cityDataRes[i].name
					break;
				}
			}
			var thisEventTags=[];
			for(let i = 0 ; i < eventTagslen ; i++){
				for(let j = 0 ; j < totalTagslen ; j++){
					if(eventDataRes.event_tag[i] === tagsDataRes[j].id){
						thisEventTags.push(tagsDataRes[j].name);
						break;
					}
				}
			}
			this.setState({
				eventDeatail : eventDataRes,
				allTags : tagsDataRes,
				eventTags : thisEventTags,
				eventCity : thisEventCity,
				allCities : cityDataRes
			})
			axios.get(this.state.apiBaseUrl + 'event/allEvents?event_type=' + eventDataRes.event_type)
	        .then(response => {
	            this.setState({relatedEvents : response.data.results});
	        })
	        .catch(function (error){
	            console.log(error);
	        })

	        axios.get(this.state.apiBaseUrl + 'event/allEvents?event_city=' + eventDataRes.event_city)
	        .then(response => {
	            this.setState({moreventsinCity : response.data.results});
	        })
	        .catch(function (error){
	            console.log(error);
	        })
		})).catch(errors => {
			  console.log(errors);
		})
	}	

	getEventDetailsByName(id){
		var url = this.state.apiBaseUrl + 'event/allEvents/?id=' + id;
		axios.get(url)
		.then(response => {
			this.setState({eventDeatail : response.data.results[0]});
		})
		.catch(error =>{
			console.log(error);
		})
	}
	getEventDetailsByName2(id){
		var url = this.state.apiBaseUrl + 'event/allEvents/?id=' + id;
		axios.get(url)
		.then(response => {
			this.setState({eventDeatail : response.data.results[0]});
		})
		.catch(error =>{
			console.log(error);
		})
	}
	
	selectContent(name){
		if(name === 'about'){
			this.setState({
				About : '1',
				Reviews : '0',
				Exibitors : '0',
				Photos : '0',
				Speakers : '0',

			})
		}
		else if(name === 'reviews'){
			this.setState({
				Reviews : '1',
				About : '0',
				Exibitors : '0',
				Photos : '0',
				Speakers : '0',
			})
		}
		else if(name === 'exibitors'){
			this.setState({
				Exibitors : '1',
				About : '0',
				Reviews : '0',
				Photos : '0',
				Speakers : '0',
			})
		}
		else if(name === 'photos'){
			this.setState({
				Photos : '1',
				About : '0',
				Reviews : '0',
				Exibitors : '0',
				Speakers : '0',
			})
				
		}
		else if(name === 'speakers'){
			this.setState({
				Speakers : '1', 
				About : '0',
				Reviews : '0',
				Exibitors : '0',
				Photos : '0',
			})	
		}
	}

	ongoingCount(id){
		var data = ({
			'event_id' : id,
		})
		axios.post(this.state.apiBaseUrl + 'event/postGoingCount', data)
		.then(response => {
			let currentEvent = this.state.eventDeatail;
			currentEvent.going_count = response.data.going_count
			this.setState({eventDeatail : currentEvent})
		})
		.catch(err => {
			console.log(err)
		});
	}
	showSocialDiv(){
		this.setState({socialIconClass : 'socialIconsDivShow'});
	}
	hideSocialDiv(){
		this.setState({socialIconClass : 'socialIconsDivHide'});
	}
	makeBody(event,eventTags,relatedevents,moreventsinCity){

		var descBody = '';
		var similarEvents = '';
		var similarEvents1 = '';
		var moreEvents = '';
		var moreEvents1 = '';
		var eventcity=[];
		var eventcity2=[];
		
		var abuotbtncls = 'selectionBtn';
		var revBtnCls = 'selectionBtn';
		var exibBtnCls = 'selectionBtn';
		var imgsBtnCls = 'selectionBtn';
		var spkrBtnCls = 'selectionBtn';

		if(this.state.About === '1'){
			abuotbtncls = 'selectionBtn clrBrdr';
			revBtnCls = 'selectionBtn';
			exibBtnCls = 'selectionBtn';
			imgsBtnCls = 'selectionBtn';
			spkrBtnCls = 'selectionBtn';
			descBody = <p className="primaryColor">
				{event.event_description}
			</p>;
		}
		else if(this.state.Reviews === '1'){
			abuotbtncls = 'selectionBtn';
			revBtnCls = 'selectionBtn clrBrdr';
			exibBtnCls = 'selectionBtn';
			imgsBtnCls = 'selectionBtn';
			spkrBtnCls = 'selectionBtn';
			descBody = <p className="primaryColor">
				Some Reviews
			</p>;
		}
		else if(this.state.Exibitors  === '1'){
			abuotbtncls = 'selectionBtn';
			revBtnCls = 'selectionBtn';
			exibBtnCls = 'selectionBtn clrBrdr';
			imgsBtnCls = 'selectionBtn';
			spkrBtnCls = 'selectionBtn';
			descBody = <p className="primaryColor">Some Exibitors
			</p>;
			
		}
		else if(this.state.Photos  === '1'){
			abuotbtncls = 'selectionBtn';
			revBtnCls = 'selectionBtn';
			exibBtnCls = 'selectionBtn';
			imgsBtnCls = 'selectionBtn clrBrdr';
			spkrBtnCls = 'selectionBtn';
			descBody =  <div className="imagesContainer">
							{event.additional_images.map((imgObj) => {return <img class="img-responsive extraImgs" src={imgObj.image} alt="img"/>})}
						</div>;
			
		}
		else if(this.state.Speakers  === '1'){
			abuotbtncls = 'selectionBtn';
			revBtnCls = 'selectionBtn';
			exibBtnCls = 'selectionBtn';
			imgsBtnCls = 'selectionBtn';
			spkrBtnCls = 'selectionBtn clrBrdr';
			descBody = <p className="primaryColor">
			Some speakers</p>;
		}
		
		var targetArr = relatedevents.map((evnt) => {return evnt.event_city;}); 
		
		let allCitieslen = this.state.allCities.length;
		for(var i = 0 ; i < targetArr.length ; i++){
			for(var j = 0 ; j < allCitieslen ; j++){
				if(targetArr[i] === this.state.allCities[j].id){
					eventcity.push(this.state.allCities[j].name);
					break;
				}
			}
		}
		similarEvents = relatedevents.map((eventobj, index) => {
			var strtDate = new Date(eventobj.start_date);
			var frmtd_date =  strtDate.toDateString();
			return ( 
					<tr>
						<td className="primaryColor relatedCategoryEventDate">
							{frmtd_date}
						</td>
						<td className="relatedEventsData" onClick={()=>this.getEventDetailsByName(eventobj.id)}>
							<a className="relatedCategoryEventName"> {eventobj.event_name} </a>
							<br/>
							<b className="primaryColor relatedCategoryEventCityname"> {eventcity[index]} </b>
						</td>
					</tr>
						   
					)})

		similarEvents1 = <table class="table table-striped">
							<tbody>
								{similarEvents}
							</tbody>
						</table>

		var targetArr2 = moreventsinCity.map((evnt) => {return evnt.event_city;}); 
		
		let allCitieslen2 = this.state.allCities.length;
		for(let i = 0 ; i < targetArr2.length ; i++){
			for(let j = 0 ; j < allCitieslen2 ; j++){
				if(targetArr2[i] === this.state.allCities[j].id){
					eventcity2.push(this.state.allCities[j].name);
					break;
				}
			}
		}

		moreEvents1 = moreventsinCity.map((eventobj, index) => { 
			var strtDate2 = new Date(eventobj.start_date);
			var frmtd_date2 =  strtDate2.toDateString();
			return (
				      <tr>
					        <td className="primaryColor relatedCityEventDate">
					        	{frmtd_date2}
					        </td>
					        <Link to={{pathname: "/details/"+eventobj
					        .id}}>
					        <td className="relatedEventsData" onClick={()=>this.getEventDetailsByName2(eventobj.id)} >
					        	<a className="relatedCityEventName"> {eventobj.event_name}</a>
					       		<br/>
					        	<b className="primaryColor relatedCityEventCityname">
					        		{eventcity2[index]}</b>
					        </td>
					        </Link>
					    </tr>
					)})
		
		moreEvents = <table class="table table-striped">
						<tbody>
							{moreEvents1}
						</tbody>
					</table>		
		var shareUrl = this.state.baseLink + 'details/'+ event.id;
		var title = event.event_name;
		return(
			<div class="body">
				<div className={this.state.socialIconClass}>
					<div className="row">
						<div className="col-md-2 sol-sm-2 socialIcons">
							<FacebookShareButton
									url={shareUrl}
									quote={title}>
									<FacebookIcon
									size={40}
									round />
							</FacebookShareButton>
						</div>
						<div className="col-md-2 sol-sm-2 socialIcons">
							<TwitterShareButton
									url={shareUrl}
									quote={title}>
									<TwitterIcon
									size={40}
									round />
							</TwitterShareButton>
						</div>
						<div className="col-md-2 sol-sm-2 socialIcons">
							<WhatsappShareButton
									url={shareUrl}
									quote={title}>
									<WhatsappIcon
									size={40}
									round />
							</WhatsappShareButton>
						</div>
						<div className="col-md-2 sol-sm-2 socialIcons">
							<LinkedinShareButton
									url={shareUrl}
									quote={title}>
									<LinkedinIcon
									size={40}
									round />
							</LinkedinShareButton>
						</div>
						<div className="col-md-2 sol-sm-2 socialIcons"></div>
						<div className="col-md-2 sol-sm-2 socialIcons" onClick={()=>this.hideSocialDiv()}><SvgMaterialIcons/></div>
					</div>
				</div>
	            <div className="row head1">
	            	<div className="col-md-1"></div>
	            	<div className="col-md-2 headimg">
	            		<img className="mainImg" src={event.main_image} alt="ExpoImg" />
	            	</div>
	            	<div className="col-md-8 headcontent">
	            		<p className="basetxtColor">
	            			{eventTags.map((m1) => {return <button className='bodytags'>{m1}</button>})}
	            		</p>
		            	<h3 className="basetxtColor">{event.event_name}</h3>
		            	<p className="basetxtColor">{event.start_date}</p>
		            	<p className="basetxtColor">{this.state.eventCity}</p>
	            	</div>
	            	<div className="col-md-1"></div>
	            </div>

	            <div className="row featuredRow">
            		<div class="col-md-2"></div>

            		<div class="col-md-8 booth">
						<button class="btn" className="fbtns" onClick={()=>this.ongoingCount(event.id)}>Going</button>
						<button class="btn" className="fbtns1">Discussion</button>
						<button class="btn" className="fbtns1" onClick={()=>this.showSocialDiv()}>Share & Invite</button>
					</div>
		        	<div class="col-md-2 interested">
		        		<label className="fbtns2">Interested <span className="goingCount">{event.going_count}</span> </label>
		        	</div>
	            </div>

	            <div className="row mainRow">
		        	<div class="col-md-2">
		        		<div className="beta">
		        			<h6 className="colHeadings">More events in {this.state.eventCity}</h6>
		        			{moreEvents}
							<br/>	
						</div>
		        	</div>
		        	
		        	<div class="col-md-8">
		        		<div class="row one">
		        			
		        			<div class={abuotbtncls}>
		        				<a className="sbtns" onClick={()=>this.selectContent('about')} >About</a>
		        			</div>
		        			<div className={revBtnCls}>
		        				<a onClick={()=>this.selectContent('reviews')} className="sbtns" >Reviews</a>
		        			</div>
		        			<div className={exibBtnCls}>
		        				<a onClick={()=>this.selectContent('exibitors')} className="sbtns">Exibitors</a>
		        			</div>
							<div className={imgsBtnCls}>
		        				<a onClick={()=>this.selectContent('photos')} className="sbtns" >Photos</a>
		        			</div>
		        			<div className={spkrBtnCls}>
		        				<a onClick={()=>this.selectContent('speakers')} className="sbtns">Speakers</a>
		        			</div>
		  				</div>

						<div class="row two">
							{descBody}
						</div>
					</div>
					<div class="col-md-2">
		        			<div className="alpha">
		        				<h6 className="colHeadings">Related Events</h6>
			        			{similarEvents1}
							</div>
		        			<br/>
		        			
							<div className="gamma">
								<h6 className="colHeadings">Google Adds</h6>
								<br/>
								
								<p className="primaryColor">Eventesy-Connecting Oppertunities</p>
							</div>
					</div>
				</div>
		        
		    </div>
		)
	}

 	render() {
 		var resultedBody = '';
 		if(this.state.eventDeatail !== '' && this.state.eventTags.length > 0 && this.state.allTags.length > 0 && this.state.relatedEvents.length > 0 && this.state.moreventsinCity.length > 0 ){
 			resultedBody = this.makeBody(this.state.eventDeatail,this.state.eventTags,this.state.relatedEvents,this.state.moreventsinCity);
 		}
    	return (

        	<div class='body'>
        		{resultedBody}
        		<Footer/>
        	</div>	

	    )

    }
    
}

function SvgMaterialIcons() {
	const classes = useStyles();
  
	return (
	  	<Grid container className={classes.root}>
			<Grid>
				<DeleteIcon className="cross" fontSize="large"/>
			</Grid>
		</Grid>
	)
}
export default withRouter(Details);