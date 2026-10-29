import webDevelopment from '../../../assets/service_img/web-development.png'
import appDevelopment from '../../../assets/service_img/app-development.png'
import cloudDataAnalytics from '../../../assets/service_img/cloud-data-analytics.png'
import powerBI from '../../../assets/service_img/power-bi-visualization.png'
import digitalMarketing from '../../../assets/service_img/digital-marketing.png'
import aiAutomation from '../../../assets/service_img/Ai-automation.png'
import cpaas from '../../../assets/service_img/cpaas.png'

/* Fallback service data used when the CMS returns no services. */

export const fallbackFeatures = [
  // 1. Web Development
  {
    id: 'web-development',
    title: 'Web Development',
    image: webDevelopment,

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

  // 3. Cloud & Data Analytics
  {
    id: 'cloud-data-analytics',
    title: 'Cloud & Data Analytics Services',
    image: cloudDataAnalytics,

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

  // 4. Power BI & Visualization
  {
    id: 'power-bi-visualization',
    title: 'Power BI Visualization Services',
    image: powerBI,

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

  // 5. Digital Marketing
  {
    id: 'digital-marketing',
    title: 'Digital Marketing Services',
    image: digitalMarketing,

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

  // 6. AI Automation
  {
    id: 'ai-automation',
    title: 'AI Automation',
    image: aiAutomation,

    details:
      'We implement AI-powered automation solutions that streamline repetitive tasks, optimize business workflows, process information and improve operational efficiency.',

    today: [
      'Repetitive tasks consume valuable working hours.',
      'Manual workflows slow down business operations.',
      'Disconnected tools create inefficient processes.',
      'Manual data handling increases the risk of errors.',
    ],

    outcome: [
      'Automated tasks reduce repetitive manual work.',
      'Intelligent workflows improve operational efficiency.',
      'Integrated systems enable smoother processes.',
      'Automated data processing improves consistency.',
    ],

    points: [
      'Workflow Automation',
      'AI-Powered Solutions',
      'Process Optimization',
      'Smart Integrations',
      'Improved Efficiency',
    ],
  },

  // 7. CPaaS
  {
    id: 'cpaas',
    title: 'CPaaS - Communication Platform as a Service',
    image: cpaas,

    details:
    'Integrate SMS, WhatsApp, voice, and video communication through APIs.',
    today: [
      'Customer communication is spread across channels.',
      'Manual notifications delay important updates.',
      'Integrating messaging and calling requires extra effort.',
      'Disconnected communication tools complicate support.',
    ],

    outcome: [
      'Unified channels simplify customer communication.',
      'Automated notifications deliver timely updates.',
      'APIs connect communication features to applications.',
      'Connected channels improve customer support workflows.',
    ],

    points: [
      'SMS & Messaging APIs',
      'WhatsApp Integration',
      'Voice & Video Calling',
      'Automated Notifications',
      'Seamless Integration',
    ],
  },
];