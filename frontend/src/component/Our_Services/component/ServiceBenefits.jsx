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

  // AI Automation
  ai: [
    {
      icon: '🤖',
      title: 'Intelligent Workflow Automation',
      description:
        'Automate repetitive business processes using AI-powered workflows that save time and effort.',
    },
    {
      icon: '⚡',
      title: 'Process Optimization',
      description:
        'Streamline daily operations, reduce manual work, and improve overall business efficiency.',
    },
    {
      icon: '🔗',
      title: 'Smart Integrations',
      description:
        'Connect AI tools with existing applications, APIs, and business systems for seamless workflows.',
    },
    {
      icon: '📊',
      title: 'AI-Powered Insights',
      description:
        'Use AI-assisted data processing and analysis to support faster, informed business decisions.',
    },
  ],

  // CPaaS
  cpaas: [
    {
      icon: '💬',
      title: 'Omnichannel Messaging',
      description:
        'Integrate SMS, WhatsApp, and other supported messaging channels into your business applications.',
    },
    {
      icon: '📞',
      title: 'Voice & Video Communication',
      description:
        'Enable voice calls and video communication through APIs suited to your application requirements.',
    },
    {
      icon: '🔔',
      title: 'Automated Notifications',
      description:
        'Send timely OTPs, alerts, reminders, and transaction updates through supported communication channels.',
    },
    {
      icon: '🔗',
      title: 'Seamless API Integration',
      description:
        'Connect communication services with websites, mobile apps, CRM systems, and existing workflows.',
    },
  ],
}

/* =========================================
   DETECT SERVICE TYPE
========================================= */

function getServiceType(title = '') {
  const value = title.toLowerCase().trim()

  // Check specific services before generic keywords.
  if (value.includes('cpaas')) {
    return 'cpaas'
  }

  if (value.includes('ai automation')) {
    return 'ai'
  }

  if (value.includes('seo')) {
    return 'seo'
  }

  if (value.includes('cloud') ||
      value.includes('data analytics')) {
    return 'cloud'
  }

  if (value.includes('digital marketing') ||
      value.includes('marketing')) {
    return 'marketing'
  }

  if (value.includes('app')) {
    return 'app'
  }

  if (value.includes('web')) {
    return 'web'
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

            <h3>{card.title}</h3>

            <p>{card.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
