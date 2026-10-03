import webDevelopment from '../../../assets/service_img/fully-responsive.png'
import appDevelopment from '../../../assets/service_img/app-development.png'
import seoFriendly from '../../../assets/service_img/seo-friendly.png'
import cloudDataAnalytics from '../../../assets/service_img/cloud-data-analytics.png'
import powerBI from '../../../assets/service_img/power-bi-visualization.png'
import digitalMarketing from '../../../assets/service_img/digital-marketing.png'

/* Used when the CMS has nothing to return, so the services
   grid is never empty. */
export const fallbackFeatures = [

  {
    id: 'web-development',

    title: 'Web Development',

    image: webDevelopment,

    description:
      'We build modern, responsive and high-performance websites tailored to your business needs.',

    details:
      'Our web development services include custom website design, responsive layouts, clean code and scalable solutions using modern technologies.',

    today: [
      'Manual website processes and outdated workflows.',
      'Slow websites that affect customer experience.',
      'Difficulty managing website content and updates.',
      'Limited visibility into website performance.',
      'Separate tools for different business requirements.',
    ],

    outcome: [
      'A fast and responsive digital experience.',
      'Modern websites optimized for all devices.',
      'Easy content management and updates.',
      'Better performance and user engagement.',
      'A scalable platform ready for future growth.',
    ],

    points: [
      'Modern & Responsive',
      'Scalable Architecture',
      'High Performance',
      'Secure Development',
      'Future Ready',
    ],
  },


  {
    id: 'app-development',

    title: 'App Development',

    image: appDevelopment,

    description:
      'We develop powerful and user-friendly mobile applications for Android and iOS platforms.',

    details:
      'From concept to deployment, we create secure, scalable and feature-rich mobile applications designed to deliver great user experiences.',

    today: [
      'Customers depend heavily on websites or manual communication.',
      'Limited mobile accessibility.',
      'Disconnected customer experiences.',
      'Manual service and support processes.',
      'Limited access to real-time information.',
    ],

    outcome: [
      'A dedicated mobile experience for customers.',
      'Easy access to services from anywhere.',
      'Connected and automated workflows.',
      'Faster customer communication.',
      'Real-time access to important information.',
    ],

    points: [
      'User Focused',
      'Cross Platform',
      'Secure',
      'Scalable',
      'Future Ready',
    ],
  },


  {
    id: 'seo-friendly',

    title: 'SEO Friendly',

    image: seoFriendly,

    description:
      'We make SEO friendly templates with proper breadcrumbs and structured data.',

    details:
      'We structure websites with search-engine-friendly layouts, semantic HTML, metadata, breadcrumbs and structured data.',

    today: [
      'Low visibility in search results.',
      'Poor website structure for search engines.',
      'Missing metadata and structured information.',
      'Difficulty tracking organic growth.',
      'Unoptimized website content.',
    ],

    outcome: [
      'Search-friendly website architecture.',
      'Better structured website content.',
      'Improved search engine understanding.',
      'Clearer organic performance tracking.',
      'A stronger foundation for online visibility.',
    ],

    points: [
      'Search Ready',
      'Structured Data',
      'Technical SEO',
      'Better Visibility',
      'Optimized Content',
    ],
  },


  {
    id: 'cloud-data-analytics',

    title: 'Cloud & Data Analytics Services',

    image: cloudDataAnalytics,

    description:
      'We help businesses leverage cloud technologies and data analytics for smarter decisions.',

    details:
      'Our services include cloud infrastructure, data processing, data visualization and analytics solutions tailored to your business requirements.',

    today: [
      'Data stored across disconnected systems.',
      'Manual reporting and data collection.',
      'Limited access to business information.',
      'Slow decision-making processes.',
      'Difficulty handling growing data volumes.',
    ],

    outcome: [
      'Centralized and accessible business data.',
      'Automated reporting and analytics.',
      'Real-time business visibility.',
      'Faster data-driven decisions.',
      'Scalable cloud infrastructure.',
    ],

    points: [
      'Cloud Ready',
      'Data Driven',
      'Scalable',
      'Secure',
      'Real-Time Insights',
    ],
  },


  {
    id: 'power-bi-visualization',

    title: 'Power & BI Visualization Services',

    image: powerBI,

    description:
      'We create powerful dashboards and visual reports using modern business intelligence tools.',

    details:
      'Transform your data into meaningful insights with interactive dashboards, reports and data visualization solutions.',

    today: [
      'Business reports are difficult to understand.',
      'Important information is spread across files.',
      'Manual report preparation takes time.',
      'Decision makers lack real-time visibility.',
      'Data trends are difficult to identify.',
    ],

    outcome: [
      'Interactive business dashboards.',
      'Clear and meaningful data visualization.',
      'Automated reporting workflows.',
      'Real-time business insights.',
      'Better understanding of trends and performance.',
    ],

    points: [
      'Interactive',
      'Data Driven',
      'Real-Time',
      'Easy to Understand',
      'Business Focused',
    ],
  },


  {
    id: 'digital-marketing',

    title: 'Digital Marketing Services',

    image: digitalMarketing,

    description:
      'We help you grow your brand with result-driven digital marketing strategies.',

    details:
      'Our digital marketing services include social media marketing, SEO, content marketing, paid advertising and online brand promotion.',

    today: [
      'Limited online brand visibility.',
      'Inconsistent social media presence.',
      'Difficulty reaching the right audience.',
      'Manual marketing activities.',
      'Limited understanding of campaign performance.',
    ],

    outcome: [
      'Stronger online brand presence.',
      'Consistent digital communication.',
      'Targeted audience engagement.',
      'Data-driven marketing campaigns.',
      'Clear visibility into campaign performance.',
    ],

    points: [
      'Brand Growth',
      'Audience Focused',
      'Data Driven',
      'Multi Channel',
      'Performance Based',
    ],
  },

]