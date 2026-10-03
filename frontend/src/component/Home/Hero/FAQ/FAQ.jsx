import React, { useState } from "react";
import useRevealOnScroll from "../../../../hooks/useRevealOnScroll";
import { useCollection } from "../../../../hooks/useContent";
import "./FQA.css";

/* Used when the CMS has nothing to return, so the section
   is never empty. */
const fallbackFaqs = [
  {
    question: "What services does Fascave IT Solutions provide?",
    answer:
      "Fascave IT Solutions provides web development, mobile app development, digital marketing, cloud and data solutions, UI/UX design, and customized software solutions for businesses."
  },
  {
    question: "How can Fascave IT Solutions help with digital transformation?",
    answer:
      "We help businesses modernize their processes through custom software, web and mobile applications, cloud solutions, automation, and digital strategies designed around their business requirements."
  },
  {
    question: "Do you provide customized website development?",
    answer:
      "Yes. We develop fully customized websites based on your business goals, brand identity, functionality requirements, and target audience."
  },
  {
    question: "What technologies do you use for web and mobile app development?",
    answer:
      "We work with modern technologies such as React, JavaScript, Node.js, Express.js, MongoDB, cloud platforms, and other technologies depending on the project's requirements."
  },
  {
    question: "How does your SEO service work?",
    answer:
      "Our SEO process includes website analysis, keyword research, on-page optimization, technical SEO, content optimization, and performance monitoring to improve search visibility."
  },
  {
    question: "Do you work with startups?",
    answer:
      "Yes. We work with startups as well as established businesses and provide scalable technology solutions according to their budget, goals, and growth requirements."
  },
  {
    question: "What is your project development process?",
    answer:
      "Our development process generally includes requirement analysis, planning, UI/UX design, development, testing, deployment, and post-launch support."
  },
  {
    question: "How much does it cost to develop a website or app?",
    answer:
      "The cost depends on the project's features, complexity, design requirements, technology stack, and development time. Contact us with your requirements for a customized estimate."
  },
  {
    question: "Do you offer support and maintenance after project completion?",
    answer:
      "Yes. We provide post-launch support and maintenance services to help with updates, bug fixes, performance improvements, security, and future feature enhancements."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const [sectionRef] = useRevealOnScroll({ stagger: 60 });

  const { items: faqs } = useCollection(
    "/api/content/faq",
    fallbackFaqs
  );

  /* Questions are stored without a number so the same copy
     works in the admin form. The number is added here, and
     left alone if an editor already typed one. */
  const withNumber = (question, index) => {
    const value = String(question || "");

    if (/^q\s*\d+[.)]/i.test(value)) {
      return value;
    }

    return `Q${index + 1}. ${value}`;
  };

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" ref={sectionRef}>

      <div className="faq-header" data-reveal>
        <h2>FREQUENTLY ASKED QUESTIONS</h2>

        <p>
          Our Frequently Asked Questions Are Designed To Provide Quick,
          Insightful Solutions To Your
          <br />
          Queries.
        </p>
      </div>

      <div className="faq-container">

        {faqs.map((faq, index) => (
          <div
            className={`faq-item ${
              openIndex === index ? "faq-active" : ""
            }`}
            key={index}
            data-reveal="scale"
          >

            <button
              className="faq-question"
              onClick={() => handleToggle(index)}
              aria-expanded={openIndex === index}
            >
              <span>
              {withNumber(faq.question, index)}
            </span>

              <span
                className={`faq-arrow ${
                  openIndex === index ? "arrow-open" : ""
                }`}
              >
                ⌄
              </span>
            </button>

            <div
              className={`faq-answer ${
                openIndex === index ? "answer-open" : ""
              }`}
            >
              <div className="faq-answer-content">
                {faq.answer}
              </div>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default FAQ;
