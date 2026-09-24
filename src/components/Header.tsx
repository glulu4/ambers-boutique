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
    {
      name: "Shop",
      items: [...categories.map((cat) => ({
        name: `${capitalizeFirstLetter(cat)}s`,
        href: `/${cat}`,
      })), {name: "All Vintage Jewelry", href: "/all-products"}],
    },
    {name: "Contact", href: "/contact"},
  ];

  return (
    <section className="flex flex-row lg:flex-col lg:gap-8 items-center justify-between mt-8 lg:mt-14 mb-12">
      <Link href="/">
        <span className="block whitespace-nowrap text-3xl sm:text-5xl lg:text-6xl font-accent font-bold leading-tight">
          Amber&apos;s Jewelry Boutique
        </span>
      </Link>
      <Navigation items={navigationItems} />
    </section>
  );
};
