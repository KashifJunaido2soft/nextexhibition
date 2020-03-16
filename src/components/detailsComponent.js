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
import ClockIcon from '@material-ui/icons/AccessTime';
import Location from '@material-ui/icons/LocationCity';
import { makeStyles } from '@material-ui/core/styles';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
//------------------imports for react custom share------------------
import { css } from 'emotion';
// import icons
import { FaTwitter } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
// import react-custom-share components
import { ShareButtonCircle , ShareBlockStandard } from 'react-custom-share';

const FbShareComponent = props => {
	// create object with props for shareBlock
	const shareBlockProps = {
	  url: props.url,
	  button: ShareButtonCircle,
	  buttons: [
		{ network: 'Facebook', icon: FaFacebook },
	  ],
	  text: props.title,
	  longtext: props.subTitle,
	};
	
	return <ShareBlockStandard {...shareBlockProps} />;
};

const LinkdInShareComponent = props => {
	// create object with props for shareBlock
	const shareBlockProps = {
	  url: props.url,
	  button: ShareButtonCircle,
	  buttons: [
		{ network: 'Linkedin', icon: FaLinkedin },
	  ],
	  text: props.title,
	  longtext: props.subTitle,
	};
	return <ShareBlockStandard {...shareBlockProps} />;
};

const TwtrShareComponent = props => {
	// create object with props for shareBlock
	const shareBlockProps = {
	  url: props.url,
	  button: ShareButtonCircle,
	  buttons: [
		{ network: "Twitter", icon: FaTwitter },
	  ],
	  text: props.title,
	  longtext: props.subTitle,
	};
	return <ShareBlockStandard {...shareBlockProps} />;
};
//------------------imports for react custom share ends here------------------
const useStyles = makeStyles(theme => ({
	root: {
		color: '#ffffff',
		height: 48,
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
			// apiBaseUrl : 'http://192.168.0.115:8000/',
			// baseUrl : 'http://192.168.0.102:8080/',
			// baseLink : 'http://192.168.0.102:8080/',
			apiBaseUrl : 'http://64.225.33.244:8000/',
			baseUrl : 'http://64.225.33.244:3000/',
			baseLink : 'http://www.nextexibition.com/',
			loading : true,
			bodyClass : 'show',
			imageSlider : 'hideImageSlider',
			clickableStatus : 'col-md-8 booth disabledClick',
			homeBtnClassStatus : 'col-md-2 booth disabledClick',
			authKey : "Api-Key Ex4rWZES.i2w8aTuvjPmK6DYh6TUJCc5jkdmpYpYE"
		}
	}
	componentDidMount(){
		window.scrollTo(0, 0);
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
		const id = this.props.match.params.id;
		let eventUrl = this.state.apiBaseUrl + 'event/eventListWithImages/?id='+id;
		let cityUrl = this.state.apiBaseUrl + "event/allCities/";
		let tagsUrl = this.state.apiBaseUrl + "event/allTags/";
		
		const cityDataReq = axios.get(cityUrl,{ 'headers': { 'Authorization': this.state.authKey } });
		const tagsDataReq = axios.get(tagsUrl,{ 'headers': { 'Authorization': this.state.authKey } });
		const eventDataReq = axios.get(eventUrl,{ 'headers': { 'Authorization': this.state.authKey } });

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
				allCities : cityDataRes,
				loading : false,
				clickableStatus : 'col-md-8 booth enabledClick',
				homeBtnClassStatus : 'col-md-2 booth enabledClick',
			})
			axios.get(this.state.apiBaseUrl + 'event/allEvents?event_type=' + eventDataRes.event_type, { 'headers': { 'Authorization': this.state.authKey } })
	        .then(response => {
	            this.setState({relatedEvents : response.data.results});
	        })
	        .catch(function (error){
	            console.log(error);
	        })

	        axios.get(this.state.apiBaseUrl + 'event/allEvents?event_city=' + eventDataRes.event_city , { 'headers': { 'Authorization': this.state.authKey } })
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
		window.scrollTo(0, 0);
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
		this.setState({loading : true})
		let url = this.state.apiBaseUrl + 'event/eventListWithImages/?id=' + id;
		axios.get(url,{ 'headers': { 'Authorization': this.state.authKey } })
		.then(response => {
			const cityDataRes = this.state.allCities;
			const tagsDataRes = this.state.allTags;
			const eventDataRes = response.data.results[0];

			let totalTagslen = tagsDataRes.length;
			let eventTagslen = eventDataRes.event_tag.length;
			let allCitieslen = cityDataRes.length;
			let thisEventCity = this.state.eventCity;
			let oldCityid = this.state.eventDeatail.event_city;
			if(eventDataRes.event_city !== oldCityid){
				for(let i = 0; i < allCitieslen; i++){
					let target = eventDataRes.event_city;
					if(target === cityDataRes[i].id){
						thisEventCity = cityDataRes[i].name
						break;
					}
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
				eventTags : thisEventTags,
				eventCity : thisEventCity,
				loading : false
			})
			axios.get(this.state.apiBaseUrl + 'event/allEvents?event_type=' + eventDataRes.event_type , { 'headers': { 'Authorization': this.state.authKey } })
	        .then(response => {
	            this.setState({relatedEvents : response.data.results});
	        })
	        .catch(function (error){
	            console.log(error);
	        })
			if(eventDataRes.event_city !== oldCityid){
				axios.get(this.state.apiBaseUrl + 'event/allEvents?event_city=' + eventDataRes.event_city , { 'headers': { 'Authorization': this.state.authKey } })
				.then(response => {
					this.setState({moreventsinCity : response.data.results});
				})
				.catch(function (error){
					console.log(error);
				})
			}
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
		axios.post(this.state.apiBaseUrl + 'event/postGoingCount', data,{ 'headers': { 'Authorization': this.state.authKey } })
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
		this.setState({
			socialIconClass : 'socialIconsDivShow',
			bodyClass : 'hide'
		});
	}

	hideSocialDiv(){
		this.setState({
			socialIconClass : 'socialIconsDivHide',
			bodyClass : 'show'
		});
	}

	showSlider(){
		this.setState({
			imageSlider : 'showImageSlider',
			bodyClass : 'hide'
		});
	}

	hideSlider(){
		if(this.state.imageSlider === 'showImageSlider'){
			this.setState({
				imageSlider : 'hideImageSlider',
				bodyClass : 'show'
			});
		}
	}

	makeHeader(event, eventTags){
		let month_names =["Jan","Feb","Mar",
		"Apr","May","Jun",
		"Jul","Aug","Sep",
		"Oct","Nov","Dec"];
		let dateArr = event.start_date.split("-");
		let year = dateArr[0];
		let month = month_names[parseInt(dateArr[1])-1];
		let day = dateArr[2];

		let endDateArr = event.end_date.split("-");
		let endingYear = endDateArr[0];
		let endingMonth = month_names[parseInt(endDateArr[1])-1];
		let endingDay = endDateArr[2];
		return(
			<div className="row">
				<div className="col-md-2">
					<img className="mainImg" src={event.main_image} alt="ExpoImg" onClick={()=>this.showSlider()}/>
				</div>
				<div className="col-md-9 headcontent">
					{eventTags.map((m1) => {return <span className='bodytags'>{m1}</span>})}
					<h3 className="basetxtColor">{event.event_name}</h3>
					<div className="row">
						<div className="col-md-1"><SvgClockIcon/></div>
						<div className="col-md-6"><p className="basetxtColor">{month+" "+day+" "+year} - {endingMonth+" "+endingDay+" "+endingYear}</p></div>
						<div className="col-md-5"></div>
					</div>
					<div className="row">
						<div className="col-md-1"><LocationIcon/></div>
						<div className="col-md-6"><p className="basetxtColor">{event.event_address}</p></div>
						<div className="col-md-5"></div>
					</div>
				</div>
			</div>
		)
	}

	makeBody(event){
		var descBody = '';
	
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
			let resultedDataArr = event.event_description.split("\\n");
			descBody = <div class="event_desc_container">
				{resultedDataArr.map((para)=>{return <p className="primaryColor">{para}</p>})}
			</div>
		}
		else if(this.state.Reviews === '1'){
			abuotbtncls = 'selectionBtn';
			revBtnCls = 'selectionBtn clrBrdr';
			exibBtnCls = 'selectionBtn';
			imgsBtnCls = 'selectionBtn';
			spkrBtnCls = 'selectionBtn';
			descBody = <p className="primaryColor eventData">
				
			</p>;
		}
		else if(this.state.Exibitors  === '1'){
			abuotbtncls = 'selectionBtn';
			revBtnCls = 'selectionBtn';
			exibBtnCls = 'selectionBtn clrBrdr';
			imgsBtnCls = 'selectionBtn';
			spkrBtnCls = 'selectionBtn';
			descBody = <p className="primaryColor eventData">
			</p>;
			
		}
		else if(this.state.Photos  === '1'){
			abuotbtncls = 'selectionBtn';
			revBtnCls = 'selectionBtn';
			exibBtnCls = 'selectionBtn';
			imgsBtnCls = 'selectionBtn clrBrdr';
			spkrBtnCls = 'selectionBtn';
			descBody =  <div className="imagesContainer">
							{event.additional_images.map((imgObj) => {return <img class="img-responsive extraImgs" src={imgObj.image} alt="img" onClick={()=>this.showSlider()}/>})}
						</div>;
			
		}
		else if(this.state.Speakers  === '1'){
			abuotbtncls = 'selectionBtn';
			revBtnCls = 'selectionBtn';
			exibBtnCls = 'selectionBtn';
			imgsBtnCls = 'selectionBtn';
			spkrBtnCls = 'selectionBtn clrBrdr';
			descBody = <p className="primaryColor eventData">
			</p>;
		}
		return(
			<div>
				<div class="row typeHeadings">
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

				<div class="row typeDetails">
					{descBody}
				</div>
			</div>
		)
	}

	moreEventsInThisCity(moreventsinCity){
		var moreEvents = '';
		moreEvents = moreventsinCity.map((eventobj, index) => {
			let month_names =["Jan","Feb","Mar",
			"Apr","May","Jun",
			"Jul","Aug","Sep",
			"Oct","Nov","Dec"];
			let dateArr = eventobj.start_date.split("-");
			let year = dateArr[0];
			let month = month_names[1];
			let day = dateArr[2];
			if(index < 5){
				return (
					<tr>
						<Link to={{pathname: "/details/"+eventobj
						.id}}>
						<td className="primaryColor eventDate">
							{month+" "+day+" "+year}
						</td>
						<td onClick={()=>this.getEventDetailsByName(eventobj.id)} >
							<span className="eventName">{eventobj.event_name}</span>
							<br/>
							<b className="primaryColor">{this.state.eventCity}</b>
						</td>
						</Link>
					</tr>
				)
			}
		})
		return(
			<table class="table table-striped">
				<tbody>
					{moreEvents}
				</tbody>
			</table>	
		)
	}

	moreRelatedEvents(relatedevents){
		var similarEvents = '';
		similarEvents = relatedevents.map((eventobj, index) => {
			let month_names =["Jan","Feb","Mar",
			"Apr","May","Jun",
			"Jul","Aug","Sep",
			"Oct","Nov","Dec"];
			let dateArr = eventobj.start_date.split("-");
			let year = dateArr[0];
			let month = month_names[1];
			let day = dateArr[2];
			if(index < 5){
				return ( 
					<tr>
						<Link to={{pathname: "/details/"+eventobj
							.id}}>
						<td className="primaryColor eventDate">
							{month+" "+day+" "+year}
						</td>
						<td onClick={()=>this.getEventDetailsByName(eventobj.id)}>
							<span className="eventName">{eventobj.event_name}</span>
							<br/>
							<b className="primaryColor">{this.state.allCities.map((evnt) => {if(eventobj.event_city === evnt.id){return evnt.name}})}</b>
						</td>
						</Link>
					</tr>
				)
			}
		})
		return(
			<table class="table table-striped">
				<tbody>
					{similarEvents}
				</tbody>
			</table>	
		)
	}

 	render() {
		 var resultedBody = '';
		 var detailHeader = '';
		 var dataLoader = <div className='loaderComponent'>
			 <Loader
				type="Oval"
				color="#ffa257"
				height={100}
				width={100}
				className='loading'
				timeout={3000} //time in millisecond
			/>
		</div>
		var shareUrl = "";
		var title = "";
		var subTitle = "";
		var sliderCarousel = "";
 		if(this.state.eventDeatail !== ''  && this.state.eventTags.length > 0){
			shareUrl = this.state.baseLink + 'details/'+ this.state.eventDeatail.id;
			title = this.state.eventDeatail.event_name;
			if(this.state.eventDeatail.event_description.length > 100){
				subTitle = this.state.eventDeatail.event_description.substring(0,100);
			}else{
				subTitle = this.state.eventDeatail.event_description;
			}
			resultedBody = this.makeBody(this.state.eventDeatail);
			sliderCarousel = <div className={this.state.imageSlider}>
				<Carousel showArrows={true} showThumbs={false} autoPlay={true} interval={3000} infiniteLoop={true}>
					<div carouselImage><img className="carouselImage" src={this.state.eventDeatail.main_image} alt="img"/></div>
					{this.state.eventDeatail.additional_images.map((imgObj) => {return <div carouselImage><img className="carouselImage" src={imgObj.image} alt="img"/></div>})}
				</Carousel>
			</div>
			detailHeader = this.makeHeader(this.state.eventDeatail,this.state.eventTags);
		}
		var eventsInCity = [];
    	if(this.state.moreventsinCity.length > 0){
			eventsInCity.push(this.moreEventsInThisCity(this.state.moreventsinCity))
		}
		var relatedEvents = [];
    	if(this.state.relatedEvents.length > 0 > 0){
			relatedEvents.push(this.moreRelatedEvents(this.state.relatedEvents))
    	}
    	return (
			<div class="body">
				<div className={this.state.socialIconClass}>
					<div className="inviteText">Events are better when your friends are there too.
						So, who's coming with you?<br/><br/>
						Invite via
					</div>
					<div className="row">
						<div className="col-md-1 col-sm-1 socialIcons"></div>
						<div className="col-md-2 col-sm-2 socialIcons1">
							<WhatsappShareButton
									url={shareUrl}
									quote={title}>
									<WhatsappIcon
									size={45}
									round />
							</WhatsappShareButton>
						</div>
						<div className="col-md-2 col-sm-2 socialIcons">
							<FbShareComponent url={shareUrl} title={title} subTitle={subTitle}/>
						</div>
						<div className="col-md-2 col-sm-2 socialIcons">
							<LinkdInShareComponent url={shareUrl} title={title} subTitle={subTitle}/>
						</div>
						<div className="col-md-2 col-sm-6 socialIcons">
							<TwtrShareComponent url={shareUrl} title={title} subTitle={subTitle}/>
						</div>
						<div className="col-md-1 col-sm-1 socialIcons"></div>
						<div className="col-md-2 col-sm-2 socialIcons1" onClick={()=>this.hideSocialDiv()}><SvgMaterialIcons/></div>
					</div>
				</div>
					{sliderCarousel}
				<div class={this.state.bodyClass} onClick={()=>this.hideSlider()}>
					<div className="head1">
						{detailHeader}
					</div>
					<div className="row featuredRow">
						<div className={this.state.homeBtnClassStatus}>
							<Link to={{pathname: "/"}}>
								<img className="homeBtn" src={require('../assets/images/logo.png')} alt="home"/>
							</Link>
						</div>
						<div className={this.state.clickableStatus}>
							<button class="btn" className="fbtns" onClick={()=>this.ongoingCount(this.state.eventDeatail.id)}>Going</button>
							<button class="btn" className="fbtns1">Discussion</button>
							<button class="btn" className="fbtns3" onClick={()=>this.showSocialDiv()}>Share & Invite</button>
						</div>
						<div class="col-md-2 interested">
							<label className="fbtns2">Interested <span className="goingCount">{this.state.eventDeatail.going_count}</span> </label>
						</div>
					</div>
					<div className="row mainRow">
						<div class="col-md-2">
							<div className="cityEvents">
								<h6 className="colHeadings">More events in {this.state.eventCity}</h6>
								{eventsInCity}
								<br/>
							</div>
						</div>
						
						<div class="col-md-8">
							<div className="mainData">
								{this.state.loading ? (dataLoader) : (resultedBody) }
							</div>
						</div>
						<div class="col-md-2">
							<div className="relatedEvents">
								<h6 className="colHeadings">Related Events</h6>
								{relatedEvents}
							</div>
							<br/>
							
							<div className="ads">
								<h6 className="colHeadings">Google Ads</h6>
								<br/>
								<p className="primaryColor">NextExibition Connecting Oppertunities</p>
							</div>
						</div>
					</div>
					<Footer/>
				</div>	
			</div>
	    )
    }
}

function SvgMaterialIcons() {
	return (
	  	<Grid container>
			<Grid>
				<DeleteIcon className="cross" fontSize="large"/>
			</Grid>
		</Grid>
	)
}

function SvgClockIcon() {
	const classes = useStyles();
	return (
	  	<Grid container className={classes.root}>
			<Grid>
				<ClockIcon />
			</Grid>
		</Grid>
	)
}

function LocationIcon() {
	const classes = useStyles();
	return (
	  	<Grid container className={classes.root}>
			<Grid>
				<Location />
			</Grid>
		</Grid>
	)
}


export default withRouter(Details);