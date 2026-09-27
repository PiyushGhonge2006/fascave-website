import React from "react";
import "./Ourclient.css";

const clientLogos = [
  {
    id: 1,
    name: "Client 1",
    image: "src/assets/homeing/clientsimg/APVA_logo.png",
  },
  {
    id: 2,
    name: "Client 2",
    image: "src/assets/homeing/clientsimg/foodlex.png",
  },
  {
    id: 3,
    name: "Client 3",
    image: "src/assets/homeing/clientsimg/hiltopTusuki.png",
  },
  {
    id: 4,
    name: "Client 4",
    image: "src/assets/homeing/clientsimg/ikontech.png",
  },
  {
    id: 5,
    name: "Client 5",
    image: "src/assets/homeing/clientsimg/Piotex-Ventures.png",
  },
  {
    id: 6,
    name: "Client 6",
    image: "src/assets/homeing/clientsimg/PiotexIndustries.png",
  },
  {
    id: 7,
    name: "Client 7",
    image: "src/assets/homeing/clientsimg/shetkari.png",
  },
  {
    id: 8,
    name: "Client 8",
    image: "src/assets/homeing/clientsimg/shipdartexpress.png",
  },
  {
    id: 9,
    name: "Client 9",
    image: "src/assets/homeing/clientsimg/WakeUp.jpg",
  },

];

const Ourclients = () => {
  return (
    <section className="our-clients">

      {/* Heading */}
      <div className="clients-heading">
        <h2>OUR CLIENTS</h2>
      </div>

      {/* Logo viewport */}
      <div className="clients-marquee">

        {/* Moving track */}
        <div className="clients-track">

          {/* First set */}
          {clientLogos.map((client) => (
            <div className="client-logo" key={`first-${client.id}`}>
              <img
                src={client.image}
                alt={client.name}
              />
            </div>
          ))}

          {/* Duplicate set for seamless animation */}
          {clientLogos.map((client) => (
            <div className="client-logo" key={`second-${client.id}`}>
              <img
                src={client.image}
                alt={client.name}
              />
            </div>
          ))}

        </div>
      </div>

    </section>
  );
};

export default Ourclients;