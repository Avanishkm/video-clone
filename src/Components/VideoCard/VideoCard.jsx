import React from 'react'
import { useEffect, useState } from 'react';
import './video.css';

const VideoCard = () => {
  const [postData, setPostData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://internship-service.onrender.com/videos?page=${currentPage}`);
        const result = await response.json();
        setPostData(result);
        console.log(result)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleThumbnailClick = (mediaUrl) => {
    setSelectedVideo(mediaUrl);
  }

  const handleNextPage = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage + 1);
  }

  const handlePrevPage = (e) => {
    e.preventDefault();
    if(currentPage > 0){
      setCurrentPage(currentPage - 1)
    }
    
  }

  return (

    <div >
      {postData && postData.data && postData.data.posts && (
        <div >
          <video className='video' src={selectedVideo} controls autoPlay />
          <div className='main'>
            {postData.data.posts.map(post => (
              <div key={post.postId} className='card-container'>
                <h3>{post.submission.title}</h3>
                <p>{post.submission.description}</p>
                <img className='thumbnail'
                  src={post.submission.thumbnail} 
                  alt="Thumbnail" 
                  onClick={() => handleThumbnailClick(post.submission.mediaUrl)}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            ))}
          </div>
          <div className='btn'>
          <button onClick={handlePrevPage} disabled={currentPage === 0}>Previous Page</button>
          <button onClick={handleNextPage}>Next Page</button>
          </div>
        </div>
      )}
    </div>

  )
}

export default VideoCard;
