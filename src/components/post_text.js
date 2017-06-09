import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/* Posts are stateless components that just render data. */
export default class TextPost extends Component {
	render() {

		// Shorten title
		var title_maxlength = 40;
		var post_title = this.props.title;

		// If title too long, truncate and add ellipsis
		if (post_title.length > title_maxlength) {
			post_title = post_title.substring(0, title_maxlength - 3) + "..."; // The -3 is to add the dots and keep the same max size of title
		}

		// If post content has stuff in it, show this element
		var postDescription;
		if (this.props.content) {
			postDescription = (
				<p className="post-shortdesc">{decodeURI(this.props.content)}</p>
			)
		}

		/* You can do this inline for an if conditional. But holy hell its ugly
		{this.props.content ?
        	<p className="post-shortdesc">{decodeURI(this.props.content)}</p>
        	:
        	<br/>
        }
		 */

		return (
			<div className="block post">
                <div className="post-content">
                    <h3 className="post-title" title={this.props.title}>{post_title}</h3>
                    <div className="post-meta">
                        <span className="">{Date(parseInt(this.props.date))}</span>&nbsp;&nbsp;-&nbsp;&nbsp;
                        <span className="">{this.props.subreddit}</span>&nbsp;&nbsp;-&nbsp;&nbsp;
                        <a className="post-link" href={'//reddit.com' + this.props.permalink} target="_new">View Post</a>
                    </div>
                    {postDescription}
                </div>
            </div>
		)
	}
}