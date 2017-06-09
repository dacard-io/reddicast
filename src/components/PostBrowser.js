import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; // Promise library
import Packery from 'packery'; // Packery layout lib

// Import post components
import TextPost from './post_text.js';
import TextPostHeadline from './post_text_headline.js';
import MediaPost from './post_media.js';

export default class PostBrowser extends Component {
	// Lets create the state by initializing the constructor
	constructor(){
		super(); // Super is the context of the state in the component
		// Create the state
		this.state = {
			posts: [],
			page: 1
		};
	}

	// On Component Mount (Runs after render :o)
	componentDidMount() {
		axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
	      .then(res => {
	        const posts = res.data.data.children.map(obj => obj.data);
	        this.setState({ posts });

	        // Run packery afterwards to create layout
	    	var post_container = document.querySelector('.posts-container');
		  	var isotope_properties = new Packery (post_container, {
			    itemSelector: '.post',
		  	});

	        console.log(this.state.posts);
	      });


		
	  	console.log("Run after components loaded");
	  	//post_container.packery(isotope_properties);
	}

	// When component updates
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

    	// Loop to push posts in array to render
    	this.state.posts.map((post, index) => {
    		//console.log(post.post_hint);
    		console.log(post.post_hint);

    		/*** Check for post hints to determine what is displayed ***/
    		
    		// If post hint exists, its a post type, else its a text post
    		if (post.post_hint) {

    			if (post.post_hint == "link") {

    			}
    			else if (post.post_hint == "image" || post.post_hint == "rich:video") {
    				console.log(post.url)
    				posts_arr.push(
		    			<MediaPost key={post.id} 
		    				title={post.title} 
		    				subreddit={post.subreddit_name_prefixed}
		    				date={post.created} 
		    				permalink={post.permalink}
		    				thumbnail={post.thumbnail}
		    				link={post.url} />
	    			);
    			} else {
    				// fallback to textpost
    			}

    		} else {
    		 	// If post score higher than value, its a featured post
    		 	if (post.score > 10000) {
    				posts_arr.push(
		    			<TextPostHeadline key={post.id} 
		    				title={post.title} 
		    				subreddit={post.subreddit_name_prefixed}
		    				date={post.created} 
		    				permalink={post.permalink} />
	    			);
    			} else {
    				// Push a regular text post
	    			posts_arr.push(
		    			<TextPost key={post.id} 
		    				title={post.title} 
		    				content={post.selftext_html}
		    				subreddit={post.subreddit_name_prefixed}
		    				date={post.created} 
		    				permalink={post.permalink} />
	    			);
	    		}
    		}

    	});

        return(<div className="post-react-renderer">{posts_arr}</div>) //This works. For loops don't
        //return(<TextPost title="post.title" />) //This works. For loops don't
        
        
  	}
}