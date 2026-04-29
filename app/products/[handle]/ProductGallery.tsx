'use client';

import { useState } from 'react';

export default function ProductGallery({ title, images }: { title: string; images: string[] }) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={activeImage}
        alt={title}
        className="max-w-[88%] max-h-[560px]"
        style={{ boxShadow: '0 30px 80px -40px rgba(42,42,38,0.35)' }}
      />

      <div className="flex gap-3 flex-wrap justify-center">
        {images.map((src) => {
          const active = src === activeImage;
          return (
            <button
              key={src}
              type="button"
              onClick={() => setActiveImage(src)}
              className={`w-[72px] h-[90px] bg-paper p-1.5 flex items-center justify-center cursor-pointer border ${active ? 'border-ink' : 'border-rule'}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="max-w-full max-h-full" />
            </button>
          );
        })}
      </div>
    </>
  );
}
