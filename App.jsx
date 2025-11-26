import React, { useState, useEffect } from 'react';
import { Heart, Star, Send, Sparkles, Camera, Upload, X, Wand2, Moon, Image as ImageIcon, Film, MessageCircle } from 'lucide-react';

// --- Components ---

const FloatingHeart = ({ delay, left }) => (
  <div 
    className="absolute text-red-500 opacity-0 animate-float"
    style={{ 
      left: `${left}%`, 
      animationDelay: `${delay}s`,
      fontSize: `${Math.random() * 20 + 10}px`
    }}
  >
    <Heart fill="currentColor" />
  </div>
);

// A simple Modal for uploading media (For preview only)
const MediaConfigModal = ({ isOpen, onClose, onUpdateMedia, media }) => {
  if (!isOpen) return null;

  const handleFileChange = (key, e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpdateMedia(key, url);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="p-4 border-b border-stone-100 flex justify-between items-center bg-rose-50">
          <h3 className="font-bold text-stone-800 flex items-center gap-2">
            <Camera className="w-5 h-5 text-rose-500" /> Customize Media
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-rose-100 rounded-full transition">
            <X className="w-5 h-5 text-stone-500" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <p className="text-sm text-stone-500 mb-4 bg-amber-50 border border-amber-200 p-3 rounded-lg text-amber-800">
            <strong>Easy Mode:</strong> If you see empty boxes, use the buttons below to load your files for this preview. When you upload to Vercel, just put your files in the same folder as this code!
          </p>

          {/* Video Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-700">1. Hero Video (MP4)</label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer border-2 border-dashed border-rose-200 rounded-lg p-3 hover:bg-rose-50 transition flex items-center justify-center gap-2 text-rose-600 font-medium">
                <Upload className="w-4 h-4" />
                Select '{media.heroVideo}'
                <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileChange('heroVideo', e)} />
              </label>
            </div>
          </div>

          {/* Journey Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-700">2. Journey Map (Image)</label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer border-2 border-dashed border-rose-200 rounded-lg p-3 hover:bg-rose-50 transition flex items-center justify-center gap-2 text-rose-600 font-medium">
                <Upload className="w-4 h-4" />
                Select '{media.journeyImage}'
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('journeyImage', e)} />
              </label>
            </div>
          </div>

          {/* Stars Image Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-stone-700">3. Stars/Constellations (Image)</label>
            <div className="flex items-center gap-4">
              <label className="flex-1 cursor-pointer border-2 border-dashed border-rose-200 rounded-lg p-3 hover:bg-rose-50 transition flex items-center justify-center gap-2 text-rose-600 font-medium">
                <Upload className="w-4 h-4" />
                Select '{media.starsImage}'
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileChange('starsImage', e)} />
              </label>
            </div>
          </div>
        </div>

        <div className="p-4 bg-stone-50 text-center">
          <button 
            onClick={onClose}
            className="bg-rose-500 text-white px-6 py-2 rounded-full font-medium hover:bg-rose-600 transition shadow-md w-full"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('hero');
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // --- EASY CONFIGURATION ---
  // Ensure your files are named EXACTLY like this in your folder!
  const [media, setMedia] = useState({
    heroVideo: "Image_To_Video_Generation.mp4",
    journeyImage: "Gemini_Generated_Image_cdpfpncdpfpncdpf.jpg",
    starsImage: "Gemini_Generated_Image_7mxmal7mxmal7mxm.jpg"
  });

  const [mediaErrors, setMediaErrors] = useState({
    heroVideo: false,
    journeyImage: false,
    starsImage: false
  });

  const [newName, setNewName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  
  const [wishRelationship, setWishRelationship] = useState("Friend");
  const [wishTone, setWishTone] = useState("Sentimental");
  const [isGeneratingWish, setIsGeneratingWish] = useState(false);

  const [oracleQuestion, setOracleQuestion] = useState("");
  const [oracleAnswer, setOracleAnswer] = useState("");
  const [isConsultingOracle, setIsConsultingOracle] = useState(false);

  // --- Built-in Magic (No API Key Needed!) ---
  
  const oracleFortunes = [
    "The stars shine brightly on this union! Expect lots of travel.",
    "A bond forged in the heavens. Your joy will only grow.",
    "Scorpio and Virgo are a powerful match. Success is written in your chart.",
    "The moon signals a lifetime of laughter and good food!",
    "Ahilyanagar to Pune... the journey is just beginning!",
    "The constellations suggest a very happy home.",
    "Destiny says: Yes, absolutely!",
    "The planets align for a prosperous future."
  ];

  const wishTemplates = {
    Friend: {
      Sentimental: "To my dearest friends Nikhil and Gauri, may your love story be as magical as this day. Wishing you a lifetime of joy!",
      Funny: "Congrats Nikhil & Gauri! Marriage is just a fancy word for adopting an overgrown child who cannot be handled by their parents anymore. Just kidding, love you guys!",
      Formal: "Heartiest congratulations to Nikhil and Gauri. May your journey together be filled with love, understanding, and happiness."
    },
    Family: {
      Sentimental: "Welcome to the family! Seeing you two together warms our hearts. May your bond grow stronger every single day.",
      Funny: "Finally! We thought this day would never come. Welcome to the madness, Gauri! Good luck handling Nikhil!",
      Formal: "With love and blessings on your wedding day. We are so proud of you both and wish you a prosperous future."
    },
    Colleague: {
      Sentimental: "Wishing you both a beautiful wedding day and an even more beautiful life together. Cheers to Nikhil and Gauri!",
      Funny: "Congrats! Does this mean Nikhil gets extra leave days now? Wishing you both all the happiness in the world!",
      Formal: "Best wishes on this wonderful journey. May your life together be full of success and happiness."
    }
  };

  const handleGenerateWish = () => {
    setIsGeneratingWish(true);
    // Simulate "thinking" time
    setTimeout(() => {
      const template = wishTemplates[wishRelationship][wishTone];
      setNewMessage(template);
      setIsGeneratingWish(false);
    }, 800);
  };

  const handleConsultOracle = () => {
    if (!oracleQuestion) return;
    setIsConsultingOracle(true);
    // Simulate "consulting stars" time
    setTimeout(() => {
      const randomFortune = oracleFortunes[Math.floor(Math.random() * oracleFortunes.length)];
      setOracleAnswer(randomFortune);
      setIsConsultingOracle(false);
    }, 1500);
  };

  const updateMedia = (key, url) => {
    setMedia(prev => ({ ...prev, [key]: url }));
    setMediaErrors(prev => ({ ...prev, [key]: false }));
  };

  const handleWishSubmit = (e) => {
    e.preventDefault();
    if (newName && newMessage) {
      // Create WhatsApp Link
      const text = `Hi Nikhil & Gauri! This is ${newName}. ${newMessage}`;
      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://wa.me/?text=${encodedText}`;
      
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      
      setNewName("");
      setNewMessage("");
    }
  };

  const handleMediaError = (key) => {
    setMediaErrors(prev => ({ ...prev, [key]: true }));
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-serif overflow-x-hidden selection:bg-rose-200 relative">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(1.2); opacity: 0; }
        }
        .animate-float {
          animation: float 10s linear infinite;
        }
        .text-shadow-glow {
          text-shadow: 0 0 10px rgba(255,215,0, 0.5);
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>

      {/* Floating Config Button */}
      <button 
        onClick={() => setIsConfigOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-white p-3 rounded-full shadow-xl border border-rose-200 text-rose-500 hover:scale-110 transition-transform hover:bg-rose-50 group"
        title="Customize Images/Video"
      >
        <Camera className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-stone-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap pointer-events-none">
          Upload Files (Preview Only)
        </span>
      </button>

      <MediaConfigModal 
        isOpen={isConfigOpen} 
        onClose={() => setIsConfigOpen(false)} 
        onUpdateMedia={updateMedia}
        media={media}
      />

      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-rose-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold text-rose-600 flex items-center gap-2">
            <Heart className="w-5 h-5 fill-rose-600" />
            <span>N & G</span>
          </div>
          <div className="flex gap-4 text-sm font-medium text-stone-600">
            <button onClick={() => setActiveTab('hero')} className={`hover:text-rose-600 transition ${activeTab === 'hero' ? 'text-rose-600' : ''}`}>Home</button>
            <button onClick={() => setActiveTab('story')} className={`hover:text-rose-600 transition ${activeTab === 'story' ? 'text-rose-600' : ''}`}>Journey</button>
            <button onClick={() => setActiveTab('stars')} className={`hover:text-rose-600 transition ${activeTab === 'stars' ? 'text-rose-600' : ''}`}>Destiny</button>
            <button onClick={() => setActiveTab('wishes')} className={`hover:text-rose-600 transition ${activeTab === 'wishes' ? 'text-rose-600' : ''}`}>Wishes</button>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        
        {/* HERO SECTION */}
        {activeTab === 'hero' && (
          <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center overflow-hidden bg-rose-50">
            
            <div className="absolute inset-0 w-full h-full overflow-hidden group cursor-pointer" onClick={() => setIsConfigOpen(true)}>
              {!mediaErrors.heroVideo ? (
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="absolute w-full h-full object-cover opacity-60"
                  src={media.heroVideo}
                  onError={() => handleMediaError('heroVideo')}
                />
              ) : (
                <div className="absolute inset-0 bg-stone-900/10 flex items-center justify-center bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=2000&auto=format&fit=crop')"}}>
                   <div className="bg-white/90 p-4 rounded-xl shadow-lg border-2 border-rose-400 animate-bounce flex flex-col items-center gap-2 max-w-xs">
                      <Film className="w-8 h-8 text-rose-500" />
                      <p className="text-sm font-bold text-rose-800">Video Not Found</p>
                      <p className="text-xs text-stone-600">Please put 'Image_To_Video_Generation.mp4' in the same folder as this code!</p>
                   </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-white/10 pointer-events-none"></div>
            </div>

            {[...Array(10)].map((_, i) => (
              <FloatingHeart key={i} delay={i * 1.2} left={Math.random() * 100} />
            ))}

            <div className="z-10 p-8 border-4 border-double border-amber-200 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl max-w-2xl mx-4 transform transition-all hover:scale-105 duration-700 animate-in fade-in slide-in-from-bottom-10">
              <div className="mb-4 flex justify-center">
                <div className="bg-rose-100 p-3 rounded-full">
                  <Sparkles className="w-8 h-8 text-rose-500" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-rose-600 mb-2 font-cursive tracking-tighter drop-shadow-sm">
                Nikhil & Gauri
              </h1>
              <p className="text-xl md:text-2xl text-amber-700 italic font-medium mb-8">
                Are Getting Married!
              </p>
              
              <div className="flex justify-center gap-8 items-center text-stone-700 mb-8 font-semibold">
                <div className="flex flex-col items-center">
                  <span className="text-2xl block text-blue-800">Pune</span>
                </div>
                <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl block text-green-800">Ahilyanagar</span>
                </div>
              </div>

              <div className="bg-rose-500 text-white px-8 py-3 rounded-full shadow-lg inline-block hover:bg-rose-600 transition cursor-pointer font-bold">
                Save the Date: 27th November 2025
              </div>
            </div>
          </div>
        )}

        {/* JOURNEY SECTION */}
        {activeTab === 'story' && (
          <div className="min-h-screen py-12 px-4 bg-amber-50 flex flex-col items-center">
            <h2 className="text-4xl font-bold text-amber-900 mb-8 text-center font-serif">The Royal Journey</h2>
            
            <div className="max-w-6xl w-full bg-white p-4 rounded-xl shadow-2xl border border-amber-200">
               <div 
                 className="relative w-full overflow-hidden rounded-lg shadow-inner bg-amber-100 min-h-[400px] flex items-center justify-center cursor-pointer group bg-cover bg-center"
                 onClick={() => setIsConfigOpen(true)}
                 style={{backgroundImage: mediaErrors.journeyImage ? "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2000&auto=format&fit=crop')" : 'none'}}
               >
                  {!mediaErrors.journeyImage ? (
                    <img 
                      src={media.journeyImage}
                      onError={() => handleMediaError('journeyImage')}
                      alt="Traditional art showing Nikhil in Pune and Gauri in Ahilyanagar" 
                      className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-700"
                    />
                  ) : (
                    <div className="bg-white/90 p-4 rounded-xl shadow-lg border-2 border-amber-400 animate-bounce flex flex-col items-center gap-2 max-w-xs">
                        <ImageIcon className="w-8 h-8 text-amber-600" />
                        <p className="text-sm font-bold text-amber-900">Map Not Found</p>
                        <p className="text-xs text-stone-600 text-center">Please ensure the image file is in the folder!</p>
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 pt-20 text-white text-center pointer-events-none">
                    <p className="text-lg font-serif italic">"From the majestic forts of Pune to the historic heritage of Ahilyanagar, destiny drew the map of their love."</p>
                  </div>
               </div>
            </div>

            <div className="mt-8 max-w-2xl text-center space-y-4 text-stone-700">
              <p className="text-lg leading-relaxed">
                Captured in the timeless style of royal Indian art, this painting tells the tale of two souls. 
                <span className="font-bold text-blue-700"> Nikhil</span>, standing tall in Pune, and 
                <span className="font-bold text-green-700"> Gauri</span>, gracing Ahilyanagar with her elegance. 
              </p>
            </div>
          </div>
        )}

        {/* STARS SECTION */}
        {activeTab === 'stars' && (
          <div className="min-h-screen relative flex flex-col items-center justify-center py-12 overflow-hidden bg-slate-900">
            
            <div 
              className="absolute inset-0 z-0 cursor-pointer bg-cover bg-center" 
              onClick={() => setIsConfigOpen(true)}
              style={{backgroundImage: mediaErrors.starsImage ? "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop')" : 'none'}}
            >
               {!mediaErrors.starsImage ? (
                 <img 
                   src={media.starsImage}
                   onError={() => handleMediaError('starsImage')}
                   alt="Scorpio and Virgo constellations" 
                   className="w-full h-full object-cover opacity-80"
                 />
               ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-slate-800/90 p-4 rounded-xl shadow-lg border-2 border-blue-400 animate-bounce flex flex-col items-center gap-2 max-w-xs">
                        <Moon className="w-8 h-8 text-blue-300" />
                        <p className="text-sm font-bold text-blue-100">Stars Not Found</p>
                        <p className="text-xs text-slate-400 text-center">Please ensure the image file is in the folder!</p>
                    </div>
                  </div>
               )}
               <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply pointer-events-none"></div>
            </div>

            <div className="z-10 text-center px-4 max-w-4xl mt-32 md:mt-0 pointer-events-none">
              <h2 className="text-5xl md:text-7xl font-serif text-white mb-6 text-shadow-glow tracking-wide">
                Written in the Stars
              </h2>
              
              <div className="bg-black/40 backdrop-blur-md p-8 rounded-3xl border border-white/20 shadow-2xl pointer-events-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-white mb-8">
                  <div className="flex flex-col items-center">
                    <h3 className="text-3xl font-bold text-blue-300 mb-2">Scorpio</h3>
                    <div className="h-1 w-20 bg-blue-500 rounded-full mb-4"></div>
                    <p className="text-blue-100 text-center opacity-90 leading-relaxed text-sm">
                      Intense, passionate, and fiercely loyal. The Scorpion brings depth to the bond.
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <h3 className="text-3xl font-bold text-green-300 mb-2">Virgo</h3>
                    <div className="h-1 w-20 bg-green-500 rounded-full mb-4"></div>
                    <p className="text-green-100 text-center opacity-90 leading-relaxed text-sm">
                      Graceful, nurturing, and perfectly detailed. The Maiden brings harmony.
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-white/20 pt-6">
                  <div className="flex items-center justify-center gap-2 mb-4 text-purple-200 font-medium">
                    <Moon className="w-5 h-5" /> 
                    <span>Cosmic Oracle</span>
                  </div>
                  
                  <div className="max-w-md mx-auto">
                    <div className="flex gap-2 mb-4">
                      <input 
                        type="text" 
                        value={oracleQuestion}
                        onChange={(e) => setOracleQuestion(e.target.value)}
                        placeholder="Ask the stars (e.g., Will they travel often?)"
                        className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:bg-white/20"
                      />
                      <button 
                        onClick={handleConsultOracle}
                        disabled={isConsultingOracle || !oracleQuestion}
                        className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2"
                      >
                        {isConsultingOracle ? <Sparkles className="w-4 h-4 animate-spin-slow" /> : "Ask ✨"}
                      </button>
                    </div>

                    {oracleAnswer && (
                      <div className="bg-purple-900/50 p-4 rounded-xl border border-purple-500/30 animate-in fade-in slide-in-from-top-2 text-purple-100 italic text-sm">
                        " {oracleAnswer} "
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* WISHES SECTION */}
        {activeTab === 'wishes' && (
          <div className="min-h-screen bg-stone-50 py-12 px-4 flex flex-col items-center">
            <h2 className="text-4xl font-bold text-stone-800 mb-8 font-cursive">Wedding Wishes</h2>
            
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg border border-rose-100 mb-8">
              
              <div className="mb-6 bg-gradient-to-r from-rose-50 to-amber-50 p-4 rounded-lg border border-rose-100">
                <div className="flex items-center gap-2 text-rose-700 font-bold mb-3 text-sm">
                   <Wand2 className="w-4 h-4" /> Wish Helper
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <select 
                    value={wishRelationship}
                    onChange={(e) => setWishRelationship(e.target.value)}
                    className="p-2 text-sm border rounded bg-white text-stone-600 focus:border-rose-300 outline-none"
                  >
                    <option value="Friend">I'm a Friend</option>
                    <option value="Family">I'm Family</option>
                    <option value="Colleague">I'm a Colleague</option>
                  </select>
                  <select 
                    value={wishTone}
                    onChange={(e) => setWishTone(e.target.value)}
                    className="p-2 text-sm border rounded bg-white text-stone-600 focus:border-rose-300 outline-none"
                  >
                    <option value="Sentimental">Sweet & Emotional</option>
                    <option value="Funny">Funny & Witty</option>
                    <option value="Formal">Short & Formal</option>
                  </select>
                </div>
                <button 
                  onClick={handleGenerateWish}
                  disabled={isGeneratingWish}
                  className="w-full bg-white border border-rose-200 text-rose-600 text-sm font-medium py-2 rounded hover:bg-rose-50 transition flex justify-center items-center gap-2"
                >
                  {isGeneratingWish ? (
                    <>Thinking... <Sparkles className="w-3 h-3 animate-spin" /></>
                  ) : (
                    <>Generate a Wish for Me ✨</>
                  )}
                </button>
              </div>

              <h3 className="text-lg font-semibold text-stone-700 mb-4 flex items-center gap-2 border-t pt-4 border-stone-100">
                <Send className="w-4 h-4" /> Sign Guestbook via WhatsApp
              </h3>
              <form onSubmit={handleWishSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Write your blessing..."
                    className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-300 transition h-24 resize-none"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={!newName || !newMessage}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Send on WhatsApp <MessageCircle className="w-4 h-4 fill-white" />
                </button>
              </form>
            </div>
            
            <p className="text-sm text-stone-500 mt-8 text-center max-w-xs">
              Note: Wishes are sent directly to the couple via WhatsApp.
            </p>

          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-8 text-center mt-auto">
        <p className="flex items-center justify-center gap-2">
          Made with <Heart className="w-4 h-4 fill-rose-600 text-rose-600" /> for Nikhil & Gauri
        </p>
        <p className="text-sm mt-2 opacity-50">© 2024 Shadiverse</p>
      </footer>
    </div>
  );
}