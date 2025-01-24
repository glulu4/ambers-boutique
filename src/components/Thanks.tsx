import Image from "next/image";
import HeaderText from "./text/HeaderText";
import SecondaryText from "./text/SecondaryText";

export default function Thanks() {
  return (
    <div className="relative bg-[whitesmoke] rounded-md">
      <div className="relative h-80 overflow-hidden md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
        <Image
        width={500}
        height={500}
          alt="Vintage Chanel Jewelry"
          src="/images/img2.jpg"
                  className="size-full object-cover 

                  rounded-tr-md
                  sm:rounded-tr-none
                  rounded-tl-md 
                  rounded-bl-md
                  sm:rounded-bl-none
                  "
        />
        <svg
          viewBox="0 0 926 676"
          aria-hidden="true"
          className="absolute -bottom-24 left-24 w-[57.875rem] transform-gpu blur-[118px]"
        >
          <path
            d="m254.325 516.708-90.89 158.331L0 436.427l254.325 80.281 163.691-285.15c1.048 131.759 36.144 345.144 168.149 144.613C751.171 125.508 707.17-93.823 826.603 41.15c95.546 107.978 104.766 294.048 97.432 373.585L685.481 297.694l16.974 360.474-448.13-141.46Z"
            fill="url(#60c3c621-93e0-4a09-a0e6-4c228a0116d8)"
            fillOpacity=".4"
          />
          <defs>
            <linearGradient
              id="60c3c621-93e0-4a09-a0e6-4c228a0116d8"
              x1="926.392"
              x2="-109.635"
              y1=".176"
              y2="321.024"
              gradientUnits="userSpaceOnUse"
            >
                          <stop stopColor="#C42847" />
                          <stop offset={1} stopColor="#C42847" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
          <HeaderText className="text-base/7 font-semibold text-primaryRed">
          Thank you for shopping with us
                  </HeaderText>
          <SecondaryText className="mt-6 text-base/7 text-gray-900">
            Your support means the world to us! Every purchase you make helps us continue crafting unique, high-quality products that bring joy and style to your life.
            We&apos;re committed to providing an exceptional shopping experience and can&apos;t wait to serve you again.
            If you have any questions or need assistance, don&apos;t hesitate to reach out to our team.
    Thank you for being a part of our story!                  </SecondaryText>
          {/* <div className="mt-8">
            <a
              href="#"
              className="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Visit the help center
            </a>
          </div> */}
        </div>
      </div>
    </div>
  )
}
