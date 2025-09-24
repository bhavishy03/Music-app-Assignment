import { useState } from "react";
import { useRouter } from "next/router";
import { Music, Upload } from "lucide-react";

export default function UploadPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    artist: "",
    releaseDate: "",
    genre: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!form.title || !form.artist || !form.releaseDate || !form.genre) {
      setError("⚠ Please fill all fields before uploading");
      return;
    }

    await fetch("/api/tracks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/dashboard"); // redirect after submit
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 p-6">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8">
        
        {/* Icon Header */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <Music className="w-7 h-7 text-white" />
          </div>
        </div>

        <h1 className="text-center text-2xl font-bold mb-2">Upload New Track</h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          Fill details to add your track to the dashboard
        </p>

        {error && <p className="text-red-500 text-center font-medium mb-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Track Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Dreamscape"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Artist Name</label>
            <input
              type="text"
              name="artist"
              value={form.artist}
              onChange={handleChange}
              placeholder="Aria Smith"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Release Date</label>
            <input
              type="date"
              name="releaseDate"
              value={form.releaseDate}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Genre</label>
            <input
              type="text"
              name="genre"
              value={form.genre}
              onChange={handleChange}
              placeholder="Electronic / Hip-Hop / Ambient..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
          >
            <Upload className="w-5 h-5" /> Submit Track
          </button>
        </form>

        <p 
          onClick={() => router.push("/dashboard")} 
          className="text-center text-sm text-purple-600 hover:text-purple-800 cursor-pointer mt-6"
        >
          ← Back to Dashboard
        </p>
      </div>
    </div>
  );
}