import React from 'react'
import HeaderText from "./text/HeaderText";
import SecondaryText from "./text/SecondaryText";

export default function OurStory() {
  return (

    <div className="flex flex-col justify-center items-start text-left px-6 py-40">


        <HeaderText size='large' className='text-left'>
            Our Story
        </HeaderText>

          <div className='my-12 leading-[3rem] space-y-8 font-secHeading'>
              <SecondaryText size='large' className='leading-[3rem] font-secHeading'>

                Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Iure nam eos laborum
                minus dolorum cum ipsa eaque voluptatum amet,
                porro alias, dolor earum possimus eum doloribus
                rerum delectus veritatis consequuntur!
                Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Iure nam eos laborum
                minus dolorum cum ipsa eaque voluptatum amet,
                porro alias, dolor earum possimus eum doloribus
                rerum delectus veritatis consequuntur!
                Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Iure nam eos laborum
                minus dolorum cum ipsa eaque voluptatum amet,
                porro alias, dolor earum possimus eum doloribus
                rerum delectus veritatis consequuntur!
            </SecondaryText>

              <SecondaryText size='large' className='leading-[3rem] font-secHeading'>
                Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Iure nam eos laborum
                minus dolorum cum ipsa eaque voluptatum amet,
                porro alias, dolor earum possimus eum doloribus
                rerum delectus veritatis consequuntur!
            </SecondaryText>
        </div>

    </div>
  )
}
