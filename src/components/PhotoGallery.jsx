
import PhotoCard from "./PhotoCard";

export default function PhotoGallery({
  photos,
  favorites,
  onToggleFavorite,
}) {
  if (photos.length === 0) {
    return (
      <p className="py-12 text-center text-gray-500">
        No photos found. Try another author name.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavorite={favorites.includes(photo.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}
