import React, { useMemo } from "react";
import useRevealOnScroll from "../../hooks/useRevealOnScroll";
import { useSingleton } from "../../hooks/useContent";
import { imageUrl } from "../../utils/apiBase";
import "./Ourclient.css";

import apvaLogo from "../../assets/homeing/clientsimg/APVA_logo.png";
import foodlexLogo from "../../assets/homeing/clientsimg/foodlex.png";
import hilltopTuskiLogo from "../../assets/homeing/clientsimg/hiltopTusuki.png";
import ikontechLogo from "../../assets/homeing/clientsimg/ikontech.png";
import piotexVenturesLogo from "../../assets/homeing/clientsimg/Piotex-Ventures.png";
import piotexIndustriesLogo from "../../assets/homeing/clientsimg/PiotexIndustries.png";
import shetkariLogo from "../../assets/homeing/clientsimg/shetkari.png";
import shipdartLogo from "../../assets/homeing/clientsimg/shipdartexpress.png";
import wakeUpLogo from "../../assets/homeing/clientsimg/WakeUp.jpg";

const fallbackClients = [
  { id: 1, name: "APVA Association", image: apvaLogo },
  { id: 2, name: "Foodlex", image: foodlexLogo },
  { id: 3, name: "Hilltop Tuski", image: hilltopTuskiLogo },
  { id: 4, name: "IkonTech", image: ikontechLogo },
  { id: 5, name: "Piotex Ventures", image: piotexVenturesLogo },
  { id: 6, name: "Piotex Industries", image: piotexIndustriesLogo },
  { id: 7, name: "Shetkari", image: shetkariLogo },
  { id: 8, name: "ShipDart Express", image: shipdartLogo },
  { id: 9, name: "Wake UP Water", image: wakeUpLogo },
];

const fallbackLogo = (name) =>
  fallbackClients.find(
    (client) =>
      client.name.toLowerCase() ===
      String(name || "").toLowerCase()
  )?.image || apvaLogo;

const Ourclients = () => {
  const [sectionRef] = useRevealOnScroll();
  const { data: homeContent } = useSingleton(
    "/api/content/home",
    {}
  );

  /*
   * Client logos live in the Home Content document the admin
   * panel already manages. There is no separate /api/clients
   * endpoint, so read the existing source instead.
   */
  const clients = useMemo(() => {
    const clientList = Array.isArray(homeContent?.clients)
      ? homeContent.clients
      : [];

    const formattedClients = clientList
      .filter((client) => client?.logo)
      .map((client, index) => ({
        id: client._id || index,
        name: client.name || "Client",
        image: imageUrl(client.logo),
        link: client.link || "",
      }));

    return formattedClients.length
      ? formattedClients
      : fallbackClients;
  }, [homeContent]);

  const logos = clients;

  return (
    <section className="our-clients" ref={sectionRef}>

      {/* Heading */}
      <div className="clients-heading" data-reveal>
        <h2>OUR CLIENTS</h2>
      </div>

      {/* Logo viewport */}
      <div
        className="clients-marquee fc-marquee"
        data-reveal="fade"
      >

        {/* Moving track */}
        <div className="clients-track fc-marquee-track">

          {/* First set */}
          {logos.map((client) => (
            <div
              className="client-logo"
              key={`first-${client.id}`}
            >
              <img
                src={client.image}
                alt={client.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = fallbackLogo(client.name);
                }}
              />
            </div>
          ))}

          {/* Duplicate set for seamless animation */}
          {logos.map((client) => (
            <div
              className="client-logo"
              key={`second-${client.id}`}
            >
              <img
                src={client.image}
                alt={client.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = fallbackLogo(client.name);
                }}
              />
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Ourclients;