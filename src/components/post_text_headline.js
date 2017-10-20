import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment' // Include moment.js

/* Posts are stateless components that just render data. */
export default class TextPostHeadline extends Component {
	render() {

		// Shorten title
		var title_maxlength = 200;
		var post_title = this.props.title;

		var post_date = Date(this.props.date);
		var post_date = String(moment(post_date).format('MMMM Do, YYYY h:mm a'));

		// If title too long, truncate and add ellipsis
		if (post_title.length > title_maxlength) {
			post_title = post_title.substring(0, title_maxlength - 3) + "..."; // The -3 is to add the dots and keep the same max size of title
		}

		// If post important, use as conditional to highlight with accent color
		var post_important = this.props.score > 30000;

		var post_styles = {};

		if (post_important) {
			// Set post styles
			post_styles = {
				color: '#c0392b',
				textTransform: 'uppercase',
				textAlign: 'center'
			}
		}

		// Check if score positive or negative, then style.
		var score_styles = {}
		var post_score;
		if (this.props.score) {
			var post_score = (<b><i className="fa fa-arrow-up"></i>{this.props.score}</b>);
			score_styles = { color: 'orangered' };
		} else {
			var post_score = (<b><i className="fa fa-arrow-down"></i>{this.props.score}</b>);
			score_styles = { color: '#9494ff' };
		}

		return (
            <div className="block post headline">
                <div className="post-content">
                    <h3 className="post-title" title={this.props.title} style={post_styles}>{post_title}</h3>
                    <div className="post-meta">
                    	<span className="post-score" style={score_styles}>{post_score}</span>&nbsp;&nbsp;-&nbsp;&nbsp;
                        <span className="">{post_date}</span>&nbsp;&nbsp;-&nbsp;&nbsp;
                        <a className="post-link" href={'//reddit.com' + this.props.permalink}>View Post</a>
                    </div>
                </div>
            </div>
		)
	}
}