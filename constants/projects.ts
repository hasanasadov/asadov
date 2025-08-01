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
        title: "Contact Page",
        github: {
          repo: "hasanasadov/asadov",
          filePath: "app/(client)/contact/page.tsx",
          branch: "main",
        },
      },
      {
        title: "Functional Navbar",
        github: {
          repo: "hasanasadov/asadov",
          filePath: "components/shared/Navbar.tsx",
          branch: "main",
        },
      },
      {
        title: "Hovering text animation",
        github: {
          repo: "hasanasadov/asadov",
          filePath: "components/shared/HoverText.tsx",
          branch: "main",
        },
      },
      {
        title: "Toggle Theme button",
        github: {
          repo: "hasanasadov/asadov",
          filePath: "components/shared/Toggle.tsx",
          branch: "main",
        },
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
        title: "Product Card Component",
        language: "tsx",
        code: `import { getCategoryById } from "@/actions/category";
import { getCityById } from "@/actions/city";
import { isProductFavorited } from "@/actions/favorite";
import { getSubCategoryById } from "@/actions/subCategory";
import { getUserById } from "@/actions/user";
import FavButton from "@/app/(business)/product-list/_components/Fav";
import getCurrentUser from "@/lib/current-user";
import { getCurrencySymbol } from "@/lib/utils";
import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  product: Product;
};

const ProductCard = async ({ product }: Props) => {
  const {
    id,
    phone,
    imageUrl: productImg,
    price,
    currency,
    createdAt,
    cityId,
    categoryId,
    subCategoryId,
    userId,
  } = product;

  const city = await getCityById(cityId!);
  const category = await getCategoryById(categoryId!);
  const subCategory = await getSubCategoryById(subCategoryId!);

  if (!userId) return null;
  const user = await getUserById(userId);
  const imageUrl = user?.imageUrl;

  const currentUser = (await getCurrentUser());
  let isFavorited = false;
  if (currentUser) {
   isFavorited = await isProductFavorited(currentUser.id!, id);
  }


  return (
    <div className="relative border-red-200 border rounded-lg overflow-hidden w-full h-[240px] shadow-red-200  transition-transform transform hover:scale-[1.01] hover:shadow-red-200 shadow-md">
      <div className="relative w-full h-[150px] transition-opacity duration-500">
        
          <img
            className="cursor-pointer object-cover h-full w-full transition-transform duration-500 hover:scale-110"
            src={productImg}
            alt={phone}
          />
        </Link>
      </div>

      <div className="p-2">
        <h1 className="font-bold">
          {price} {getCurrencySymbol(currency)}
        </h1>
        <div className="flex justify-start items-center gap-3 text-[16px]">
          <span>{category?.name}</span>
          <span>{subCategory?.name}</span>
        </div>
        <div className="flex gap-2 justify-between items-center text-[#8d94ad]">
          <span>{city?.name}</span>
          {""}
          <span className="text-[10px]">
            {new Date(createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="absolute top-0 right-0 p-2">
        <FavButton
          key={product.id}
          product={product}
          isFavorited={isFavorited}
        />
      </div>

      <div className="absolute top-0 left-0 p-2 flex items-center gap-2 rounded-md overflow-hidden">
        <img
          className="rounded-xl transition-transform duration-500 hover:scale-110"
          src={imageUrl}
          alt="profile"
          width={30}
          height={30}
        />
      </div>
    </div>
  );
};

// ProductCard.Skeleton = () => {
//   return (
//     <div className="border-red-200 border rounded-lg overflow-hidden w-full h-[240px] shadow-red-200 shadow-md">
//       <div className="animate-pulse relative w-full h-[150px] bg-[#f1f1f1] transition-opacity duration-500"></div>
//       <div className="p-2">
//         <div className="animate-pulse h-4 bg-[#f1f1f1] w-1/2 mb-2"></div>
//         <div className="animate-pulse h-4 bg-[#f1f1f1] w-1/4 mb-2"></div>
//         <div className="animate-pulse h-4 bg-[#f1f1f1] w-1/4 mb-2"></div>
//       </div>
//     </div>
//   );
// };

export default ProductCard;
        `.trim(),
      },
      {
        title: "Upload Image",
        code: `import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";

type Props = {
  url: string;
  handleChange: (url: string) => void;
};

export const UploadSingleImage = ({ url, handleChange }: Props) => {
  if (url) {
    return (
      <div className="relative">
        <Image
          src={url}
          alt="Product Photo"
          width={150}
          height={150}
          className="mx-auto"
        />
        <Button
          type="button"
          variant={"ghost"}
          size={"sm"}
          className="absolute top-0 right-0 "
          onClick={() => handleChange("")}
        >
          <TrashIcon />
        </Button>
      </div>
    );
  }

  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        appearance={{
          button: {
            background: "#a80303",
          },
        }}
        onClientUploadComplete={(res) => {
          if (res[0]) {
            handleChange(res[0].url);
            // form.clearErrors("imageUrl");
          }
        }}
        onUploadError={(error: Error) => {
          console.error(error);
          toast.error(error.message);
        }}
      />
    </div>
  );
};
        `.trim(),
      },
      {
        title: "Product List Page Layout",
        code: `import { PropsWithChildren } from "react";
import { Sort } from "./_components/Sort";
import { Marka } from "./_components/Marka";
import { getCategories } from "@/actions/category";
import { getSubCategories } from "@/actions/subCategory";
import { Model } from "./_components/Model";
import { Seher } from "./_components/City";
import { getCities } from "@/actions/city";
import DualRangeSliderCustomLabel from "@/components/shared/Dual";
import { getMaxPrice, getMinPrice } from "@/actions/price";
import ResetParams from "./_components/ResetParams";
export default async function ProductListLayout({
  children,
}: PropsWithChildren) {
  const categories = await getCategories();
  const subCategories = await getSubCategories();
  const cities = await getCities();
  const maxPrice = (await getMaxPrice()) || 1000000;
  let minPrice = (await getMinPrice()) || 0;
  if (minPrice === maxPrice) {
    minPrice = 0;
  }

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
            <Sort />
            <Marka categories={categories} />
            <Model subCategories={subCategories} />
            <Seher cities={cities} />
            <ResetParams />
            <div className="flex  flex-col gap-1 w-[170px] text-center  px-2">
              <h1 className="text-center">Qiymət Aralığı</h1>
              <div className="border border-black rounded-md">
                <DualRangeSliderCustomLabel
                  min={minPrice!}
                  max={maxPrice!}
                  step={500}
                />
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div>{children}</div>
          </div>
        </section>
      </main>
    </div>
  );
}`.trim(),
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
        title: "Rent Card",
        language: "tsx",
        code: `import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import favoriteService from "@/services/favorite";
import { getFavAsync, selectAuth } from "@/store/auth";
import { AxiosResponseError, Rent } from "@/types";
import { useMutation } from "@tanstack/react-query";
import HeartFilledImg from "@/assets/icons/heart-filled-red.svg";
import HeartOutlinedImg from "@/assets/icons/heart-outlined.svg";
import { CheckIcon, User2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export const RentCard = ({ rent }: { rent: Rent }) => {
  const {
    title,
    category,
    gear,
    imageUrls,
    passangers,
    capacityBag,
    price,
    currency,
  } = rent;
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const { favorites } = useAppSelector(selectAuth);

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (favorites) {
      setIsLiked(favorites.includes(rent._id!));
    }
  }, [favorites, rent._id]);
  const onError = (error: AxiosResponseError) => {
    toast.error(error.response?.data.message ?? "Something went wrong!");
    setIsLiked(!isLiked);
  };
  const { mutate } = useMutation({
    mutationFn: favoriteService.toggle,
    onSuccess: () => {
      toast.success("Favorite updated successfully.");
      dispatch(getFavAsync());
    },
    onError,
  });
  const isThisRentSelected =
    searchParams.get("rentId") === rent?._id?.toString();

  const isScrollTo = Number(searchParams.get("scrollTo")) || 0;

  const days = Number(localStorage.getItem("days") || 1);

  return (
    <div className="relative z-[1] cursor-pointer">
      <div
        onClick={(event) => {
          localStorage.setItem("pricePerDay", price.toString());
          localStorage.setItem("currency", currency);
          if (isThisRentSelected) {
            searchParams.delete("rentId");
            searchParams.delete("scrollTo");

            setSearchParams(searchParams);
            return;
          }

          const rect = event.currentTarget.getBoundingClientRect();
          searchParams.set("rentId", rent?._id?.toString()!);
          searchParams.set(
            "scrollTo",
            isScrollTo < rect.top + window.scrollY && isScrollTo !== 0
              ? (rect.top + window.scrollY).toString()
              : (rect.top + window.scrollY + 596).toString()
          );
          setSearchParams(searchParams);
        }}
        className={' border-white  border-4 hover:border-gray-600 rounded-[20px] duration-200 
        $ {
          isThisRentSelected
            ? "!border-orange-600 lg:mb-[620px]"
            : "border-white"
        }'}
      >
        <div className=" border-white relative  border-4 text-white overflow-hidden lg:h-[550px] h-[400px] p-3 px-4 flex flex-col rounded-2xl justify-between items-start ">
          <button
            onClick={() => {
              mutate({ id: rent._id! });
              setIsLiked(!isLiked);
            }}
            className="h-fit absolute top-4 right-4 z-[999999]"
          >
            <img
              src={isLiked ? HeartFilledImg : HeartOutlinedImg}
              alt="heart"
            />
          </button>
          <img
            className="absolute h-full w-full  top-0 bottom-0 left-0 -z-10 object-cover"
            src="https://img.sixt.com/1600/6f09b0e8-6820-4ac0-bedd-5797e9814c18.jpg"
            alt=""
          />
          <img
            className="absolute w-full  top-[50%] left-0 -z-10 object-cover  translate-y-[-50%]"
            src={imageUrls[0]}
            alt=""
          />
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold">{title}</div>
            <div> or similar | {category.title.toString()}</div>
            <div className="mt-2 flex gap-2">
              <div className="flex gap-1 items-center bg-white  bg-opacity-10 w-fit p-1 px-3 rounded-full">
                <User2 size={16} />
                <div className="text-[12px]">{passangers}</div>
              </div>
              <div className="flex gap-1 items-center bg-white bg-opacity-10  w-fit p-1 px-3 rounded-full">
                <div className="w-4 h-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 17 16"
                  >
                    <path d="M14.608 6.866H13.55a2.116 2.116 0 10-4.233 0H8.258c-.582 0-1.058.476-1.058 1.058v6.35c0 .582.476 1.059 1.058 1.059h6.35c.582 0 1.059-.477 1.059-1.059v-6.35c0-.582-.477-1.058-1.059-1.058zm-4.233 2.117a.53.53 0 01-.53.529.53.53 0 01-.528-.53V7.925h1.058v1.059zm1.058-3.175c.582 0 1.059.476 1.059 1.058h-2.117c0-.582.476-1.058 1.058-1.058zm2.117 3.175a.53.53 0 01-.53.529.53.53 0 01-.528-.53V7.925h1.058v1.059z"></path>
                    <path d="M7.667 3.333H9c.608 0 1.124.412 1.283.971-1.037.43-1.633 1.38-1.633 1.895h-.317v-.866h-1v1.104c-.427.238-.8.686-.8 1.487v5.409H3.667c0 .366-.3.666-.667.666a.669.669 0 01-.667-.666c-.733 0-1.333-.6-1.333-1.334V4.666c0-.733.6-1.333 1.333-1.333h1.334v-2c0-.367.3-.667.666-.667H7c.367 0 .667.3.667.667v2zm-4.667 8h1v-6H3v6zm2.167 0h1v-6h-1v6zm-.5-8h2V1.666h-2v1.667z"></path>
                  </svg>
                </div>
                <div className="text-[12px]">{capacityBag}</div>
              </div>
              <div className="flex gap-1 items-center bg-white bg-opacity-10  w-fit p-1 px-3 rounded-full">
                <div className="w-4 h-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9.93 13.5h4.14L12 7.98 9.93 13.5zM20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-4.29 15.88l-.9-2.38H9.17l-.89 2.37a.968.968 0 11-1.81-.69l4.25-10.81c.22-.53.72-.87 1.28-.87s1.06.34 1.27.87l4.25 10.81a.968.968 0 01-.9 1.32c-.4 0-.76-.25-.91-.62z"></path>
                  </svg>
                </div>
                <div className="text-[12px]">{gear}</div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm">
              <CheckIcon className="text-green-500 w-5" /> Unlimited miles
            </div>
            <div className="text-xl font-extrabold flex gap-2 justify-center  items-end">
              {" "}
              <div className="flex gap-1 items-end">
                <p className="!font-bold text-[16px]">
                  {currency == "USD" ? "$" : "₼"}
                </p>
                <p className="text-2xl">{price} </p>
                <p className="!font-bold text-[16px]">/day</p>
              </div>
              <div className="flex gap-1 items-end text-gray-500 mb-0.5">
                <p className="text-sm text-[16px] font-normal">
                  {currency === "USD" ? "$" : "₼"}
                </p>
                <p className="leading-[19px] font-normal text-[14px]">
                  {price * days}{" "}
                </p>
                <p className="text-sm text-[16px] font-normal">total</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isThisRentSelected && (
        <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-orange-600"></div>
      )}
    </div>
  );
};
        `.trim(),
      },
      {
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
        title: "Car Card Component",
        github: {
          repo: "hasanasadov/hasrent",
          filePath:
            "client/src/components/shared/availability-filter/index.tsx",
          branch: "main",
        },
      },
      {
        title: "Reset Password Dialog",
        github: {
          repo: "hasanasadov/hasrent",
          filePath: "client/src/components/shared/dialogs/ResetPassword.tsx",
          branch: "main",
        },
      },
      {
        title: "Multi Range Slider Component",
        github: {
          repo: "hasanasadov/hasrent",
          filePath: "client/src/components/shared/multi-range-slider/index.tsx",
          branch: "main",
        },
      },
      {
        title: "Detail Page",
        github: {
          repo: "hasanasadov/hasrent",
          filePath: "client/src/pages/(business)/detail/index.tsx",
          branch: "main",
        },
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
        title: "Events side bar item",
        github: {
          repo: "hasanasadov/eventify-next",
          filePath: "components/shared/Events/EventSideBarItem.jsx",
          branch: "main",
        },
      },
      {
        title: "Main Map Component",
        github: {
          repo: "hasanasadov/eventify-next",
          filePath: "components/shared/MainMap.jsx",
          branch: "main",
        },
      },
      {
        title: "Navigation Bar",
        github: {
          repo: "hasanasadov/eventify-next",
          filePath: "components/shared/Navbar.jsx",
          branch: "main",
        },
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
        title: "ToDoList Component",
        github: {
          repo: "hasanasadov/hastodo",
          filePath: "src/Comp/ToDoList.jsx",
          branch: "main",
        },
      },
      {
        title: "ToDoHeader Component",
        github: {
          repo: "hasanasadov/hastodo",
          filePath: "src/Comp/ToDoHeader.jsx",
          branch: "main",
        },
      },
      {
        title: "ToDoFooter Component",
        github: {
          repo: "hasanasadov/hastodo",
          filePath: "src/Comp/ToDoFooter.jsx",
          branch: "main",
        },
      },
      {
        title: "ToDoEl Component",
        github: {
          repo: "hasanasadov/hastodo",
          filePath: "src/Comp/ToDoEl.jsx",
          branch: "main",
        },
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
        title: "Login Page",
        github: {
          repo: "hasanasadov/hasnft",
          filePath: "client/pages/login/index.html",
          branch: "main",
        },
      },
      {
        title: "Login Page CSS",
        github: {
          repo: "hasanasadov/hasnft",
          filePath: "client/pages/login/style.css",
          branch: "main",
        },
      },
      {
        title: "Login Page JavaScript",
        github: {
          repo: "hasanasadov/hasnft",
          filePath: "client/pages/login/script.js",
          branch: "main",
        },
      },
      {
        title: "Marketplace Page HTML",
        github: {
          repo: "hasanasadov/hasnft",
          filePath: "client/pages/marketplace/index.html",
          branch: "main",
        },
      },
      {
        title: "Marketplace Page CSS",
        github: {
          repo: "hasanasadov/hasnft",
          filePath: "client/pages/marketplace/style.css",
          branch: "main",
        },
      },
      {
        title: "Marketplace Page JavaScript",
        github: {
          repo: "hasanasadov/hasnft",
          filePath: "client/pages/marketplace/script.js",
          branch: "main",
        },
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
        title: "Rooter Configuration",
        github: {
          repo: "hasanasadov/Instagram_clone_v1",
          filePath: "client/src/router/index.jsx",
          branch: "main",
        },
      },
      {
        title: "Feed Page",
        github: {
          repo: "hasanasadov/Instagram_clone_v1",
          filePath: "client/src/pages/home/index.jsx",
          branch: "main",
        },
      },
      {
        title: "Search Page",
        github: {
          repo: "hasanasadov/Instagram_clone_v1",
          filePath: "client/src/pages/search/index.jsx",
          branch: "main",
        },
      },
      {
        title: "Chat Component",
        github: {
          repo: "hasanasadov/Instagram_clone_v1",
          filePath: "client/src/pages/chat/components/Chat.jsx",
          branch: "main",
        },
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
        title: "Fetch Crypto Prices html",
        github: {
          repo: "hasanasadov/hascrypto",
          filePath: "home/index.html",
          branch: "main",
        },
      },
      {
        title: "Fetch Crypto Prices CSS",
        github: {
          repo: "hasanasadov/hascrypto",
          filePath: "home/style.css",
          branch: "main",
        },
      },
      {
        title: "Fetch Crypto Prices JavaScript",
        github: {
          repo: "hasanasadov/hascrypto",
          filePath: "home/script.js",
          branch: "main",
        },
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
        title: "Home Page HTML",
        github: {
          repo: "hasanasadov/hasneowise",
          filePath: "index.html",
          branch: "main",
        },
      },
      {
        title: "Window scroll observer",
        github: {
          repo: "hasanasadov/hasneowise",
          filePath: "assets/script/app.js",
          branch: "main",
        },
      },
      {
        title: "styles.scss",
        github: {
          repo: "hasanasadov/hasneowise",
          filePath: "assets/style/dev.scss",
          branch: "main",
        },
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
        title: "Paths",
        github: {
          repo: "hasanasadov/hasgames",
          filePath: "src/Constants/index.jsx",
          branch: "main",
        },
      },
      {
        title: "Tic Tac Toe Game",
        github: {
          repo: "hasanasadov/hasgames",
          filePath: "src/Pages/Tic_Tac_Toe/index.jsx",
          branch: "main",
        },
      },
      {
        title: "Connect four Game",
        github: {
          repo: "hasanasadov/hasgames",
          filePath: "src/Pages/ConnectFour/index.jsx",
          branch: "main",
        },
      },
      {
        title: "MineField Game",
        github: {
          repo: "hasanasadov/hasgames",
          filePath: "src/Pages/MineField/index.jsx",
          branch: "main",
        },
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
        title: "Types and Interfaces",
        github: {
          repo: "hasanasadov/hasweather",
          filePath: "src/types/index.ts",
          branch: "main",
        },
      },
      {
        title: "Search Component",
        github: {
          repo: "hasanasadov/hasweather",
          filePath: "src/components/SearchBar.tsx",
          branch: "main",
        },
      },
      {
        title: "Service for fetching weather data",
        github: {
          repo: "hasanasadov/hasweather",
          filePath: "src/services/index.tsx",
          branch: "main",
        },
      },
    ],
    liveUrl: "https://hasweather.vercel.app",
    repoUrl: "https://github.com/hasanasadov/hasweather",
  },
];
