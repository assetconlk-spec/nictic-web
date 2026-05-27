export default function GalleryItem({ image, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer overflow-hidden rounded-xl"
    >
      <div className="relative overflow-hidden">
        <img
          src={image.src}
          alt={image.alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30" />
        <div className="absolute bottom-0 left-0 right-0 translate-y-full p-4 transition-transform duration-300 group-hover:translate-y-0">
          <p className="text-sm font-medium text-white">{image.alt}</p>
          <p className="text-xs text-gray-300">{image.category}</p>
        </div>
      </div>
    </div>
  );
}
