"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { formatCurrencyString, useShoppingCart } from "use-shopping-cart"

import { SanityProduct } from "@/config/inventory"
import { getSizeName } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface Props {
  product: SanityProduct
}

export function ProductInfo({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])

  const { addItem, incrementItem, cartDetails } = useShoppingCart()
  const { toast } = useToast()
  const isInCart = !!cartDetails?.[product._id]

  function addToCart() {
    const item = {
      ...product,
      product_data: {
        size: selectedSize,
      },
    }
    isInCart ? incrementItem(item._id) : addItem(item)

    toast({
      title: "Added to cart",
      description: `${product.name} was added to your cart.`,
      action: (
        <Link href="/cart">
          <Button variant="link" className="gap-x-2 whitespace-nowrap">
            View cart
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      ),
    })
  }

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight">
          {formatCurrencyString({
            value: product.price,
            currency: product.currency,
          })}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div className="space-y-6 text-base">{product.description}</div>
      </div>

      <div className="mt-4">
        <p>
          Size: <strong>{getSizeName(selectedSize)}</strong>
        </p>
        {product.sizes.map((size) => (
          <Button
            onClick={() => setSelectedSize(size)}
            key={size}
            variant={selectedSize === size ? "default" : "outline"}
            className="mr-2 mt-4"
          >
            {getSizeName(size)}
          </Button>
        ))}
      </div>

      <form className="mt-6">
        <div className="mt-4 flex">
          <Button
            type="button"
            className="w-full bg-violet-600 py-6 text-base font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            onClick={addToCart}
          >
            Add to cart
          </Button>
        </div>
      </form>
    </div>
  )
}