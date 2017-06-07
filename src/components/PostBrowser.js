import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; // Promise library
import Packery from 'packery'; // Packery layout lib

// Import post types
import TextPost from './post_text.js';

export default class PostBrowser extends Component {
	// Lets create the state by initializing the constructor
	constructor(){
		super(); // Super is the context of the state in the component
		// Create the state
		this.state = {
			posts: []
		};
	}

	// On Component Mount (Runs after render :o)
	componentDidMount() {
		axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
	      .then(res => {
	        const posts = res.data.data.children.map(obj => obj.data);
	        this.setState({ posts });

	        console.log(this.state.posts);
	      });


		
	  	console.log("Run after components loaded");
	  	//post_container.packery(isotope_properties);
	}

	// When component showing
	componentDidUpdate() {
		console.log("After mount")
		// Run packery afterwards to create layout
    	var post_container = document.querySelector('.posts-container');
	  	var isotope_properties = new Packery (post_container, {
		    itemSelector: '.post',
	  	});
	}

	// Render posts
    render() {
    	//console.log(posts)
    	var posts_arr = [];

    	// Loop to p
    	this.state.posts.map((post, index) => {
    		posts_arr.push(
    			<TextPost key={post.id} 
    				title={post.title} 
    				content={post.selftext_html}
    				subreddit={post.subreddit_name_prefixed}
    				date={post.created}
			/>);
    	});

    	/*
    	this.state.posts.map((post) => {
    		return(<TextPost title="post.title" />)
    	});
    	 */

        return(<div className="post-react-renderer">{posts_arr}</div>) //This works. For loops don't
        //return(<TextPost title="post.title" />) //This works. For loops don't
        
        
  	}
}