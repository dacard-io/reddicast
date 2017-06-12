import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import PostBrowser from './components/PostBrowser';
import Navigation from './components/Navigation';

// Render main components
//ReactDOM.render(<PostBrowser subreddit="news"/>, document.getElementById('posts-browser'));
ReactDOM.render(<Navigation/>, document.getElementById('subreddit-menu'));