import marker from "../images/marker.png"

function Entry(props) { /* hard-coded for now */
    return (
        <article className="journal-entry">
            <div className="main-image-container">
                <img 
                    className="main-image" 
                    src={props.img.src}
                    alt={props.img.alt}
                />
            </div>
            <div className="info-container">
                <img 
                    className="marker" 
                    src={marker}
                    alt="map marker icon"
                />
                <span className="country">{props.country}</span>
                <a href={props.googleMapsLink} target="_blank">View on Google Maps</a>
                <h2 className="entry-title">{props.title}</h2>
                <p className="trip-dates">{props.date}</p>
                <p className="entry-text">{props.text}</p>
            </div>
        </article>
    )
}

export default Entry;