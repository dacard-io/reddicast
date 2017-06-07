import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/* Posts are stateless components that just render data. */
export default class TextPost extends Component {
	render() {
		return (
			<div className="block post" data-packery='{ "itemSelector": ".post" }'>
                <div className="post-content">
                    <h3 className="post-title">{this.props.title}</h3>
                    <div className="post-meta">
                        <span className="">{Date(parseInt(this.props.date))}</span>&nbsp;&nbsp;-&nbsp;&nbsp;
                        <span className="">{this.props.subreddit}</span>&nbsp;&nbsp;-&nbsp;&nbsp;
                        <a className="" href="#">View Post</a>
                    </div>
                    <p className="post-shortdesc">{decodeURI(this.props.content)}</p>
                </div>
            </div>
		)
	}
}