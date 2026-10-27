
export default function PhotoCard({ photo, isFavorite, onToggleFavorite }) {
  return (
    <article className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition-shadow hover:shadow-md">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        <p className="truncate font-medium text-gray-800">
          {photo.author}
        </p>

        <button
          type="button"
          onClick={() => onToggleFavorite(photo.id)}
          aria-label={
            isFavorite ? "Remove from favorites" : "Add to favorites"
          }
          aria-pressed={isFavorite}
          className={`shrink-0 rounded-full p-2 transition-colors ${
            isFavorite
              ? "bg-red-50 text-red-600"
              : "bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}
