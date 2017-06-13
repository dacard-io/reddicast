import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PostBrowser from './PostBrowser';

export default class Navigation extends Component {
	// Lets create the state by initializing the constructor
	constructor(){
		super(); // Super is the context of the state in the component
		// Create the state
		this.state = {
			default_sub: 'worldnews',
			current_sub: 'worldnews',
			sub_list: ['Art',
			'AskHistorians',
			'AskReddit',
			'askscience',
			'aww',
			'bestof',
			'books',
			'comics',
			'Cooking',
			'dataisbeautiful',
			'DIY',
			'Documentaries',
			'economics',
			'explainlikeimfive',
			'Fitness',
			'food',
			'Frugal',
			'funny',
			'gadgets',
			'gaming',
			'GetMotivated',
			'gifs',
			'history',
			'IAmA',
			'InternetIsBeautiful',
			'Jokes',
			'LifeProTips',
			'listentothis',
			'mildlyinteresting',
			'movies',
			'Music',
			'news',
			'nottheonion',
			'oddlysatisfying',
			'OldSchoolCool',
			'OutOfTheLoop',
			'personalfinance',
			'philosophy',
			'photoshopbattles',
			'pics',
			'politics',
			'programming',
			'recipes',
			'science',
			'Showerthoughts',
			'space',
			'sports',
			'stocks',
			'Technology',
			'television',
			'tifu',
			'todayilearned',
			'UpliftingNews',
			'videos',
			'worldnews',
			'WritingPrompts']
		};

		// Line below fixes setState issue. View here https://github.com/goatslacker/alt/issues/283
		//this.onChange = this.onChange.bind(this)
	}

	componentWillUpdate() {
		// On state change, change page title in real time
		document.title = this.state.current_sub + " | Reddicast";
		console.log(document.title)
	}

	// When Nav rendered
	componentDidMount() {
		// Set page title
		document.title = this.state.current_sub + " | Reddicast";
		ReactDOM.render(<PostBrowser subreddit={this.state.current_sub}/>, document.getElementById('posts-browser'));
		ReactDOM.render(<div>{this.state.default_sub}</div>, document.getElementById('viewing-sub'));
	}


	handleClick(sub) {
		// Set state
		this.setState({ current_sub: sub });

		// Umount post browser currently loaded
		ReactDOM.unmountComponentAtNode(document.getElementById('posts-browser'));
		// Render new post browser
	    ReactDOM.render(<PostBrowser subreddit={this.state.current_sub}/>, document.getElementById('posts-browser'));
	    ReactDOM.render(<div>{this.state.current_sub}</div>, document.getElementById('viewing-sub'));
  	}

  	viewSub(sub) {
  		// If sub not empty, go to sub
  		if (sub != "") {
	  		this.setState({ current_sub: sub });
	  		// Umount post browser currently loaded
			ReactDOM.unmountComponentAtNode(document.getElementById('posts-browser'));
			// Render new post browser
		    ReactDOM.render(<PostBrowser subreddit={this.state.current_sub}/>, document.getElementById('posts-browser'));
		    ReactDOM.render(<div>{this.state.current_sub}</div>, document.getElementById('viewing-sub'));
  		} else {
  			// Go default sub set by app
  			this.setState({ current_sub: this.state.default_sub });
  			// Umount post browser currently loaded
			ReactDOM.unmountComponentAtNode(document.getElementById('posts-browser'));
			// Render new post browser
		    ReactDOM.render(<PostBrowser subreddit={this.state.default_sub}/>, document.getElementById('posts-browser'));
  		}
  		
  	}

  	// Render posts
    render() {
    	// Sub links var to hold the links
    	var sub_links = [];

    	// Add a seperate link for adding subreddits
    	//sub_links.push(<li key="add-sub"className="add-sub"><a href="#" onClick={this.addSub.bind(this)}><i className="fa fa-plus-circle"></i>&nbsp;&nbsp;Add Sub</a></li>);
    	sub_links.push(<li key="view-sub" className="add-sub"><i className="fa fa-search search-icon"></i><input type="search" onChange={event => this.viewSub(event.target.value)} placeholder="Enter Subreddit" /></li>);


    	// Loop to push posts in array to render
    	this.state.sub_list.map((sub, index) => {
    		sub_links.push(<li key={index}><a href="#" onClick={this.handleClick.bind(this, sub)}>{sub}</a></li>);
    	});

    	return (<ul>{sub_links}</ul>);
    }
}