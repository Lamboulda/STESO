const InfoSection = ({ title, text, imageSrc, imageAlt = "" }) => {
  return (
    <div className="info-section">
      <h2 className="info-title">{title}</h2>
      <div className="info-content">
        <img src={imageSrc} alt={imageAlt} className="info-image" />
        <p className="info-text">{text}</p>
      </div>
    </div>
  )
}

export default InfoSection