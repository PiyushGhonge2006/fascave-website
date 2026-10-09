import React from "react";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  ArrowUpRight,
  Navigation,
} from "lucide-react";
import "./office_location.css";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=First+Floor%2C+Govind+Complex+B%2C+127%2C+Pote+Patil+Rd%2C+Kathora%2C+Maharashtra%2C+India+-+444604";

function Office_location() {
  return (
    <section className="office-location-section">
      <div className="office-location-container">

        {/* LEFT - OFFICE INFO */}
        <div className="office-info-panel">
          <div className="office-info-content">

            <span className="office-eyebrow">OUR OFFICE</span>

            <h2 className="office-main-title">
              Let’s Connect
              <br />
              At Our <span>Office</span>
            </h2>

            <p className="office-description">
              Visit our office to discuss your ideas, explore opportunities,
              or simply say hello. We’re always excited to meet and collaborate.
            </p>

            <div className="office-divider"></div>

            <div className="office-details-grid">

              {/* ADDRESS */}
              <div className="office-detail-card">
                <div className="office-detail-icon">
                  <MapPin size={24} strokeWidth={2} />
                </div>

                <div className="office-detail-content">
                  <span className="office-detail-label">ADDRESS</span>

                  <p>
                    First Floor, Govind Complex B,<br />
                    127, Pote Patil Rd, Kathora<br />
                    Maharashtra, India – 444604
                  </p>
                </div>
              </div>

              {/* PHONE */}
              <div className="office-detail-card">
                <div className="office-detail-icon">
                  <Phone size={24} strokeWidth={2} />
                </div>

                <div className="office-detail-content">
                  <span className="office-detail-label">PHONE</span>

                  <p>+91 9209755990</p>
                </div>
              </div>

              {/* EMAIL */}
              <div className="office-detail-card">
                <div className="office-detail-icon">
                  <Mail size={24} strokeWidth={2} />
                </div>

                <div className="office-detail-content">
                  <span className="office-detail-label">EMAIL</span>

                  <p>contact@fascave.com</p>
                </div>
              </div>

              {/* WEBSITE */}
              <div className="office-detail-card">
                <div className="office-detail-icon">
                  <Globe size={24} strokeWidth={2} />
                </div>

                <div className="office-detail-content">
                  <span className="office-detail-label">WEBSITE</span>

                  <p>www.fascave.com</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT - MAP */}
        <div className="office-map-panel">

          <div className="office-map-content">

            <span className="office-map-eyebrow">FIND US</span>

            <h2 className="office-map-title">
              View On <span>Map</span>
            </h2>

            <p className="office-map-description">
              Find the easiest route to our office. Click below to open
              the location in Google Maps.
            </p>

            {/* MAP VISUAL */}
            <div className="office-map-visual">

              <div className="map-road map-road-one"></div>
              <div className="map-road map-road-two"></div>
              <div className="map-road map-road-three"></div>
              <div className="map-road map-road-four"></div>

              <div className="map-location">
                <div className="map-location-pin">
                  <MapPin size={28} fill="currentColor" />
                </div>

                <div className="map-location-label">
                  <strong>FasCave IT Solutions</strong>
                  <span>Kathora, Maharashtra</span>
                </div>
              </div>

              <div className="map-place map-place-one">
                <span></span>
                Kathora
              </div>

              <div className="map-place map-place-two">
                <span></span>
                Govind Complex B
              </div>

              <div className="map-place map-place-three">
                <span></span>
                Pote Patil Rd
              </div>

            </div>

            {/* MAP BUTTON */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="office-map-button"
            >
              <span className="office-map-button-icon">
                <Navigation size={18} />
              </span>

              <span>View on Google Maps</span>

              <ArrowUpRight size={19} />
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Office_location;