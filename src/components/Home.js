import React, { Component } from 'react';
import '../assets/css/Home.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'; //adding import statement
import { Link } from 'react-router-dom';
import Footer from "./footerComponent";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import Grid from '@material-ui/core/Grid';
import Next from '@material-ui/icons/SkipNext';
import Previous from '@material-ui/icons/SkipPrevious';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		color: '#ffa257',
		width: 60,
		height : 60,
	  },
}));

function NextIcon() {
	const classes = useStyles();
	return (
	  	<Grid container>
			<Grid>
				<Next className={classes.root}/>
			</Grid>
		</Grid>
	)
}

function PreviousIcon() {
	const classes = useStyles();
	return (
	  	<Grid container>
			<Grid>
				<Previous className={classes.root}/>
			</Grid>
		</Grid>
	)
}

export default class Home extends Component {
	constructor(props){
		super(props);
		this.state={
			events:[],
			cities:[],
			types:[],
			tags:[],
			tagsFltrsEvents : [],
			checkBoxStatus:[],
			cityId:0,
			CategoryId:0,
			search:'',
			apiBaseUrl : 'http://64.225.33.244:8000/',
			baseUrl : 'http://64.225.33.244:3000/',
			baseLink : 'http://www.nextexibition.com/',
			// apiBaseUrl : 'http://192.168.0.115:8000/',
			// baseUrl : 'http://192.168.0.102:8080/',
			// baseLink : 'http://192.168.0.102:8080/',
			loading : true,
			nextLink : null,
			prevLink : null,
			prevBtnClass : 'noLink',
			nextBtnClass : 'noLink',
			authKey : "Api-Key Ex4rWZES.i2w8aTuvjPmK6DYh6TUJCc5jkdmpYpYE"
		} 
		//this.searchEvent = this.searchEvent.bind(this);
	}
	componentDidMount(){
		window.scrollTo(0, 0);
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
		let one = this.state.apiBaseUrl + "event/allEvents/";
		let two = this.state.apiBaseUrl + "event/allCities/";
		let three = this.state.apiBaseUrl + "event/allTypes/";
		let four = this.state.apiBaseUrl + "event/allTags/";

		const requestOne = axios.get(one,{ 'headers': { 'Authorization': this.state.authKey } });
		const requestTwo = axios.get(two,{ 'headers': { 'Authorization': this.state.authKey } });
		const requestThree = axios.get(three,{ 'headers': { 'Authorization': this.state.authKey } });
		const requestFour = axios.get(four,{ 'headers': { 'Authorization': this.state.authKey } });

		axios.all([requestOne, requestTwo, requestThree, requestFour]).then(axios.spread((...responses) => {
			const responseOne = responses[0];
			const responseTwo = responses[1];
			const responseThree = responses[2];
			const responseFour = responses[3];
			let nextClass = '';
			let preClass = '';
			if(responseOne.data.next !== null){
				nextClass = 'newLink'
			}else{
				nextClass = 'noLink'
			}
			if(responseOne.data.previous !== null){
				preClass = 'newLink'
			}else{
				preClass = 'noLink'
			}
			this.setState({
				events:responseOne.data.results,
				cities:responseTwo.data,
				types:responseThree.data,
				tags:responseFour.data,
				nextLink : responseOne.data.next,
				prevLink : responseOne.data.previous,
				nextBtnClass : nextClass,
				prevBtnClass : preClass,
				loading : false,
			})
		})).catch(errors => {
				console.log(errors);
			})
		}


	getEventByCity(id){
		this.setState({
			loading : true
		})
		window.scrollTo(0, 0);
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
		let url = this.state.apiBaseUrl + 'event/allEvents/'
		if(id !== 0){
			url = this.state.apiBaseUrl + 'event/allEvents/?event_city='+id;
		}

		let tagslist = this.state.checkBoxStatus;
		if(tagslist.length > 0){
			if (url.indexOf('?') > -1)
			{
				for(let i = 0 ; i < tagslist.length; i++){
					url = url+'&event_tag=' + tagslist[i];
				}
			}else{
				url = url + '?event_tag=' + tagslist[0];
				for(let i = 1 ; i < tagslist.length; i++){
					url = url + '&event_tag=' + tagslist[i];
				}
			}
		}

		let eventCategory = this.state.CategoryId;
		if(eventCategory !== 0){
			if (url.indexOf('?') > -1)
			{
				url = url+'&event_type=' + eventCategory;
			}else{
				url = url+'?event_type=' + eventCategory;
			}	
		}
		
		axios.get(url,{ 'headers': { 'Authorization': this.state.authKey } })
		.then(response => {
			let nextClass = '';
			let preClass = '';
			if(response.data.next !== null){
				nextClass = 'newLink'
			}else{
				nextClass = 'noLink'
			}
			if(response.data.previous !== null){
				preClass = 'newLink'
			}else{
				preClass = 'noLink'
			}
			this.setState({
				events:response.data.results,
				nextLink : response.data.next,
				prevLink : response.data.previous,
				nextBtnClass : nextClass,
				prevBtnClass : preClass,
				loading : false,
				cityId : id,
			})
		})
		.catch(error =>{
			console.log(error);
		})
	}

