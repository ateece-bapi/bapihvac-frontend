import Image from 'next/image';

interface ImageContainerProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  sizes?: string;
  priority?: boolean;
}

export default function ImageContainer({
  src,
  alt,
  className = 'object-cover',
  containerClassName = 'aspect-square relative bg-gray-100 rounded-md overflow-hidden',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
}: ImageContainerProps) {
  return (
    <div className={containerClassName} style={{ position: 'relative' }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
        unoptimized
      />
    </div>
  );
}
