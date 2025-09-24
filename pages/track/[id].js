import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Music, Calendar, Clock, Heart, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function TrackDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [track, setTrack] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  // fetch all tracks and find by ID
  useEffect(() => {
    if (id) {
      fetch("/api/tracks")
        .then((res) => res.json())
        .then((data) => {
          const found = data.find((t) => String(t.id) === id);
          setTrack(found);
        });
    }
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Submitted":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Draft":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30";
    }
  };

  if (!track) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-slate-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`flex items-center justify-between px-6 py-4 shadow ${
          darkMode
            ? "bg-slate-900 border-b border-slate-800"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-purple-500 hover:text-purple-700 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Dashboard
        </Link>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`px-4 py-2 rounded-lg font-medium ${
            darkMode
              ? "bg-slate-800 text-yellow-300"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      {/* Track Detail Card */}
      <main className="max-w-4xl mx-auto p-8">
        <div
          className={`rounded-2xl border shadow-lg p-8 ${
            darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-200"
          }`}
        >
          {/* Title */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center rounded-xl">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{track.title}</h1>
              <p
                className={`text-sm ${
                  darkMode ? "text-slate-400" : "text-gray-600"
                }`}
              >
                {track.artist} • {track.genre || "Unknown Genre"}
              </p>
            </div>
          </div>

          {/* Track Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-400" />
              <span>
                Release Date: <b>{track.releaseDate}</b>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-pink-400" />
              <span>
                Duration: <b>{track.duration || "N/A"}</b>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-blue-400" />
              <span>
                Plays: <b>{track.plays || "0"}</b>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              <span>
                Likes: <b>{track.likes || "0"}</b>
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="mt-4">
            <span
              className={`px-4 py-2 rounded-full border font-semibold text-sm ${getStatusColor(
                track.status
              )}`}
            >
              {track.status}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}