	getEventByCategory(id){
		this.setState({
			loading : true
		})
		window.scrollTo(0, 0);
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
		let url = this.state.apiBaseUrl + 'event/allEvents/'
		if(id !== 0){
			url = this.state.apiBaseUrl + 'event/allEvents/?event_type='+id;
		}
		let eventCity=this.state.cityId;
		if(eventCity !== 0){
			if (url.indexOf('?') > -1)
			{
				url=url + '&event_city=' + eventCity;
			}else{
				url=url + '?event_city=' + eventCity;
			}
		}
		
		let tagslist = this.state.checkBoxStatus;
		if(tagslist.length > 0){
			if (url.indexOf('?') > -1)
			{
				for(let i = 0 ; i < tagslist.length; i++){
					url = url+'&event_tag=' + tagslist[i];
				}
			}else{
				url = url + '?event_tag=' + tagslist[0];
				for(let i = 1 ; i < tagslist.length; i++){
					url = url + '&event_tag=' + tagslist[i];
				}
			}
		}
		axios.get(url,{ 'headers': { 'Authorization': this.state.authKey } })
		.then(response => {
			let nextClass = '';
			let preClass = '';
			if(response.data.next !== null){
				nextClass = 'newLink'
			}else{
				nextClass = 'noLink'
			}
			if(response.data.previous !== null){
				preClass = 'newLink'
			}else{
				preClass = 'noLink'
			}
			this.setState({
				events:response.data.results,
				nextLink : response.data.next,
				prevLink : response.data.previous,
				nextBtnClass : nextClass,
				prevBtnClass : preClass,
				loading : false,
				CategoryId : id
			})
		})
		.catch(error =>{
			console.log(error);
		})
	}
	
	
	getEventByTag(event,id){
		this.setState({
			loading : true
		})
		window.scrollTo(0, 0);
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
		var tagslist = this.state.checkBoxStatus;
		if(event.target.checked === true){
			tagslist.push(id);
		}else if(event.target.checked === false){
			tagslist = tagslist.filter((arrId) => arrId !== id)
		}
		var url = this.state.apiBaseUrl + 'event/allEvents';
		if(tagslist.length > 0){
			url = this.state.apiBaseUrl + 'event/allEvents/?event_tag='+tagslist[0];
			for(var i = 1 ; i < tagslist.length; i++){
				url = url+'&event_tag=' + tagslist[i];
			}
		}
        let eventCity=this.state.cityId;
        if(eventCity !== 0){
			if (url.indexOf('?') > -1)
			{
				url=url + '&event_city=' + eventCity;
			}else{
				url=url + '?event_city=' + eventCity;
			}
		}
		
		let eventCategory = this.state.CategoryId;
		if(eventCategory !== 0){
			if (url.indexOf('?') > -1)
			{
				url = url+'&event_type=' + eventCategory;
			}else{
				url = url+'?event_type=' + eventCategory;
			}
		}
        axios.get(url,{ 'headers': { 'Authorization': this.state.authKey } })
		.then((response) => {
			let nextClass = '';
			let preClass = '';
			if(response.data.next !== null){
				nextClass = 'newLink'
			}else{
				nextClass = 'noLink'
			}
			if(response.data.previous !== null){
				preClass = 'newLink'
			}else{
				preClass = 'noLink'
			}
			this.setState({
				events:response.data.results,
				nextLink : response.data.next,
				prevLink : response.data.previous,
				nextBtnClass : nextClass,
				prevBtnClass : preClass,
				loading : false,
				checkBoxStatus:tagslist
			})
		})
		.catch(error =>{
			console.log(error);
		})
	}

