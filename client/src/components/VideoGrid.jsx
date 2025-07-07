const VideoGrid = ({ videoIds }) => {
  return (
    <div className="videos-grid">
      {videoIds.map((id) => (
        <div key={id} className="video-container">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}`}
            title="YouTube video player"
            allowFullScreen
            className="video-iframe"
          />
        </div>
      ))}
    </div>
  );
}

export default VideoGrid