interface Props {
  src: string;
}

export default function HeroImage({ src }: Props) {
  return (
    <div className="relative w-full h-64 overflow-hidden bg-gray-200">
      <img
        src={src}
        alt="Month hero"
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80";
        }}
      />
    </div>
  );
}