	nextEvents(){
		if(this.state.nextLink !== null){
			this.setState({
				loading : true
			})
			window.scrollTo(0, 0);
			window.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
			let url = this.state.nextLink
			axios.get(url,{ 'headers': { 'Authorization': this.state.authKey } })
			.then(response => {
				let nextClass = '';
				let preClass = '';
				if(response.data.next !== null){
					nextClass = 'newLink'
				}else{
					nextClass = 'noLink'
				}
				if(response.data.previous !== null){
					preClass = 'newLink'
				}else{
					preClass = 'noLink'
				}
				this.setState({
					events:response.data.results,
					nextLink : response.data.next,
					prevLink : response.data.previous,
					nextBtnClass : nextClass,
					prevBtnClass : preClass,
					loading : false,
				})
			})
			.catch(error =>{
				console.log(error);
			})
		}
	}

	prevEvents(){
		if(this.state.prevLink !== null){
			this.setState({
				loading : true
			})
			window.scrollTo(0, 0);
			window.scroll({
				top: 0,
				left: 0,
				behavior: 'smooth',
			});
			let url = this.state.prevLink
			axios.get(url,{ 'headers': { 'Authorization': this.state.authKey } })
			.then(response => {
				let nextClass = '';
				let preClass = '';
				if(response.data.next !== null){
					nextClass = 'newLink'
				}else{
					nextClass = 'noLink'
				}
				if(response.data.previous !== null){
					preClass = 'newLink'
				}else{
					preClass = 'noLink'
				}
				this.setState({
					events:response.data.results,
					nextLink : response.data.next,
					prevLink : response.data.previous,
					nextBtnClass : nextClass,
					prevBtnClass : preClass,
					loading : false,
				})
			})
			.catch(error =>{
				console.log(error);
			})
		}
	}

	eventsList(event){
		let month_names =["Jan","Feb","Mar",
		"Apr","May","Jun",
		"Jul","Aug","Sep",
		"Oct","Nov","Dec"];
		let dateArr = event.start_date.split("-");
		let year = dateArr[0];
		let month = month_names[parseInt(dateArr[1])-1];
		let day = dateArr[2];		
		return(
			<div key={event.id} className="col-md-4">
				<Link to={{pathname: "/details/"+event.id}}>
					<div className="card structure">
		                <img className="card-img-top cardImg" src={event.main_image} alt={event.event_name} />
		                <div className="card-body">
							<b className="card-title t1 primaryColor">  {((event.event_name).length > 20) ? 
								(((event.event_name).substring(0,20)) + '...') : 
								event.event_name } </b>
							<p className="card-text t2 primaryColor"> {((event.event_address).length > 20) ? 
								(((event.event_address).substring(0,20)) + '...') : 
								event.event_address } </p>
							<b className="card-title t1 primaryColor">  {month+" "+day+" "+year} </b>
		                </div> 
		            </div>
		        </Link>
			</div>
		)
	}

	citiesList(cities){
		const className = this.state.cityId === cities.id ? 'listColorActive' : 'listColor';
		return(
				<div key= {cities.id} className="col-md-2">
					<a className="links" onClick={() => this.getEventByCity(cities.id)}> <span className={className}>{cities.name}</span></a><br/>
				</div>
			)
	} 

	tagsList(tags){
		return(
				<div key= {tags.id} >
 					<label className="eventTag">
	 					<input type="checkbox" value="" onChange={(e)=>this.getEventByTag(e , tags.id)}/>
	 					<span className="eventTag2">{tags.name}</span> 
 					</label>
				</div>
		)
	}

	categoriesList(categories){
		const className = this.state.CategoryId === categories.id ? 'listColorActive' : 'listColor';
		return(
				<div key= {categories.id} className="col-md-2">
					<a className="links" onClick={()=>this.getEventByCategory(categories.id)}><span className={className}>{categories.name}</span></a><br/>
				</div>
		)
	}

	searchFieldChange(event){
		if(event.target.value === ''){
			this.searchEvent(event)
		}
		this.setState({
			search : event.target.value
		})
	}

	searchEvent(event){
		this.setState({
			loading : true
		})
		var url = this.state.apiBaseUrl + 'event/allEvents/?search='+this.state.search;
		axios.get(url,{ 'headers': { 'Authorization': this.state.authKey } })
		.then(response => {
			let nextClass = '';
			let preClass = '';
			if(response.data.next !== null){
				nextClass = 'newLink'
			}else{
				nextClass = 'noLink'
			}
			if(response.data.previous !== null){
				preClass = 'newLink'
			}else{
				preClass = 'noLink'
			}
			this.setState({
				events:response.data.results,
				nextLink : response.data.next,
				prevLink : response.data.previous,
				nextBtnClass : nextClass,
				prevBtnClass : preClass,
				loading : false,
			})
		})
		.catch(error =>{
			console.log(error);
		})
		event.preventDefault();
	}

