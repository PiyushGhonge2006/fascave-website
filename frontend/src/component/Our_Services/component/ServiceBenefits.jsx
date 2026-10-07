import './servicebenefits.css'

const SERVICE_BENEFITS = {
  web: [
    {
      icon: '▣',
      title: 'Custom Website Development',
      description:
        'Build modern, responsive websites tailored to your business goals and customer needs.',
    },
    {
      icon: '⚡',
      title: 'High Performance',
      description:
        'Create fast and optimized websites that deliver smooth experiences across all devices.',
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description:
        'Design intuitive and engaging interfaces that improve usability and customer satisfaction.',
    },
    {
      icon: '🔧',
      title: 'Website Maintenance',
      description:
        'Keep your website secure, updated, reliable, and ready to support your growing business.',
    },
  ],

  app: [
    {
      icon: '📱',
      title: 'Mobile App Development',
      description:
        'Develop reliable and user-friendly mobile applications for modern business requirements.',
    },
    {
      icon: '⚙️',
      title: 'Scalable Architecture',
      description:
        'Build scalable applications designed to handle growing users, data, and business demands.',
    },
    {
      icon: '🔗',
      title: 'API Integration',
      description:
        'Connect applications with secure APIs, third-party platforms, and business systems.',
    },
    {
      icon: '🚀',
      title: 'App Deployment',
      description:
        'Prepare, test, and deploy applications for smooth operation across supported platforms.',
    },
  ],

  seo: [
    {
      icon: '🔍',
      title: 'Keyword Optimization',
      description:
        'Identify and target relevant keywords to improve your visibility for valuable searches.',
    },
    {
      icon: '📈',
      title: 'Search Rankings',
      description:
        'Improve your website rankings through effective on-page and technical SEO strategies.',
    },
    {
      icon: '⚙️',
      title: 'Technical SEO',
      description:
        'Optimize website structure, speed, indexing, and technical performance for search engines.',
    },
    {
      icon: '📊',
      title: 'SEO Analytics',
      description:
        'Track organic traffic, rankings, performance, and opportunities for continuous improvement.',
    },
  ],

  cloud: [
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description:
        'Build secure and scalable cloud solutions that support modern business operations.',
    },
    {
      icon: '📊',
      title: 'Data Analytics',
      description:
        'Turn business data into meaningful insights that support better decisions and growth.',
    },
    {
      icon: '🗄️',
      title: 'Data Management',
      description:
        'Organize, manage, and protect business data using reliable and scalable solutions.',
    },
    {
      icon: '🔐',
      title: 'Cloud Security',
      description:
        'Protect cloud infrastructure and business data with secure access and monitoring practices.',
    },
  ],

  powerbi: [
    {
      icon: '📊',
      title: 'Interactive Dashboards',
      description:
        'Create interactive dashboards that make complex business information easier to understand.',
    },
    {
      icon: '📈',
      title: 'Business Intelligence',
      description:
        'Transform business data into actionable insights for smarter and faster decisions.',
    },
    {
      icon: '🔗',
      title: 'Data Integration',
      description:
        'Connect multiple data sources and bring important business information into one place.',
    },
    {
      icon: '💡',
      title: 'Data-Driven Insights',
      description:
        'Discover trends, patterns, and opportunities through powerful visual data analysis.',
    },
  ],

  marketing: [
    {
      icon: '📱',
      title: 'Social Media Marketing',
      description:
        'Build your online presence and engage your audience through strategic social media campaigns.',
    },
    {
      icon: '🎯',
      title: 'Targeted Campaigns',
      description:
        'Reach the right audience with focused campaigns designed around your business objectives.',
    },
    {
      icon: '📢',
      title: 'Brand Promotion',
      description:
        'Strengthen your brand presence through creative digital campaigns and engaging content.',
    },
    {
      icon: '📊',
      title: 'Marketing Analytics',
      description:
        'Measure campaign performance and use meaningful data to improve your marketing strategy.',
    },
  ],
}

/* =========================================
   DETECT SERVICE TYPE
========================================= */

function getServiceType(title = '') {
  const value = title.toLowerCase().trim()

  if (value.includes('web')) {
    return 'web'
  }

  if (value.includes('app')) {
    return 'app'
  }

  if (value.includes('seo')) {
    return 'seo'
  }

  if (
    value.includes('cloud') ||
    value.includes('data analytics')
  ) {
    return 'cloud'
  }

  if (
    value.includes('power') ||
    value.includes('bi') ||
    value.includes('visualization')
  ) {
    return 'powerbi'
  }

  if (
    value.includes('marketing') ||
    value.includes('digital marketing')
  ) {
    return 'marketing'
  }

  return null
}

/* =========================================
   COMPONENT
========================================= */

export default function ServiceBenefits({ feature }) {
  const serviceType = getServiceType(feature?.title)

  const cards = serviceType
    ? SERVICE_BENEFITS[serviceType]
    : []

  if (!cards.length) {
    return null
  }

  return (
    <section className="service-benefits">

      <div className="service-benefits-header">
        <h2>Why Work with Us?</h2>

        <div className="benefits-line"></div>

        <p>
          We help organizations design, build, and scale digital
          solutions through a combination of strategy, design,
          and technology.
        </p>
      </div>

      <div className="service-benefits-grid">

        {cards.map((card, index) => (
          <article
            key={`${card.title}-${index}`}
            className="service-benefit-card"
          >

            <div className="benefit-number">
              {String(index + 1).padStart(2, '0')}
            </div>

            <div className="benefit-icon">
              {card.icon}
            </div>

            <h3>
              {card.title}
            </h3>

            <p>
              {card.description}
            </p>

          </article>
        ))}

      </div>

    </section>
  )
}