import webDevelopment from '../../../assets/service_img/fully-responsive.png'
import appDevelopment from '../../../assets/service_img/app-development.png'
import seoFriendly from '../../../assets/service_img/seo-friendly.png'
import cloudDataAnalytics from '../../../assets/service_img/cloud-data-analytics.png'
import powerBI from '../../../assets/service_img/power-bi-visualization.png'
import digitalMarketing from '../../../assets/service_img/digital-marketing.png'

/* Used when the CMS has nothing to return, so the services
   grid is never empty. */

/* Fallback service data used when the CMS returns no services. */

export const fallbackFeatures = [
  // 1. Web Development
  {
    id: 'web-development',
    title: 'Web Development',
    image: webDevelopment,
    description:
      'We build modern, responsive and high-performance websites tailored to your business needs.',
    details:
      'Our web development services include custom website design, responsive layouts, clean code and scalable solutions using modern technologies.',

    today: [
      'Frequent changes break existing features.',
      'Website updates depend on developers.',
      'Slow loading affects user experience.',
      'Rigid platforms make growth difficult.',
    ],

    outcome: [
      'Scalable architecture makes updates safer.',
      'Teams manage content with less dependency.',
      'Optimized websites deliver faster experiences.',
      'Flexible platforms grow with your business.',
    ],

    points: [
      'Modern & Responsive',
      'Scalable Architecture',
      'High Performance',
      'Secure Development',
      'Future Ready',
    ],
  },

  // 2. App Development
  {
    id: 'app-development',
    title: 'App Development',
    image: appDevelopment,
    description:
      'We develop powerful and user-friendly mobile applications for Android and iOS platforms.',
    details:
      'From concept to deployment, we create secure, scalable and feature-rich mobile applications designed to deliver great user experiences.',

    today: [
      'Customers struggle with mobile access to services.',
      'App experiences feel inconsistent across devices.',
      'Manual workflows slow customer interactions.',
      'Growing user demand strains existing systems.',
    ],

    outcome: [
      'Services become accessible on the go.',
      'Consistent experiences across supported devices.',
      'Automated workflows simplify daily interactions.',
      'Scalable apps support growing user demand.',
    ],

    points: [
      'User Focused',
      'Cross Platform',
      'Secure',
      'Scalable',
      'Future Ready',
    ],
  },

  // 3. SEO-Friendly Development
  {
    id: 'seo-friendly',
    title: 'SEO Friendly',
    image: seoFriendly,
    description:
      'We make SEO friendly templates with proper breadcrumbs and structured data.',
    details:
      'We structure websites with search-engine-friendly layouts, semantic HTML, metadata, breadcrumbs and structured data.',

    today: [
      'Pages struggle to appear in relevant searches.',
      'Poor structure makes content harder to discover.',
      'Missing metadata limits search visibility.',
      'Unoptimized content misses search opportunities.',
    ],

    outcome: [
      'SEO-friendly pages support better discoverability.',
      'Clear site structure helps search engines.',
      'Metadata and structured data improve page context.',
      'Optimized content targets relevant search intent.',
    ],

    points: [
      'Search Ready',
      'Structured Data',
      'Technical SEO',
      'Better Visibility',
      'Optimized Content',
    ],
  },

  // 4. Cloud & Data Analytics
  {
    id: 'cloud-data-analytics',
    title: 'Cloud & Data Analytics Services',
    image: cloudDataAnalytics,
    description:
      'We help businesses leverage cloud technologies and data analytics for smarter decisions.',
    details:
      'Our services include cloud infrastructure, data processing, data visualization and analytics solutions tailored to your business requirements.',

    today: [
      'Business data is scattered across systems.',
      'Manual reporting consumes valuable time.',
      'Limited visibility delays important decisions.',
      'Growing datasets strain existing infrastructure.',
    ],

    outcome: [
      'Centralized data improves accessibility.',
      'Automated reporting reduces manual effort.',
      'Timely insights support faster decisions.',
      'Scalable cloud infrastructure handles growth.',
    ],

    points: [
      'Cloud Ready',
      'Data Driven',
      'Scalable',
      'Secure',
      'Real-Time Insights',
    ],
  },

  // 5. Power BI & Visualization
  {
    id: 'power-bi-visualization',
    title: 'Power BI Visualization Services',
    image: powerBI,
    description:
      'We create powerful dashboards and visual reports using modern business intelligence tools.',
    details:
      'Transform your data into meaningful insights with interactive dashboards, reports and data visualization solutions.',

    today: [
      'Reports make important insights hard to find.',
      'Data is scattered across multiple files.',
      'Manual report creation delays business reviews.',
      'Trends remain hidden in raw data.',
    ],

    outcome: [
      'Interactive dashboards clarify key metrics.',
      'Connected data brings information together.',
      'Automated reports save preparation time.',
      'Visual trends support informed decisions.',
    ],

    points: [
      'Interactive',
      'Data Driven',
      'Real-Time',
      'Easy to Understand',
      'Business Focused',
    ],
  },

  // 6. Digital Marketing
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Services',
    image: digitalMarketing,
    description:
      'We help you grow your brand with result-driven digital marketing strategies.',
    details:
      'Our digital marketing services include social media marketing, SEO, content marketing, paid advertising and online brand promotion.',

    today: [
      'Brand visibility remains limited online.',
      'Inconsistent campaigns weaken brand recognition.',
      'Reaching the right audience is difficult.',
      'Campaign results are hard to measure.',
    ],

    outcome: [
      'Strategic campaigns strengthen online visibility.',
      'Consistent messaging builds brand recognition.',
      'Targeted marketing reaches relevant audiences.',
      'Performance tracking reveals campaign results.',
    ],

    points: [
      'Brand Growth',
      'Audience Focused',
      'Data Driven',
      'Multi Channel',
      'Performance Based',
    ],
  },
];
