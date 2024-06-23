Melodify
Melodify is a music application web app built using React.js, Node.js, and Express. It allows users to discover random songs and search for specific songs using the Spotify NoCode API. For songs without a preview URL, Melodify fetches previews using the YouTube Data API v3.

Table of Contents
-Introduction
-Features
-Technologies Used
-Setup Instructions
-Usage
-APIs Used
-Contributing
-License
Introduction
Melodify is a single-page web application designed to provide a seamless music discovery and listening experience. Users can browse trending songs on the homepage or use the search bar to find specific songs. The application leverages Spotify's NoCode API for song metadata and previews. For songs without a preview URL, it falls back to the YouTube Data API v3 to fetch previews.

Features
Display random trending songs on the homepage.
Search for songs by name using the search bar.
Play song previews fetched from Spotify or YouTube.
Responsive UI for seamless user experience across devices.
Technologies Used
Frontend: React.js
Backend: Node.js, Express
APIs: Spotify NoCode API, YouTube Data API v3
Setup Instructions
To run Melodify locally, follow these steps:

Clone the repository:
git clone https://github.com/vaishnavichavan10/Melodify-Music-Streaming-Website.git
cd music_app
Install dependencies:
npm install
Set up environment variables:
Create a .env file in the root directory.
Add the following environment variables:
REACT_APP_SPOTIFY_API_KEY=<your-spotify-api-key>
REACT_APP_YOUTUBE_API_KEY=<your-youtube-api-key>
Replace <your-spotify-api-key> and <your-youtube-api-key> with your actual API keys.
Start the development server:
npm start
Open your browser and visit http://localhost:port to view Melodify.

Usage
Homepage: Displays trending songs with album images and play buttons.
Search: Use the search bar to find specific songs. Results include song previews fetched from Spotify or YouTube.

APIs Used
Spotify NoCode API:

Endpoint for fetching random songs.
Endpoint for searching songs by name.
Handles song previews and metadata.
YouTube Data API v3:

Used as a fallback for fetching song previews when not available on Spotify.
Contributing
Contributions are welcome! If you have any suggestions, improvements, or issues, please create an issue or submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

