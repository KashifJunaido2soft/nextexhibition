import React,{ Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/footerComponent";
import Details from "./components/detailsComponent";   


class App extends Component {
  render (){
  return (
 
   <Router>
        <div className="container1">
          <Route path="/" exact component={Home} />
          <Route path="/details/:id" component={Details} />
          
         </div>
    </Router>
  );
}
}

export default App;
