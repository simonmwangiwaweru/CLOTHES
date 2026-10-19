import React from 'react';
import { EclipseIcon } from './Logo';

interface ProductImageProps {
  src?: string;
  alt: string;
  className?: string;
  /** Show the "photo coming soon" caption (hide it in small thumbnails). */
  caption?: boolean;
  loading?: 'lazy' | 'eager';
}

/** Product photo, or an on-brand placeholder when a product has no photo yet. */
export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  className = '',
  caption = true,
  loading = 'lazy',
}) => {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={`${alt} (photo coming soon)`}
        className={`flex h-full w-full flex-col items-center justify-center gap-2 bg-surface text-muted ${className}`}
      >
        <EclipseIcon size={28} />
        {caption && <span className="eyebrow">Photo coming soon</span>}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      className={`h-full w-full object-cover ${className}`}
    />
  );
};
