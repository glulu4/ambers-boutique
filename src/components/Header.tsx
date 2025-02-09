// "use client";

import {config} from "@/config";
import Link from "next/link";
import {FunctionComponent} from "react";
import Navigation from "./Navigation";
import {capitalizeFirstLetter} from "@/utils/util";
import {useQuery} from "@tanstack/react-query";
import {categories} from "@/types/categories";

// const fetchCategories = async (): Promise<string[]> => {
//   console.log("being called");
  
//   const response = await fetch("/api/get-categories");
//   if (!response.ok) throw new Error("Failed to fetch categories");
//   return response.json();
// };

export const Header: FunctionComponent = (...other) => {
  // const {data: categories = [], isLoading, error} = useQuery<string[]>({
  //   queryKey: ["categories"],
  //   queryFn:fetchCategories,
  //   staleTime: 300000 //Infinity
  //   // gcTime:
  // });

  // console.log(categories);
  

  const navigationItems = [
    {name: "Our Story", href: "/our-story"},
    {name: "Cart", href: "/cart"},

    {
      name: "Products",
      items: [...categories.map((cat) => ({
        name: capitalizeFirstLetter(cat),
        href: `/${cat}`,
      })), {name: "All Products", href: "/all-products"}],
    },
  ];

  return (
    <section className="flex flex-row md:flex-col sm:gap-10 items-center justify-between mt-8 md:mt-16 mb-12">
      <Link href="/">
        <h1 className="text-4xl md:text-6xl font-accent font-bold leading-tight">
          {config.name.name}
        </h1>
      </Link>
      <Navigation items={navigationItems} />
    </section>
  );
};
