import { useState, useEffect } from "react";
import Link from "next/link";
import { Play, Pause, Heart, Share2, MoreHorizontal, Plus, Search, Sun, Moon, User, Settings, LogOut, Filter, Upload, TrendingUp, Music, Clock, Calendar, Eye } from "lucide-react";

export default function Dashboard() {
  const [tracks, setTracks] = useState([
    {
      id: 1,
      title: "Dreamscape",
      artist: "Aria Smith",
      album: "Midnight Dreams",
      duration: "3:45",
      releaseDate: "2024-05-10",
      status: "Published",
      plays: "125K",
      likes: "8.2K",
      genre: "Electronic",
      isPlaying: false
    },
    {
      id: 2,
      title: "Midnight Beats",
      artist: "DJ Raven",
      album: "Urban Nights",
      duration: "4:12",
      releaseDate: "2024-06-22",
      status: "Draft",
      plays: "0",
      likes: "0",
      genre: "Hip-Hop",
      isPlaying: false
    },
    {
      id: 3,
      title: "Echoes of Tomorrow",
      artist: "Luna Grey",
      album: "Future Sounds",
      duration: "3:31",
      releaseDate: "2024-07-01",
      status: "Submitted",
      plays: "45K",
      likes: "3.1K",
      genre: "Ambient",
      isPlaying: false
    },
    {
      id: 4,
      title: "Neon Lights",
      artist: "Synthwave Collective",
      album: "Retrowave",
      duration: "4:08",
      releaseDate: "2024-03-15",
      status: "Published",
      plays: "287K",
      likes: "19.5K",
      genre: "Synthwave",
      isPlaying: false
    },
  ]);
  
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All tracks");
  const [darkMode, setDarkMode] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [sortBy, setSortBy] = useState("Recent");
  const [filterStatus, setFilterStatus] = useState("All");

  // Filter and sort tracks
  const filteredTracks = tracks
    .filter(track => 
      track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      track.album.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(track => 
      filterStatus === "All" || track.status === filterStatus
    )
    .sort((a, b) => {
      if (sortBy === "Recent") return new Date(b.releaseDate) - new Date(a.releaseDate);
      if (sortBy === "Popular") return parseInt(b.plays.replace('K', '000')) - parseInt(a.plays.replace('K', '000'));
      if (sortBy === "Alphabetical") return a.title.localeCompare(b.title);
      return 0;
    });

  const handlePlayPause = (trackId) => {
    if (currentlyPlaying === trackId) {
      setCurrentlyPlaying(null);
    } else {
      setCurrentlyPlaying(trackId);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Submitted': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Draft': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const totalStats = {
    totalTracks: tracks.length,
    publishedTracks: tracks.filter(t => t.status === 'Published').length,
    totalPlays: tracks.reduce((sum, track) => sum + parseInt(track.plays.replace('K', '')) * 1000, 0),
    totalLikes: tracks.reduce((sum, track) => sum + parseInt(track.likes.replace('K', '')) * 1000, 0)
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Enhanced Header */}
      <header className={`${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-gray-200'} border-b backdrop-blur-xl sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  MusicDash
                </h1>
                <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Artist Dashboard</p>
              </div>
            </div>

            {/* Enhanced Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-slate-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search tracks, artists, albums..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3 ${darkMode ? 'bg-slate-800 border-slate-700 focus:border-purple-500' : 'bg-gray-100 border-gray-200 focus:border-purple-500'} border rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-200`}
                />
              </div>
            </div>

            {/* User Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-3 rounded-xl transition-all duration-200 ${darkMode ? 'bg-slate-800 hover:bg-slate-700 text-amber-400' : 'bg-gray-200 hover:bg-gray-300 text-slate-600'}`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                    JD
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>John Doe</p>
                    <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>Pro Artist</p>
                  </div>
                </button>

                {showUserMenu && (
                  <div className={`absolute right-0 mt-2 w-64 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-xl shadow-2xl z-50`}>
                    <div className="p-4 border-b border-slate-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-semibold">
                          JD
                        </div>
                        <div>
                          <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>John Doe</p>
                          <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>john@example.com</p>
                          <span className="inline-block mt-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full">Pro Artist</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <a href="#" className={`flex items-center space-x-3 px-3 py-3 rounded-lg ${darkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-gray-100 text-gray-700'} transition-colors`}>
                        <User className="w-5 h-5" />
                        <span>Profile Settings</span>
                      </a>
                      <a href="#" className={`flex items-center space-x-3 px-3 py-3 rounded-lg ${darkMode ? 'hover:bg-slate-700 text-slate-300' : 'hover:bg-gray-100 text-gray-700'} transition-colors`}>
                        <Settings className="w-5 h-5" />
                        <span>Account Settings</span>
                      </a>
                      <hr className={`my-2 ${darkMode ? 'border-slate-600' : 'border-gray-200'}`} />
                      <a href="#" className={`flex items-center space-x-3 px-3 py-3 rounded-lg ${darkMode ? 'hover:bg-slate-700 text-red-400' : 'hover:bg-gray-100 text-red-600'} transition-colors`}>
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'} border rounded-2xl p-6 backdrop-blur-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Total Tracks</p>
                <p className="text-2xl font-bold">{totalStats.totalTracks}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <Music className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'} border rounded-2xl p-6 backdrop-blur-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Published</p>
                <p className="text-2xl font-bold">{totalStats.publishedTracks}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'} border rounded-2xl p-6 backdrop-blur-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Total Plays</p>
                <p className="text-2xl font-bold">{(totalStats.totalPlays / 1000).toFixed(0)}K</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-200'} border rounded-2xl p-6 backdrop-blur-sm`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-gray-600'}`}>Total Likes</p>
                <p className="text-2xl font-bold">{(totalStats.totalLikes / 1000).toFixed(0)}K</p>
              </div>
              <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-pink-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={`${darkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-gray-200'} border rounded-2xl overflow-hidden backdrop-blur-sm`}>
          {/* Header Section */}
          <div className="p-8 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-600'}`}>
                    MUSIC COLLECTION
                  </span>
                </div>
                <h2 className="text-3xl font-bold mb-6">Your Music Library</h2>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className={`px-4 py-2 rounded-full text-sm ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>Electronic</span>
                  <span className={`px-4 py-2 rounded-full text-sm ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>Hip-Hop</span>
                  <span className={`px-4 py-2 rounded-full text-sm ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>Ambient</span>
                  <span className={`px-4 py-2 rounded-full text-sm ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-gray-100 text-gray-700'}`}>Synthwave</span>
                </div>

               <Link 
                  href="/upload"
                  className="inline-flex items-center gap-2 
                  bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 
                  text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 
                  shadow-lg hover:shadow-xl">
                 <Upload className="w-5 h-5" />
                 <span>Upload New Track</span>
               </Link>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="p-6 border-b border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h3 className="text-xl font-semibold">Tracks ({filteredTracks.length})</h3>
                
                {/* Filter Status */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                >
                  <option value="All">All Status</option>
                  <option value="Published">Published</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Draft">Draft</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-4 py-2 rounded-lg border ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-gray-100 border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-purple-500`}
                >
                  <option value="Recent">Recent</option>
                  <option value="Popular">Most Popular</option>
                  <option value="Alphabetical">A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Track List */}
          <div className="divide-y divide-slate-800">
            {filteredTracks.length > 0 ? (
              filteredTracks.map((track, index) => (
                <div 
                  key={track.id} 
                  className={`group p-6 transition-all duration-200 ${darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'}`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Play Button */}
                    <button
                      onClick={() => handlePlayPause(track.id)}
                      className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      {currentlyPlaying === track.id ? (
                        <Pause className="w-6 h-6 text-white" />
                      ) : (
                        <Play className="w-6 h-6 text-white ml-0.5" />
                      )}
                    </button>

                    {/* Track Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                            <Link href={`/track/${track.id}`} className="hover:text-purple-500">
        <h4 className="text-lg font-semibold truncate mb-1">
          {track.title}
        </h4>
      </Link>
                          <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} text-sm mb-2`}>
                            {track.artist} • {track.album}
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className={`flex items-center space-x-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                              <Clock className="w-4 h-4" />
                              <span>{track.duration}</span>
                            </span>
                            <span className={`flex items-center space-x-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                              <Calendar className="w-4 h-4" />
                              <span>{track.releaseDate}</span>
                            </span>
                            <span className={`flex items-center space-x-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                              <Eye className="w-4 h-4" />
                              <span>{track.plays} plays</span>
                            </span>
                            <span className={`flex items-center space-x-1 ${darkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                              <Heart className="w-4 h-4" />
                              <span>{track.likes}</span>
                            </span>
                          </div>
                        </div>

                        {/* Status and Actions */}
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(track.status)}`}>
                            {track.status}
                          </span>
                          
                          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700 text-slate-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'} transition-colors`}>
                              <Heart className="w-5 h-5" />
                            </button>
                            <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700 text-slate-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'} transition-colors`}>
                              <Share2 className="w-5 h-5" />
                            </button>
                            <button className={`p-2 rounded-lg ${darkMode ? 'hover:bg-slate-700 text-slate-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'} transition-colors`}>
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Waveform Visualization */}
                  <div className="mt-4 ml-16">
                    <div className={`w-full h-16 ${darkMode ? 'bg-slate-800' : 'bg-gray-100'} rounded-xl relative overflow-hidden`}>
                      <div className="absolute inset-0 flex items-end justify-start space-x-1 p-2">
                        {[...Array(60)].map((_, i) => (
                          <div 
                            key={i} 
                            className={`${currentlyPlaying === track.id && i < 20 ? 'bg-gradient-to-t from-purple-500 to-pink-500' : darkMode ? 'bg-slate-600' : 'bg-gray-300'} w-1 rounded-full transition-all duration-200`}
                            style={{ 
                              height: `${Math.random() * 80 + 20}%`,
                              opacity: currentlyPlaying === track.id && i < 20 ? 1 : 0.7
                            }}
                          />
                        ))}
                      </div>
                      {currentlyPlaying === track.id && (
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Music className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  {searchTerm ? 'No tracks found' : 'No tracks yet'}
                </h3>
                <p className={`${darkMode ? 'text-slate-400' : 'text-gray-600'} mb-8 max-w-md mx-auto`}>
                  {searchTerm 
                    ? `No tracks match "${searchTerm}". Try adjusting your search or filters.`
                    : 'Start building your music collection by uploading your first track.'
                  }
                </p>
                {searchTerm ? (
                  <button
                    onClick={() => setSearchTerm("")}
                    className={`${darkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gray-200 hover:bg-gray-300'} px-8 py-3 rounded-xl font-semibold transition-colors`}
                  >
                    Clear Search
                  </button>
                ) : (
                  <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl">
                    Upload Your First Track
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}