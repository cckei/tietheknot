'use client';

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

export default function ProductGallery({ title, images }: { title: string; images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="w-full max-sm:max-w-[400px] max-sm:mx-auto">
    <div className="w-full flex flex-col gap-4 items-center">
      {/* Main swiper */}
      <Swiper
        modules={[FreeMode, Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        navigation
        spaceBetween={0}
        slidesPerView={1}
        className="w-full max-w-[520px]"
        style={{ '--swiper-navigation-color': '#2a2a26', '--swiper-pagination-color': '#2a2a26' } as React.CSSProperties}
      >
        {images.map((src, i) => (
          <SwiperSlide key={src} className="flex items-center justify-center bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={i === 0 ? title : `${title} ${i + 1}`}
              className="w-full object-contain"
              style={{ boxShadow: '0 30px 80px -40px rgba(42,42,38,0.35)' }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbs swiper */}
      {images.length > 1 && (
        <Swiper
          onSwiper={setThumbsSwiper}
          modules={[FreeMode, Thumbs]}
          spaceBetween={10}
          slidesPerView="auto"
          freeMode
          watchSlidesProgress
          className="w-full max-w-[520px] thumbs-swiper"
        >
          {images.map((src) => (
            <SwiperSlide key={src} className="!w-[72px] !h-[90px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className="w-full h-full object-contain bg-paper p-1.5 border border-rule cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <style>{`
        .thumbs-swiper .swiper-slide-thumb-active img {
          border-color: #2a2a26;
        }
        .swiper-button-prev,
        .swiper-button-next {
          width: 36px;
          height: 36px;
        }
        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 16px;
        }
      `}</style>
    </div>
    </div>
  );
}
