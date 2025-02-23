import HeaderText from '@/components/text/HeaderText'
import SecondaryText from '@/components/text/SecondaryText'
import React from 'react'

export default function page() {

    const returnPolicy = "We want you to love your jewelry! You have 15 days from the date of delivery to wear and experience your piece. If you're not completely satisfied, we offer a full refund within the first 15 days of receiving your order. After the 15-day period, we do not accept returns or issue refunds. This policy ensures that you have ample time to try your jewelry while maintaining the highest quality standards for all our customers. If you have any questions, feel free to reach out to our support team!"
  return (
      <div className="flex flex-col justify-center items-start text-left px-6 py-40">
          <HeaderText size='large'>
              Return Policy
          </HeaderText>

          <div className='my-12 leading-loose sm:leading-[3rem] space-y-8 font-secHeading'>
              <SecondaryText size='large' className='font-secHeading'>
                    {returnPolicy}
              </SecondaryText>


          </div>
      </div>
  )
}
