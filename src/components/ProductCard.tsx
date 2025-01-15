import {StripePrice, StripeProductData} from '@/types/types'
import React from 'react'

interface ProductCardProps {
    product:StripeProductData
}



export default function ProductCard({product}: ProductCardProps ) {

    const formatCurrency = (defaultPrice: StripePrice | null):string => {

        if (!defaultPrice){
            return ""
        }
        const amount = defaultPrice.unit_amount;
        const currency = defaultPrice.currency
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.toUpperCase(),
            minimumFractionDigits: 2,
        }).format(amount / 100); // Stripe amounts are in cents
    };


  return (
      <div className="group relative">
          <img
              alt="Amber's Jewelry Boutique"
              src={product.images[0]}
              className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
          />
          <div className="mt-4 flex justify-between">
              <div>
                  <h3 className="text-sm text-gray-700">
                      <a href="/">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.name}
                      </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">
                {/* {product.default_price?.unit_amount_decimal} */}
                  {formatCurrency(product.default_price)}

                </p>
          </div>
      </div>
  )
}
