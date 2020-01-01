import React, { Component } from 'react';
import './Home.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'; //adding import statement
import { SocialIcon } from 'react-social-icons';
import { Link } from 'react-router-dom';
import Footer from "./footerComponent";

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
			cityId:'',
			CategoryId:'',
			search:'',
		} 
		//this.searchEvent = this.searchEvent.bind(this);
	}

	componentDidMount(){
		
		let one ="http://64.225.33.244:8000/event/allEvents/";
		let two ="http://64.225.33.244:8000/event/allCities/";
		let three ="http://64.225.33.244:8000/event/allTypes/";
		let four ="http://64.225.33.244:8000/event/allTags/";

		const requestOne = axios.get(one);
		const requestTwo = axios.get(two);
		const requestThree = axios.get(three);
		const requestFour = axios.get(four);

		axios.all([requestOne, requestTwo, requestThree, requestFour]).then(axios.spread((...responses) => {
			// console.log('here i am');
			// console.log(responses);
			

			const responseOne = responses[0];
			const responseTwo = responses[1];
			const responseThree = responses[2];
			const responseFour = responses[3];
			this.setState({
				events:responseOne.data.results,
				cities:responseTwo.data,
				types:responseThree.data,
				tags:responseFour.data,
			})
})).catch(errors => {
			  console.log(errors);
		})
	}


	getEventByCity(id){
		var url = 'http://64.225.33.244:8000/event/allEvents/?event_city='+id;
		let tagslist = this.state.checkBoxStatus;
		if(tagslist.length > 0){
			for(var i = 0 ; i < tagslist.length; i++){
				url = url+'&event_tag=' + tagslist[i];
	        }
		}
		let eventCategory = this.state.CategoryId;
		if(eventCategory != ''){
			url = url+'&event_type=' + eventCategory;
		}
		
		axios.get(url)
		.then(response => {
			
			this.setState({
				events:response.data.results
			})
		})
		.catch(error =>{
			console.log(error);
		})
	}
	getEventByCategory(id){
		var url='http://64.225.33.244:8000/event/allEvents/?event_type='+id;
		
		let eventCity=this.state.cityId;
		if(eventCity != ''){
			url=url + '&event_city=' + eventCity;
		}
		
		let tagslist = this.state.checkBoxStatus;
		if(tagslist.length > 0){
			for(var i=0; i < tagslist.length; i++){
				url = url + '&event_tag=' + tagslist[i]; 
			}
		}
		axios.get(url)
		.then(response => {
			this.setState({
				events:response.data.results
			})
		})
		.catch(error =>{
			console.log(error);
		})
	}
	
	
	getEventByTag(event,id){
		var tagslist = this.state.checkBoxStatus;
		if(event.target.checked == true){
			tagslist.push(id);
		}else if(event.target.checked == false){
			tagslist = tagslist.filter((arrId) => arrId !== id)
		}
		this.setState({
			checkBoxStatus:tagslist,	
		})

		var url = 'http://64.225.33.244:8000/event/allEvents';

		
		if(tagslist.length > 0){
			var url = 'http://64.225.33.244:8000/event/allEvents/?event_tag='+tagslist[0];
		}
		for(var i = 1 ; i < tagslist.length; i++){
			url = url+'&event_tag=' + tagslist[i];
        }
        
        let eventCity=this.state.cityId;
        if(eventCity != ''){
			url=url + '&event_city=' + eventCity;
		}
		
		let eventCategory = this.state.CategoryId;
		if(eventCategory != ''){
			url = url+'&event_type=' + eventCategory;
		}
        axios.get(url)
		.then((response) => {
			console.log(response.data.results.length);
	        this.setState({
	        	events : response.data.results
	        })
		})
		.catch(error =>{
			console.log(error);
		})
	}

	eventsList(event){  		
		return(
			<div key={event.id} class="structure col-md-4">
				<Link to={{pathname: "/details/"+event.id}}>
					<div class="card structure">
		                <img class="card-img-top" className="cardImg" src={event.main_image} alt="ExpoImg" />
		                <div class="card-body perfumesDetails">
		                  <b class="card-title t1 primaryColor">  {((event.event_name).length > 30) ? 
	   						 (((event.event_name).substring(0,33-3)) + '...') : 
	    					event.event_name } </b>
		                  <p class="card-text t2 primaryColor"> {((event.event_address).length > 30) ? 
	   						 (((event.event_address).substring(0,33-3)) + '...') : 
	    					event.event_address } </p>
		                </div> 
		            </div>
		        </Link>
			</div>
		)
	}

	citiesList(cities){
		return(
				<div key= {cities.id} class="col-md-2">
					<a className="links" onClick={() => this.getEventByCity(cities.id)}> <span className="listColor">{cities.name}</span></a><br/>
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
		return(
				<div key= {categories.id} class="col-md-2">
					<a className="links" onClick={()=>this.getEventByCategory(categories.id)}><span className="listColor">{categories.name}</span></a><br/>
				</div>
		)
	}

	searchFieldChange(event){
		if(event.target.value == ''){
			this.searchEvent(event)
		}
		this.setState({
			search : event.target.value
		})
	}

	searchEvent(event){
		var url = 'http://64.225.33.244:8000/event/allEvents/?search='+this.state.search;
		axios.get(url)
		.then(response => {
			this.setState({
				events:response.data.results
			})
		})
		.catch(error =>{
			console.log(error);
		})
		event.preventDefault();
	}
	render() {
		var noData = <h1 className='noData'>Sorry No Data</h1>
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
        	<div class="body">

	            <div className="row head1 primaryBackground">		
	            	<div className="col-md-3"></div>
	            	<div className="first col-md-6">
		            	<h3 className="main">Event<span style={{color:'#ffa257'}}>esy</span></h3>
		            	<p id="one">Find interesting shows & conferences to attend</p>
		            	<input type="text" className="sbar primaryColor" value={this.state.search} placeholder="Search by: City, Industry or event name " name="search" onChange={(e)=>this.searchFieldChange(e)} onKeyPress={(e) => { if(e.key === 'Enter'){this.searchEvent(e)}}} />
	      				<button className="newBtn" class="button newBtn" onClick={(e)=>this.searchEvent(e)}><span style={{color:'white'}}>Search</span></button>
	            	</div>
	            	<div className="col-md-3"></div>
	            </div>




	            <div className="row featuredRow">
            		<div class="col-md-2 "></div>

            		<div class="col-md-8">
		        		<h6>Featured Events <span class="featured">handpicked and popular events to go</span></h6>
		        	</div>
		        	<div class="ff col-md-2">
						
					</div>
				</div>




				<div className="dataRow">
	            	<div className="row">
			        	<div class="col-md-2">
			        		<div className="tagsFilter">
									<h6 className="headingsAlign">Event Tags</h6>
								 	{tagsArr}
								</div>
			        	</div>

			        	<div class="col-md-8">
			        		<div class="row events">
								{resultedDiv.length > 0 ? resultedDiv : noData}
			        		</div>
			        	</div>

			        	<div class="col-md-2">
			        			<div className="citiesFilter">
				        			<h6 className="headingsAlign">Popular cities</h6>
									{citiesArr}
			        			</div>
			        			<br/>

			        			<div className="categoryFilter">
			        				<h6 className="headingsAlign">Event Category</h6>
									{categoriesArr}<br/>	
								</div>
								<br/>
								<div className="addsHome">
									<h6 className="headingsAlign">Google Adds</h6>
									<br/>
									<br/>
									<p className="primaryColor">Eventesy-Connecting Oppertunities</p>
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