	render() {
		var noData = <h1 className='noData'>Sorry No Data</h1>
		var dataLoader = <Loader
			type="Oval"
			color="#ffa257"
			height={100}
			width={100}
			className='noData'
			timeout={0} //time in millisecond
		/>
    	var resultedDiv = [];
    	if(this.state.events.length > 0){
    		
    		for(var i = 0 ; i < this.state.events.length ; i++){
    			resultedDiv.push(this.eventsList(this.state.events[i]))

    		}
    	}
    	var citiesArr = [];
    	if(this.state.cities.length > 0){
    		for(let i=0;i<this.state.cities.length;i++){
    			citiesArr.push(this.citiesList(this.state.cities[i]))
    		}
    	}
    	var tagsArr = [];
    	if(this.state.tags.length > 0){
    		for(let i=0;i<this.state.tags.length;i++){
    			tagsArr.push(this.tagsList(this.state.tags[i]))
    		}
    		
    	}
    	var categoriesArr = [];
    	if(this.state.types.length > 0){
    		for(let i=0;i<this.state.types.length;i++){
    			categoriesArr.push(this.categoriesList(this.state.types[i]))
    		}
    	}
        return (
        	<div >
				<div className="row homeHeader">
					<div className="col-md-3"></div>
					<div className="first col-md-6">
						<h2 className="main">Next<span style={{color:'#ffa257'}}>Exibition</span></h2>
						<p id="one">Find interesting shows & conferences to attend</p>
						<input type="text" className="sbar primaryColor" value={this.state.search} placeholder="Search by city category #tag or by name" name="search" onChange={(e)=>this.searchFieldChange(e)} onKeyPress={(e) => { if(e.key === 'Enter'){this.searchEvent(e)}}} />
						<button className="newBtn button" onClick={(e)=>this.searchEvent(e)}><span style={{color:'white'}}>Search</span></button>
					</div>
					<div className="col-md-3"></div>
				</div>
				<div className="body">
					<div className="row featuredRowHome">
						<div className="col-md-12 col-sm-12 col-lg-12">
							<h6>Featured Events <span className="featured">handpicked and popular events to go</span></h6>
						</div>
					</div>

					<div className="dataRowHome">
						<div className="row">
							<div className="col-md-2 col-sm-12 col-lg-2 ">
								<div className="tagsFilter">
									<h6 className="headingsAlign">Filters</h6>
									{tagsArr}
								</div>
							</div>

							<div className="col-md-8 col-sm-12 col-lg-8">
								<div className="row events">
									{this.state.loading ? (dataLoader) : (resultedDiv.length > 0 ? resultedDiv : noData) }
								</div>
								<div className="row">
									<div className="col-md-6 col-sm-6 previousBtn">
										<button className={this.state.prevBtnClass} disabled={this.state.loading} onClick={()=> this.prevEvents()}><PreviousIcon/></button>
									</div>
									<div className="col-md-6 col-sm-6 nextBtn">
										<button className={this.state.nextBtnClass} disabled={this.state.loading} onClick={()=> this.nextEvents()}><NextIcon/></button>
									</div>
								</div>
							</div>

							<div className="col-md-2 col-sm-12 col-lg-2">
								<div className="citiesFilter">
									<h6 className="headingsAlign">Cities</h6>
									<div className="col-md-2">
										<a className="links" onClick={() => this.getEventByCity(0)}> <span className="listColor">All</span></a><br/>
									</div>
									{citiesArr}
								</div>
								<br/>

								<div className="categoryFilter">
									<h6 className="headingsAlign">Categories</h6>
									<div className="col-md-2">
										<a className="links" onClick={() => this.getEventByCategory(0)}> <span className="listColor">All</span></a><br/>
									</div>
									{categoriesArr}<br/>	
								</div>
								<br/>
								<div className="addsHome">
									<h6 className="headingsAlign">Google Adds</h6>
									<br/>
									<br/>
									<div className="col-md-2">
										<p className="primaryColor">NextExibition Connecting Oppertunities</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
	            <div className="footerr">
	            	<Footer/>	
	            </div>
		    </div>	
	    )
    }
}