'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  fallbackElement?: React.ReactNode;
}

// Default fallback - use existing product image
const DEFAULT_FALLBACK = '/images/product-01.jpg';

/**
 * SafeImage component that handles image loading errors gracefully
 * Shows a fallback image or element when the main image fails to load
 */
export default function SafeImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  fallbackElement,
  className,
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setError(true);
    if (fallbackSrc && !error) {
      setImgSrc(fallbackSrc);
    }
  };

  const isLocalhost = typeof imgSrc === 'string' && (imgSrc.startsWith('http://localhost') || imgSrc.startsWith('http://127.0.0.1'));
  const shouldUnoptimize = props.unoptimized || isLocalhost;

  // If there's a fallback element and the image failed, show it
  if (error && fallbackElement) {
    return <>{fallbackElement}</>;
  }

  // If src is empty or invalid, show fallback immediately
  if (!src || src === '' || src === 'null' || src === 'undefined') {
    if (fallbackElement) {
      return <>{fallbackElement}</>;
    }
    return (
      <Image
        {...props}
        src={fallbackSrc}
        alt={alt}
        className={className}
        unoptimized={shouldUnoptimize}
      />
    );
  }

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      unoptimized={shouldUnoptimize}
    />
  );
}

/**
 * Simple img tag with fallback for cases where Next.js Image is not suitable
 */
export function SafeImg({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  fallbackElement,
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & {
  fallbackSrc?: string;
  fallbackElement?: React.ReactNode;
}) {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  if (error && fallbackElement) {
    return <>{fallbackElement}</>;
  }

  if (!src || src === '' || src === 'null' || src === 'undefined' || error) {
    if (fallbackElement) {
      return <>{fallbackElement}</>;
    }
    return (
      <img
        {...props}
        src={fallbackSrc}
        alt={alt}
        className={className}
      />
    );
  }

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
