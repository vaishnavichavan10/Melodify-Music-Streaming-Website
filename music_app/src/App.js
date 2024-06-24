import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import logo from "./components/images/logo.png";

const App = () => {
  const [keyword, setKeyword] = useState("");
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTrendingTracks();
  }, []);

  const fetchTrendingTracks = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://v1.nocodeapi.com/vaishnavichavan/spotify/${process.env.REACT_APP_NOCODE_API_KEY}/search?q=trending&type=track`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching trending tracks: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log("Fetched trending tracks data:", data);
      setTracks(data.tracks.items);
    } catch (error) {
      console.error("Error fetching trending tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTracks = async () => {
    if (!keyword) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://v1.nocodeapi.com/vaishnavichavan/spotify/${process.env.REACT_APP_NOCODE_API_KEY}/search?q=${encodeURIComponent(
          keyword
        )}&type=track`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching tracks: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      setTracks(data.tracks.items);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    } finally {
      setLoading(false);
    }
  };

  const getYouTubeAudioUrl = async (query) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(
          query
        )}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error fetching YouTube audio URL: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      const videoId = data.items[0]?.id?.videoId;
      if (videoId) {
        const audioResponse = await fetch(
          `http://localhost:4000/audio?url=https://www.youtube.com/watch?v=${videoId}`
        );
        if (!audioResponse.ok) {
          const errorText = await audioResponse.text();
          throw new Error(`Error fetching audio URL: ${audioResponse.statusText} - ${errorText}`);
        }
        const audioData = await audioResponse.json();
        return audioData.audioUrl;
      }
    } catch (error) {
      console.error("Error fetching YouTube audio URL:", error);
    }
    return null;
  };

  return (
    <Container>
      <div className="Body">
        <img src={logo} alt="logo" />

        <div className="search__bar">
          <FaSearch />
          <input
            type="text"
            placeholder="Artists, songs, or podcasts"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <button onClick={getTracks}>Search</button>
        </div>

        <div className="results">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <div className="row">
                {tracks.map((element) => (
                  <TrackCard
                    key={element.id}
                    track={element}
                    getYouTubeAudioUrl={getYouTubeAudioUrl}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};

const TrackCard = ({ track, getYouTubeAudioUrl }) => {
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (!track.preview_url) {
      const fetchAudioUrl = async () => {
        const url = await getYouTubeAudioUrl(
          `${track.name} ${track.artists[0].name}`
        );
        setAudioUrl(url);
      };
      fetchAudioUrl();
    } else {
      setAudioUrl(track.preview_url);
    }
  }, [track, getYouTubeAudioUrl]);

  return (
    <div className="col-lg-3 col-md-6 py-2">
      <div className="card">
        <img
          src={track.album.images[0]?.url}
          className="card-img-top"
          alt="Album cover"
        />
        <div className="card-body">
          <h5 className="card-title">{track.name}</h5>
          <p className="card-text">{track.artists[0].name}</p>
          {audioUrl ? (
            <audio src={audioUrl} controls className="audio-player"></audio>
          ) : (
            <p>Loading preview...</p>
          )}
        </div>
      </div>
    </div>
  );
};

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(transparent, rgba(0, 0, 0, 1));
  background-color: #008080;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  .Body {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .search__bar {
    background-color: white;
    width: 100%;
    max-width: 600px;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 2rem;
    input {
      border: none;
      height: 2rem;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
    button {
      border: none;
      background: none;
      cursor: pointer;
    }
  }

  .results {
    width: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
  }

  .col-lg-3 {
    flex: 0 0 calc(25% - 1rem);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card {
    width: 100%;
    max-width: 18rem;
    border: 1px solid #ccc;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 1rem;
  }

  .card-img-top {
    width: 100%;
    height: 200px; /* Fixed height for the image */
    object-fit: cover;
  }

  .card-body {
    padding: 1rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 150px; /* Fixed height for card body */
  }

  .audio-player {
    width: 100%;
    margin-top: 0.5rem;
  }
`;

export default App;
