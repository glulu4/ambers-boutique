import OurStory from '@/components/OurStory'
import HeaderText from '@/components/text/HeaderText'
import React from 'react'

export default function page() {
  return (
    <div>
          <OurStory />

          <div>
              <div className="" style={{width: "100%"}}>
                  <div >
                      <div className="mx-auto max-w-2xl text-center">
                          <HeaderText size='large' className=" text-gray-900">
                             Start Shopping
                          </HeaderText>

                          <div className="mt-10  flex items-center justify-center gap-x-6">
                              <a
                                  href="/all-products"
                                  className="font-secHeading text-xl rounded-md bg-primaryRed px-3.5 py-2.5 m-10  font-semibold text-white shadow-sm hover:bg-primaryRedHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                              >
                                  Shop all products
                              </a>

                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </div>
  )
}
