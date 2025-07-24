export const projects = [
  {
    id: 1,
    title: "Turbo.az Clone",
    image: "/turbo.png",
    href: "hasturbo.vercel.app",
    category: "Web",
    description: "A full Turbo.az clone built with Next.js and Tailwind.",
    detailedDescription: `
This project is a comprehensive clone of Turbo.az. It features responsive design,
seamless UX, and advanced filtering options. The backend is mocked with static data.
    `,
    technologies: ["Next.js", "TailwindCSS", "TypeScript", "React"],
    codeSnippets: [
      {
        title: "Filter Function Example",
        language: "typescript",
        code: `
const filteredProjects = projects.filter(project => {
  return project.category === selectedCategory && project.title.includes(searchTerm);
});
        `.trim(),
      },
      {
        title: "Sample React Component",
        language: "tsx",
        code: `
import React from 'react';

const Button = () => {
  return <button className="px-4 py-2 bg-indigo-600 text-white rounded">Click Me</button>;
};

export default Button;
        `.trim(),
      },
    ],
    liveUrl: "https://hasturbo.vercel.app",
    repoUrl: "https://github.com/hasanasadov/CA_Project_TurboAz",
  },
  {
    id: 2,
    title: "Sixt.com Clone",
    image: "/sixt.png",
    href: "hassixt.site",
    category: "Web",
    description: "Sixt.com clone showcasing smooth UX/UI.",
    detailedDescription: `
This project is a detailed Sixt.com clone focused on UI precision and seamless interactions.
Built with React and TailwindCSS.
    `,
    technologies: ["React", "TailwindCSS", "JavaScript"],
    codeSnippets: [
      {
        title: "Booking Form Handler",
        language: "tsx",
        code: `
const handleBooking = (data) => {
  // booking logic here
  console.log(data);
};
        `.trim(),
      },
    ],
    liveUrl: "https://hassixt.site",
    repoUrl: "https://github.com/hasanasadov/sixt-clone",
  },
  {
    id: 3,
    title: "Morent car",
    image: "/hasrent.png",
    href: "hasrent.vercel.app",
    category: "Mobile",
    description: "A car rental mobile app with clean design.",
    detailedDescription: `
Morent car is a mobile-first car rental app with user-friendly UI and smooth booking flow.
    `,
    technologies: ["React Native", "Expo", "TailwindCSS"],
    codeSnippets: [
      {
        title: "Car List Fetch",
        language: "typescript",
        code: `
async function fetchCars() {
  const response = await fetch('/api/cars');
  const cars = await response.json();
  setCars(cars);
}
        `.trim(),
      },
    ],
    liveUrl: "https://hasrent.vercel.app",
    repoUrl: "https://github.com/hasanasadov/hasrent",
  },
  {
    id: 4,
    title: "MyEvents App",
    image: "/myevents.png",
    href: "myevents.az",
    category: "Mobile",
    description: "Event management app for mobile devices.",
    detailedDescription: `
MyEvents is a mobile app to create, manage and share events with friends and family.
    `,
    technologies: ["React Native", "TailwindCSS", "Firebase"],
    codeSnippets: [
      {
        title: "Event Creation Function",
        language: "tsx",
        code: `
function createEvent(eventData) {
  // store eventData in Firebase
}
        `.trim(),
      },
    ],
    liveUrl: "https://myevents.az",
    repoUrl: "https://github.com/hasanasadov/eventify-next",
  },
  {
    id: 5,
    title: "ToDo App",
    image: "/hastodo.png",
    href: "hastodo.vercel.app",
    category: "Web",
    description: "Simple and elegant ToDo application.",
    detailedDescription: `
A minimalist ToDo app focused on simplicity and productivity. Built with React and TailwindCSS.
    `,
    technologies: ["React", "TailwindCSS", "JavaScript"],
    codeSnippets: [
      {
        title: "Add Task Handler",
        language: "tsx",
        code: `
function addTask(task) {
  setTasks([...tasks, task]);
}
        `.trim(),
      },
    ],
    liveUrl: "https://hastodo.vercel.app",
    repoUrl: "https://github.com/hasanasadov/hastodo",
  },
  {
    id: 6,
    title: "NFT Marketplace",
    image: "/hasnft.png",
    href: "hasnft.vercel.app",
    category: "Web",
    description: "A marketplace for NFTs with seamless UX.",
    detailedDescription: `
NFT Marketplace platform featuring NFT browsing, buying, and selling functionalities.
    `,
    technologies: ["Next.js", "TailwindCSS", "Web3.js"],
    codeSnippets: [
      {
        title: "Connect Wallet",
        language: "typescript",
        code: `
async function connectWallet() {
  // connect to ethereum wallet
}
        `.trim(),
      },
    ],
    liveUrl: "https://hasnft.vercel.app",
    repoUrl: "https://github.com/hasanasadov/hasnft",
  },
  {
    id: 7,
    title: "Instagram Clone",
    image: "/hasagram.png",
    href: "hasagram.vercel.app",
    category: "Mobile",
    description: "Instagram UI clone for mobile.",
    detailedDescription: `
Instagram UI clone focusing on mobile responsiveness and user experience.
    `,
    technologies: ["React Native", "TailwindCSS"],
    codeSnippets: [
      {
        title: "Image Upload",
        language: "tsx",
        code: `
function uploadImage(file) {
  // handle image upload
}
        `.trim(),
      },
    ],
    liveUrl: "https://hasagram.vercel.app",
    repoUrl: "https://github.com/hasanasadov/Instagram_clone_v1",
  },
  {
    id: 8,
    title: "Crypto Tracker",
    image: "/hascrypto.png",
    href: "hascrypto.vercel.app",
    category: "Web",
    description: "Track cryptocurrencies in real-time.",
    detailedDescription: `
Crypto Tracker is a dashboard for tracking prices and changes in crypto markets in real time.
    `,
    technologies: ["React", "TailwindCSS", "CoinGecko API"],
    codeSnippets: [
      {
        title: "Fetch Crypto Prices",
        language: "typescript",
        code: `
async function fetchPrices() {
  const response = await fetch('https://api.coingecko.com/api/v3/simple/price');
  const data = await response.json();
  setPrices(data);
}
        `.trim(),
      },
    ],
    liveUrl: "https://hascrypto.vercel.app",
    repoUrl: "https://github.com/hasanasadov/hascrypto",
  },
  {
    id: 9,
    title: "Neowise",
    image: "/hasneowise.png",
    href: "hasneowise.vercel.app",
    category: "Web",
    description: "Weather forecasting app with beautiful UI.",
    detailedDescription: `
Neowise is a weather forecasting app providing accurate data with a beautiful interface.
    `,
    technologies: ["Next.js", "TailwindCSS", "OpenWeather API"],
    codeSnippets: [
      {
        title: "Fetch Weather Data",
        language: "typescript",
        code: `
async function fetchWeather(location) {
  const response = await fetch(\`https://api.openweathermap.org/data/2.5/weather?q=\${location}&appid=API_KEY\`);
  const data = await response.json();
  setWeather(data);
}
        `.trim(),
      },
    ],
    liveUrl: "https://hasneowise.vercel.app",
    repoUrl: "https://github.com/hasanasadov/hasneowise",
  },
  {
    id: 10,
    title: "Games",
    image: "/hasgames.png",
    href: "hasgames.vercel.app",
    category: "Games",
    description: "Fun browser games collection.",
    detailedDescription: `
A collection of fun browser games built using React and TailwindCSS.
    `,
    technologies: ["React", "TailwindCSS", "JavaScript"],
    codeSnippets: [
      {
        title: "Game Loop Example",
        language: "javascript",
        code: `
function gameLoop() {
  requestAnimationFrame(gameLoop);
  // game logic here
}
        `.trim(),
      },
    ],
    liveUrl: "https://hasgames.vercel.app",
    repoUrl: "https://github.com/hasanasadov/hasgames",
  },
];
