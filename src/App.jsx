
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import useFetchPhotos from "./hooks/useFetchPhotos";
import PhotoGallery from "./components/PhotoGallery";
import { favoritesReducer } from "./reducer";

function getSavedFavorites() {
  try {
    const saved = localStorage.getItem("celebrare-favorites");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const { photos, loading, error } = useFetchPhotos();

  const [searchTerm, setSearchTerm] = useState("");

  const [favorites, dispatch] = useReducer(
    favoritesReducer,
    undefined,
    getSavedFavorites
  );

  useEffect(() => {
    localStorage.setItem("celebrare-favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredPhotos = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query)
    );
  }, [photos, searchTerm]);

  const handleToggleFavorite = useCallback((photoId) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: photoId });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Celebrare Photo Gallery
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Discover beautiful photos and save your favourites.
          </p>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <label
            htmlFor="author-search"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Search by author
          </label>

          <input
            id="author-search"
            type="search"
            placeholder="Type an author's name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {loading
              ? "Loading photos..."
              : `${filteredPhotos.length} photos found`}
          </p>

          <p className="text-sm font-medium text-red-600">
            ♥ {favorites.length} favourites
          </p>
        </div>

        {loading ? (
          <p className="py-16 text-center text-gray-500">
            Loading your photos...
          </p>
        ) : error ? (
          <p role="alert" className="py-16 text-center text-red-600">
            {error}
          </p>
        ) : (
          <PhotoGallery
            photos={filteredPhotos}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}
      </section>
    </main>
  );
}
