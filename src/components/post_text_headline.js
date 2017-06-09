import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/* Posts are stateless components that just render data. */
export default class TextPostHeadline extends Component {
	render() {

		// Shorten title
		var title_maxlength = 50;
		var post_title = this.props.title;

		// If title too long, truncate and add ellipsis
		if (post_title.length > title_maxlength) {
			post_title = post_title.substring(0, title_maxlength - 3) + "..."; // The -3 is to add the dots and keep the same max size of title
		}

		return (
            <div className="block post headline">
                <div className="post-content">
                    <h3 className="post-title" title={this.props.title}>{post_title}</h3>
                    <div className="post-meta">
                        <span className="">{Date(parseInt(this.props.date))}</span>&nbsp;&nbsp;-&nbsp;&nbsp;
                        <span className="">{this.props.subreddit}</span>&nbsp;&nbsp;-&nbsp;&nbsp;
                        <a className="post-link" href={'//reddit.com' + this.props.permalink}>View Post</a>
                    </div>
                </div>
            </div>
		)
	}
}