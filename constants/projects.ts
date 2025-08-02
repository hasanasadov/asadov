export const projects = [
  {
    id: 0,
    title: "Personal Portfolio",
    image: "/projects/asadov.png",
    category: "Web",
    description: "My Personal website/portfolio about me",
    detailedDescription: `My organised full personal information related website designed and pushed by me.`,
    technologies: [
      "Next.js",
      "TailwindCSS",
      "TypeScript",
      "NodeMailer",
      "Figma",
    ],
    codeSnippets: [
      {
        id: "0",
        title: "Contact Page",
        repo: "hasanasadov/asadov",
        filePath: "app/(client)/contact/page.tsx",
        branch: "main",
      },
      {
        id: "0",
        title: "Functional Navbar",

        repo: "hasanasadov/asadov",
        filePath: "components/shared/Navbar.tsx",
        branch: "main",
      },
      {
        id: "0",
        title: "Hovering text animation",

        repo: "hasanasadov/asadov",
        filePath: "components/shared/HoverText.tsx",
        branch: "main",
      },
      {
        id: "0",
        title: "Toggle Theme button",

        repo: "hasanasadov/asadov",
        filePath: "components/shared/Toggle.tsx",
        branch: "main",
      },
    ],
    liveUrl: "https://asadov.site",
    repoUrl: "https://github.com/hasanasadov/asadov",
  },
  {
    id: 1,
    title: "Turbo.az Clone",
    image: "/projects/turbo.png",
    category: "Web",
    description: "A full Turbo.az clone built with Next.js and Tailwind.",
    detailedDescription: `
This project is a comprehensive clone of Turbo.az. It features responsive design,
seamless UX, and advanced filtering options. The backend is mocked with static data.
    `,
    technologies: [
      "Next.js",
      "TailwindCSS",
      "TypeScript",
      "Prisma",
      "Stripe",
      "Clerk",
    ],
    codeSnippets: [
      {
        id: "0",
        title: "Toggle Theme button",

        repo: "hasanasadov/asadov",
        filePath: "components/shared/Toggle.tsx",
        branch: "main",
      },
    ],
    liveUrl: "https://hasturbo.vercel.app",
    repoUrl: "https://github.com/hasanasadov/CA_Project_TurboAz",
  },
  {
    id: 2,
    title: "Sixt.com Clone",
    image: "/projects/sixt.png",
    category: "Web",
    description: "Sixt.com clone showcasing smooth UX/UI.",
    detailedDescription: `
      This project is a detailed Sixt.com clone focused on UI precision and seamless interactions.
      Built with React and TailwindCSS.
              `,
    technologies: [
      "React.js",
      "TailwindCSS",
      "TypeScript",
      "Passport.js",
      "NodeMailer",
      "Stripe",
    ],
    codeSnippets: [
      {
        id: "0",
        title: "Toggle Theme button",

        repo: "hasanasadov/asadov",
        filePath: "components/shared/Toggle.tsx",
        branch: "main",
      },
      {
        id: "0",
        title: "Server main page",
        code: `import express from "express";
import passport from "passport";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import cors from "cors";

import "./config/db";
import "./config/auth-strategy";

import authRoutes from "./routes/auth";
import userRoutes from "./routes/user";
import rentRoutes from "./routes/rent";
import getPage from "./controllers/get";
import reviewRoutes from "./routes/review";
import favoriteRoutes from "./routes/favorite";
import categoryRoutes from "./routes/category";
import locationRoutes from "./routes/location";
import reservationRoutes from "./routes/reservation";
import stripeRoutes from "./routes/stripe";
import webhookRoutes from "./routes/webhook";

const app = express();
app.set("trust proxy", 1);

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || 'http://localhost:$ {PORT}';
const production = process.env.NODE_ENV === "production";
const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:7777"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


app.use(express.json());

app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      secure: !!production,
      sameSite: production ? "none" : "lax",
      httpOnly: !!production,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/public", express.static("./public"));

app.get("/", getPage);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/locations", locationRoutes);
app.use("/categories", categoryRoutes);
app.use("/rents", rentRoutes);
app.use("/reservations", reservationRoutes);
app.use("/reviews", reviewRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/stripe", stripeRoutes);
app.use("/webhook/stripe", webhookRoutes);

app.listen(PORT, () => {
  console.log('Hasanali's Server is running on $ {BASE_URL}');
});`.trim(),
      },
    ],
    liveUrl: "https://hassixt.site",
    repoUrl: "https://github.com/hasanasadov/sixt-clone",
  },
  {
    id: 3,
    title: "Morent car",
    image: "/projects/hasrent.png",
    category: "Mobile",
    description: "A car rental mobile app with clean design.",
    detailedDescription: `
Morent car is a mobile-first car rental app with user-friendly UI and smooth booking flow.
    `,
    technologies: [
      "React.js",
      "TailwindCSS",
      "TypeScript",
      "Passport.js",
      "NodeMailer",
      "Stripe",
    ],
    codeSnippets: [
      {
        id: "0",
        title: "Car Card Component",
        repo: "hasanasadov/hasrent",
        filePath: "client/src/components/shared/availability-filter/index.tsx",
        branch: "main",
      },
      {
        id: "0",
        title: "Reset Password Dialog",

        repo: "hasanasadov/hasrent",
        filePath: "client/src/components/shared/dialogs/ResetPassword.tsx",
        branch: "main",
      },
      {
        id: "0",
        title: "Multi Range Slider Component",

        repo: "hasanasadov/hasrent",
        filePath: "client/src/components/shared/multi-range-slider/index.tsx",
        branch: "main",
      },
      {
        id: "0",
        title: "Detail Page",

        repo: "hasanasadov/hasrent",
        filePath: "client/src/pages/(business)/detail/index.tsx",
        branch: "main",
      },
    ],
    liveUrl: "https://hasrent.vercel.app",
    repoUrl: "https://github.com/hasanasadov/hasrent",
  },
  {
    id: 4,
    title: "MyEvents App",
    image: "/projects/myevents.png",
    category: "Mobile",
    description: "Event management app for mobile devices.",
    detailedDescription: `
MyEvents is a mobile app to create, manage and share events with friends and family.
    `,
    technologies: [
      "Next.js",
      "TailwindCSS",
      "JavaScript",
      "Pyhton",
      "GoogleAPI",
    ],
    codeSnippets: [
      {
        id: "0",
        title: "Events side bar item",
        repo: "hasanasadov/eventify-next",
        filePath: "components/shared/Events/EventSideBarItem.jsx",
        branch: "main",
      },
      {
        id: "0",
        title: "Main Map Component",

        repo: "hasanasadov/eventify-next",
        filePath: "components/shared/MainMap.jsx",
        branch: "main",
      },
      {
        id: "0",
        title: "Navigation Bar",

        repo: "hasanasadov/eventify-next",
        filePath: "components/shared/Navbar.jsx",
        branch: "main",
      },
    ],
    liveUrl: "https://myevents.az",
    repoUrl: "https://github.com/hasanasadov/eventify-next",
  },
  {
    id: 5,
    title: "ToDo App",
    image: "/projects/hastodo.png",
    category: "Web",
    description: "Simple and elegant ToDo application.",
    detailedDescription: `
A minimalist ToDo app focused on simplicity and productivity. Built with React and TailwindCSS.
    `,
    technologies: ["React.js", "TailwindCSS", "JavaScript"],
    codeSnippets: [
      {
        id: "0",
        title: "ToDoList Component",
        repo: "hasanasadov/hastodo",
        filePath: "src/Comp/ToDoList.jsx",
        branch: "main",
      },
      {
        id: "0",
        title: "ToDoHeader Component",

        repo: "hasanasadov/hastodo",
        filePath: "src/Comp/ToDoHeader.jsx",
        branch: "main",
      },
      {
        id: "0",
        title: "ToDoFooter Component",

        repo: "hasanasadov/hastodo",
        filePath: "src/Comp/ToDoFooter.jsx",
        branch: "main",
      },
      {
        id: "0",
        title: "ToDoEl Component",

        repo: "hasanasadov/hastodo",
        filePath: "src/Comp/ToDoEl.jsx",
        branch: "main",
      },
    ],
    liveUrl: "https://hastodo.vercel.app",
    repoUrl: "https://github.com/hasanasadov/hastodo",
  },
  {
    id: 6,
    title: "NFT Marketplace",
    image: "/projects/hasnft.png",
    category: "Web",
    description: "A marketplace for NFTs with seamless UX.",
    detailedDescription: `
NFT Marketplace platform featuring NFT browsing, buying, and selling functionalities.
    `,
    technologies: ["HTML5", "CSS", "JavaScript", "Bootstrap", "API"],
    codeSnippets: [
      {
        id: "0",
        title: "Login Page",
        repo: "hasanasadov/hasnft",
        filePath: "client/pages/login/index.html",
        branch: "main",
      },
      {
        id: "0",
        title: "Login Page CSS",

        repo: "hasanasadov/hasnft",
        filePath: "client/pages/login/style.css",
        branch: "main",
      },
      {
        id: "0",
        title: "Login Page JavaScript",

        repo: "hasanasadov/hasnft",
        filePath: "client/pages/login/script.js",
        branch: "main",
      },
      {
        id: "0",
        title: "Marketplace Page HTML",

        repo: "hasanasadov/hasnft",
        filePath: "client/pages/marketplace/index.html",
        branch: "main",
      },
      {
        id: "0",
        title: "Marketplace Page CSS",

        repo: "hasanasadov/hasnft",
        filePath: "client/pages/marketplace/style.css",
        branch: "main",
      },
      {
        id: "0",
        title: "Marketplace Page JavaScript",

        repo: "hasanasadov/hasnft",
        filePath: "client/pages/marketplace/script.js",
        branch: "main",
      },
    ],
    liveUrl: "https://hasnft.vercel.app",
    repoUrl: "https://github.com/hasanasadov/hasnft",
  },
  {
    id: 7,
    title: "Instagram Clone",
    image: "/projects/hasagram.png",
    category: "Mobile",
    description: "Instagram UI clone for mobile.",
    detailedDescription: `
Instagram UI clone focusing on mobile responsiveness and user experience.
    `,
    technologies: [
      "React Native",
      "TailwindCSS",
      "TypeScript",
      "Socket.io",
      "Passport.js",
      "NodeMailer",
    ],
    codeSnippets: [
      {
        id: "0",
        title: "Rooter Configuration",
        repo: "hasanasadov/Instagram_clone_v1",
        filePath: "client/src/router/index.jsx",
        branch: "main",
      },
      {
        id: "0",
        title: "Feed Page",

        repo: "hasanasadov/Instagram_clone_v1",
        filePath: "client/src/pages/home/index.jsx",
        branch: "main",
      },
      {
        id: "0",
        title: "Search Page",

        repo: "hasanasadov/Instagram_clone_v1",
        filePath: "client/src/pages/search/index.jsx",
        branch: "main",
      },
      {
        id: "0",
        title: "Chat Component",

        repo: "hasanasadov/Instagram_clone_v1",
        filePath: "client/src/pages/chat/components/Chat.jsx",
        branch: "main",
      },
    ],
    liveUrl: "https://hasagram.vercel.app",
    repoUrl: "https://github.com/hasanasadov/Instagram_clone_v1",
  },
  {
    id: 8,
    title: "Crypto Tracker",
    image: "/projects/hascrypto.png",
    category: "Web",
    description: "Track cryptocurrencies in real-time.",
    detailedDescription: `
Crypto Tracker is a dashboard for tracking prices and changes in crypto markets in real time.
    `,
    technologies: ["HTML", "CSS", "API", "JavaScript", "Bootstrap"],
    codeSnippets: [
      {
        id: "0",
        title: "Fetch Crypto Prices html",
        repo: "hasanasadov/hascrypto",
        filePath: "home/index.html",
        branch: "main",
      },
      {
        id: "0",
        title: "Fetch Crypto Prices CSS",

        repo: "hasanasadov/hascrypto",
        filePath: "home/style.css",
        branch: "main",
      },
      {
        id: "0",
        title: "Fetch Crypto Prices JavaScript",

        repo: "hasanasadov/hascrypto",
        filePath: "home/script.js",
        branch: "main",
      },
    ],
    liveUrl: "https://hascrypto.vercel.app",
    repoUrl: "https://github.com/hasanasadov/hascrypto",
  },
  {
    id: 9,
    title: "Neowise",
    image: "/projects/hasneowise.png",
    category: "Web",
    description: "Weather forecasting app with beautiful UI.",
    detailedDescription: `
Neowise is a weather forecasting app providing accurate data with a beautiful interface.
    `,
    technologies: ["HTML", "CSS"],
    codeSnippets: [
      {
        id: "0",
        title: "Home Page HTML",
        repo: "hasanasadov/hasneowise",
        filePath: "index.html",
        branch: "main",
      },
      {
        id: "0",
        title: "Window scroll observer",

        repo: "hasanasadov/hasneowise",
        filePath: "assets/script/app.js",
        branch: "main",
      },
      {
        id: "0",
        title: "styles.scss",

        repo: "hasanasadov/hasneowise",
        filePath: "assets/style/dev.scss",
        branch: "main",
      },
    ],
    liveUrl: "https://hasneowise.vercel.app",
    repoUrl: "https://github.com/hasanasadov/hasneowise",
  },
  {
    id: 10,
    title: "Games",
    image: "/projects/hasgames.png",
    category: "Games",
    description: "Fun browser games collection.",
    detailedDescription: `A collection of fun browser games built using React and TailwindCSS.`,
    technologies: ["React", "TailwindCSS", "JavaScript"],
    codeSnippets: [
      {
        id: "0",
        title: "Paths",
        repo: "hasanasadov/hasgames",
        filePath: "src/Constants/index.jsx",
        branch: "main",
      },
      {
        id: "0",
        title: "Tic Tac Toe Game",

        repo: "hasanasadov/hasgames",
        filePath: "src/Pages/Tic_Tac_Toe/index.jsx",
        branch: "main",
      },
      {
        id: "0",
        title: "Connect four Game",

        repo: "hasanasadov/hasgames",
        filePath: "src/Pages/ConnectFour/index.jsx",
        branch: "main",
      },
      {
        id: "0",
        title: "MineField Game",

        repo: "hasanasadov/hasgames",
        filePath: "src/Pages/MineField/index.jsx",
        branch: "main",
      },
    ],
    liveUrl: "https://hasgames.vercel.app",
    repoUrl: "https://github.com/hasanasadov/hasgames",
  },
  {
    id: 11,
    title: "Weather",
    image: "/projects/hasweather.png",
    category: "Weather",
    description: "Real-time weather app.",
    detailedDescription: `
A real-time weather app built using React and TailwindCSS.
    `,
    technologies: ["React", "TailwindCSS", "JavaScript", "API"],
    codeSnippets: [
      {
        id: "0",
        title: "Types and Interfaces",
        repo: "hasanasadov/hasweather",
        filePath: "src/types/index.ts",
        branch: "main",
      },
      {
        id: "0",
        title: "Search Component",

        repo: "hasanasadov/hasweather",
        filePath: "src/components/SearchBar.tsx",
        branch: "main",
      },
      {
        id: "0",
        title: "Service for fetching weather data",

        repo: "hasanasadov/hasweather",
        filePath: "src/services/index.tsx",
        branch: "main",
      },
    ],
    liveUrl: "https://hasweather.vercel.app",
    repoUrl: "https://github.com/hasanasadov/hasweather",
  },
];
