import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment' // Include moment.js

/* Posts are stateless components that just render data. */
export default class TextPost extends Component {
	render() {

		// Shorten title
		var title_maxlength = 120;
		var description_max_length = 600;
		var post_title = this.props.title;

		var post_date = Date(this.props.date);
		var post_date = String(moment(post_date).format('MMMM Do, YYYY h:mm a'));

		// If title too long, truncate and add ellipsis
		if (post_title.length > title_maxlength) {
			post_title = post_title.substring(0, title_maxlength - 3) + "..."; // The -3 is to add the dots and keep the same max size of title
		}

		// If post content has stuff in it, show this element
		var postDescription;

		function htmlDecode(input){
		  var e = document.createElement('div');
		  e.innerHTML = input;
		  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
		}

		if (this.props.content) {
			// Not the recommended way of doing things, but I want to force HTML entities onto an element
			// so I use the dangerouslySetInnerHTML on the <p> element below
			postDescription = htmlDecode(this.props.content);

			//console.log(postDescription)
			
			// If description too long, truncate and add ellipsis
			if (post_title.length > title_maxlength) {
				post_title = post_title.substring(0, title_maxlength - 3) + "..."; // The -3 is to add the dots and keep the same max size of title
			}
			postDescription = {__html: postDescription}
		}
		

		/* You can do this inline for an if conditional. But holy hell its ugly
		{this.props.content ?
        	<p className="post-shortdesc">{decodeURI(this.props.content)}</p>
        	:
        	<br/>
        }
		 */
		
		// Check if score positive or negative, then style.
		var score_styles = {}
		var post_score;
		if (this.props.score) {
			var post_score = (<b><i className="fa fa-arrow-up"></i> {this.props.score}</b>);
			score_styles = { color: 'orangered' };
		} else {
			var post_score = (<b><i className="fa fa-arrow-down"></i> {this.props.score}</b>);
			score_styles = { color: '#9494ff' };
		}

		return (
			<div className="block post">
                <div className="post-content">
                    <h3 className="post-title" title={this.props.title}>{post_title}</h3>
                    <div className="post-meta">
                    	<span className="post-score" style={score_styles}>{post_score}</span>&nbsp;&nbsp;-&nbsp;&nbsp;
                        <span className="">{post_date}</span>&nbsp;&nbsp;-&nbsp;&nbsp;
                        <a className="post-link" href={'//reddit.com' + this.props.permalink} target="_new">View Post</a>
                    </div>
                    <div dangerouslySetInnerHTML={postDescription}></div>
                </div>
            </div>
		)
	}
}