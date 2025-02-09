// import React from 'react'
// import HeaderText from "./text/HeaderText";
// import SecondaryText from "./text/SecondaryText";

// export default function OurStory() {
//   return (

//     <div className="flex flex-col justify-center items-start text-left px-6 py-40">


//         <HeaderText size='large' >
//             Our Story
//         </HeaderText>

//       <div className='my-12 leading-loose sm:leading-[3rem] space-y-8 font-secHeading'>
//               <SecondaryText size='large' className=' font-secHeading'>

//           Our journey began in 2023 when I, Amber Cohen, embarked on a life-changing adventure to Paris.
//           I found myself drawn to the rich tapestry of culture, art, and fashion that defines Parisian life.

//           It was during this transformative experience that I stumbled upon a hidden gem – vintage luxury buttons.
//           Enthralled by their beauty and history, I began collecting these exquisite treasures, each one a piece of Parisian legacy.

//           Upon returning home, I shared my newfound passion with my mom. Together, we saw an opportunity to blend our love for design and entrepreneurship.
//           Inspired by the idea of making luxury accessible to everyone, we embarked on a journey to transform these vintage buttons into stunning pieces of jewelry.


//           Thus, Amber&apos;s Jewelry Boutique was born – a mother-daughter venture fueled by a shared love for craftsmanship and a desire to spread joy through wearable art.

//             </SecondaryText>

//               <SecondaryText size='large' className=' font-secHeading'>
//           We believe that everyone deserves to feel special,
//            to adorn themselves with pieces that resonate with 
//            their individuality. Our mission is to bring a 
//            touch of Parisian charm to every wardrobe, 
//            offering affordable luxury that transcends 
//            boundaries. Each button in our collection is 
//            carefully curated from the streets of Paris, 
//            ensuring that every piece carries with it a 
//            piece of French history and heritage. 
//            When you wear our jewelry, you&apos;re not 
//            just wearing a piece of accessory – you&apos;re carrying a piece of Paris with you, 
//            wherever you go. 
//            Thank you for joining us on this journey. 
//            We invite you to explore our collection and 
//            discover the magic of Parisian elegance, one button at a time. 
//            <br/>
//            <br/>

//           <span className='font-secHeading text-primaryRed font-semibold'>With love, <br/>Amber & Orit.</span>

//             </SecondaryText>
//         </div>

//     </div>
//   )
// }


import SecondaryText from "./text/SecondaryText";
import HeaderText from "./text/HeaderText";

export default function OurStory() {
  return (
    <div className="flex flex-col justify-center items-start text-left px-6 py-40">
      <HeaderText size='large'>
        Our Story
      </HeaderText>

      <div className='my-12 leading-loose sm:leading-[3rem] space-y-8 font-secHeading'>
        <SecondaryText size='large' className='font-secHeading'>
          Our journey began in 2023 when I, Amber Cohen, embarked on a life-changing adventure to Paris.
          I found myself drawn to the rich tapestry of culture, art, and fashion that defines Parisian life.

          It was during this transformative experience that I stumbled upon a hidden gem – vintage luxury buttons.
          Enthralled by their beauty and history, I began collecting these exquisite treasures, each one a piece of Parisian legacy.

          Upon returning home, I shared my newfound passion with my mom. Together, we saw an opportunity to blend our love for design and entrepreneurship.
          Inspired by the idea of making luxury accessible to everyone, we embarked on a journey to transform these vintage buttons into stunning pieces of jewelry, including vintage jewelry.

          Thus, Amber&apos;s Jewelry Boutique was born – a mother-daughter venture fueled by a shared love for craftsmanship and a desire to spread joy through wearable art.
        </SecondaryText>

        <SecondaryText size='large' className='font-secHeading'>
          We believe that everyone deserves to feel special,
          to adorn themselves with pieces that resonate with
          their individuality. Our mission is to bring a
          touch of Parisian charm to every wardrobe,
          offering affordable luxury that transcends
          boundaries. Each button in our collection is
          carefully curated from the streets of Paris,
          including our exclusive vintage jewelry pieces.
        </SecondaryText>
      </div>
    </div>
  );
}