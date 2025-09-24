// pages/api/tracks.js

let tracks = [
  {
    id: 1,
    title: "Dreamscape",
    artist: "Aria Smith",
    releaseDate: "2024-05-10",
    genre: "Pop",
    status: "Published",
  },
  {
    id: 2,
    title: "Midnight Beats",
    artist: "DJ Raven",
    releaseDate: "2024-06-22",
    genre: "Electronic",
    status: "Draft",
  },
  {
    id: 3,
    title: "Echoes of Tomorrow",
    artist: "Liam Grey",
    releaseDate: "2024-07-01",
    genre: "Rock",
    status: "Submitted",
  },
];

// Default handler for the API route
export default function handler(req, res) {
  if (req.method === "GET") {
    // Return the list of tracks
    res.status(200).json(tracks);
  } else if (req.method === "POST") {
    // Add new track
    const newTrack = {
      id: Date.now(), // unique id
      ...req.body,
      status: "Pending", // default status for new uploads
    };
    tracks.push(newTrack);
    res.status(201).json(newTrack);
  } else {
    // Method not allowed
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}