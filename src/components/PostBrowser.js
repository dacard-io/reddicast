import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; // Promise library
import Packery from 'packery'; // Packery layout lib
//require('waypoints/noframework.waypoints.min.js'); // Import waypoints
var Waypoint = require('react-waypoint');

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
			page: 1,
			next_id: '',
			post_count: 0,
			scrolled: false,
			loading: false
		};
	}

	fetchPosts() {
		// For pagination to work, count goes in increments of 25, alogn with a new after pagination id
		// Url format: http://www.reddit.com/r/${subreddit}.json?limit={25}&count={post_number}&after={pagination_id}
		
		var redditAPI = 'http://www.reddit.com/r/' + this.props.subreddit + '.json?count=' + this.state.post_count + '&after=' + this.state.next_id;
		axios.get(redditAPI)
	      .then(res => {
	        const posts = res.data.data.children.map(obj => obj.data);
	        this.setState({ posts: this.state.posts.concat(posts) }); // Can't push state, so you have to use concat to return new array and add object to it
	        this.setState({ next_id: res.data.data.after });
	        this.setState({ post_count: this.state.post_count + 25 });
	        this.setState({ loading: false});

	        // Run packery afterwards to create layout
	    	var post_container = document.querySelector('.posts-container');
		  	var isotope_properties = new Packery (post_container, {
			    itemSelector: '.post',
		  	});

	        console.log(this.state.posts);
	        console.log("Next ID: ", this.state.next_id ,", Count: ", this.state.post_count)
	        console.log("API URL: ", redditAPI)
	      }).catch(function (error) {
		    console.log(error);
		    // Append error element
		    ReactDOM.render(<h3 className="error"><i className="fa fa-close"></i>&nbsp;&nbsp;Could not find subreddit</h3>, document.getElementById('posts-browser'));
		  });

	}

	// On Component Mount (Runs after render :o)
	componentDidMount() {		
	  	this.fetchPosts(); // Remember to self refer this component to get the function

	  	// Run packery afterwards to create layout
	  	window.setInterval(function(){
	    	var post_container = document.querySelector('.posts-container');
		  	var isotope_properties = new Packery (post_container, {
			    itemSelector: '.post',
		  	});
		  }, 2000);
	
		// Render a button to load more posts
		//ReactDOM.render(<a onClick={event => this.setState({loading: true})}>Load More Posts</a>, document.querySelector('.load-more-overlay'));

	  	console.log("Next ID: ", this.state.next_id ,", Count: ", this.state.post_count)

	}

	// When component updates
	componentDidUpdate() {
		
		// If state is loading, fetchPosts
		if (this.state.loading) {
				this.fetchPosts();
				this.setState({scrolled: false})
				this.setState({loading: false})
		} else {
			// If not loading, render the waypoint
			ReactDOM.render(
			<Waypoint onEnter={event => this.setState({loading: true})}/>
			, document.querySelector('.load-more-overlay'))
			}
	}

	// Render posts
    render() {
    	//console.log(this.state.posts)
    	var posts_arr = [];

    	// Loop to push posts in array to render
    	this.state.posts.map((post, index) => {
    		//console.log(post.post_hint);

    		/*** Check for post hints to determine what is displayed ***/
    		
    		// If post hint exists, its a post type, else its a text post
    		if (post.post_hint) {

    			if (post.post_hint == "link") {

    			}
    			else if (post.post_hint == "image" || post.post_hint == "rich:video") {
    				//console.log(post.url)
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

        return(<div className="post-react-renderer">{posts_arr}</div>)        
  	}
}