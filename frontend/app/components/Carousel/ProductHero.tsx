'use client'

import React, {useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import type {Swiper as SwiperType} from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import './styles.css'

import {FreeMode, Navigation, Thumbs} from 'swiper/modules'

type ProductImage = {
  _key?: string
  _type: string
  asset: {_ref: string; _type: 'reference'}
  assetUrl?: string | null
  alt?: string | null
}

interface ProductHeroCarouselProps {
  images?: ProductImage[] | null
}

export default function ProductHeroCarousel({images = []}: ProductHeroCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
  const slides = images?.length ? images : []

  return (
    <div className="flex h-full flex-col gap-4 bg-transparent text-white">
      <Swiper
        spaceBetween={10}
        navigation={false}
        thumbs={{swiper: thumbsSwiper}}
        modules={[FreeMode, Navigation, Thumbs]}
        className="product-hero-main !h-full min-h-0 w-full flex-1 bg-transparent"
      >
        {slides.map((image, index) => (
          <SwiperSlide
            key={image._key ?? index}
            className="flex h-full items-center justify-center overflow-hidden rounded-2xl bg-slate-600 text-center text-lg"
          >
            <img
              src={image.assetUrl ?? ''}
              alt={image.alt ?? `Product image ${index + 1}`}
              className="block h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="product-hero-thumbs h-24 w-full bg-transparent sm:h-28"
      >
        {slides.map((image, index) => (
          <SwiperSlide
            key={image._key ?? `thumb-${index}`}
            className="h-full overflow-hidden rounded-xl bg-slate-600"
          >
            <img
              src={image.assetUrl ?? ''}
              alt={image.alt ?? `Product thumbnail ${index + 1}`}
              className="block h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
