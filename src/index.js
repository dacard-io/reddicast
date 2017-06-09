import React from 'react';
import ReactDOM from 'react-dom';

// Import components
import PostBrowser from './components/PostBrowser';

// Render main components
ReactDOM.render(<PostBrowser subreddit="worldnews"/>, document.getElementById('posts-browser'));