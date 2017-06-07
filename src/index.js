import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import PostBrowser from './components/PostBrowser';

// Render main components
ReactDOM.render(<PostBrowser subreddit="reactjs" page="1" />, document.getElementById('posts-browser'));