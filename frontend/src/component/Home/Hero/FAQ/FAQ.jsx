import React, { useState } from "react";
import "./FQA.css";

const faqData = [
  {
    question: "Q1. What services does Fascave IT Solutions provide?",
    answer:
      "Fascave IT Solutions provides web development, mobile app development, digital marketing, cloud and data solutions, UI/UX design, and customized software solutions for businesses."
  },
  {
    question: "Q2. How can Fascave IT Solutions help with digital transformation?",
    answer:
      "We help businesses modernize their processes through custom software, web and mobile applications, cloud solutions, automation, and digital strategies designed around their business requirements."
  },
  {
    question: "Q3. Do you provide customized website development?",
    answer:
      "Yes. We develop fully customized websites based on your business goals, brand identity, functionality requirements, and target audience."
  },
  {
    question: "Q4. What technologies do you use for web and mobile app development?",
    answer:
      "We work with modern technologies such as React, JavaScript, Node.js, Express.js, MongoDB, cloud platforms, and other technologies depending on the project's requirements."
  },
  {
    question: "Q5. How does your SEO service work?",
    answer:
      "Our SEO process includes website analysis, keyword research, on-page optimization, technical SEO, content optimization, and performance monitoring to improve search visibility."
  },
  {
    question: "Q6. Do you work with startups?",
    answer:
      "Yes. We work with startups as well as established businesses and provide scalable technology solutions according to their budget, goals, and growth requirements."
  },
  {
    question: "Q7. What is your project development process?",
    answer:
      "Our development process generally includes requirement analysis, planning, UI/UX design, development, testing, deployment, and post-launch support."
  },
  {
    question: "Q8. How much does it cost to develop a website or app?",
    answer:
      "The cost depends on the project's features, complexity, design requirements, technology stack, and development time. Contact us with your requirements for a customized estimate."
  },
  {
    question: "Q9. Do you offer support and maintenance after project completion?",
    answer:
      "Yes. We provide post-launch support and maintenance services to help with updates, bug fixes, performance improvements, security, and future feature enhancements."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">

      <div className="faq-header">
        <h2>FREQUENTLY ASKED QUESTIONS</h2>

        <p>
          Our Frequently Asked Questions Are Designed To Provide Quick,
          Insightful Solutions To Your
          <br />
          Queries.
        </p>
      </div>

      <div className="faq-container">

        {faqData.map((faq, index) => (
          <div
            className={`faq-item ${
              openIndex === index ? "faq-active" : ""
            }`}
            key={index}
          >

            <button
              className="faq-question"
              onClick={() => handleToggle(index)}
              aria-expanded={openIndex === index}
            >
              <span>{faq.question}</span>

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