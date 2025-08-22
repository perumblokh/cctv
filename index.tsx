
import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';

// =========== Icons ===========
interface IconProps {
  className?: string;
}

const CameraIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
    <circle cx="12" cy="13" r="3"></circle>
  </svg>
);

const VideoIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m22 8-6 4 6 4V8Z"></path>
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
  </svg>
);

const InfoIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12 16v-4"></path>
    <path d="M12 8h.01"></path>
  </svg>
);

const AlertTriangleIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
    <path d="M12 9v4"></path>
    <path d="M12 17h.01"></path>
  </svg>
);

const CheckCircleIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const ExternalLinkIcon: React.FC<IconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);

const ServerIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
    <line x1="6" y1="6" x2="6.01" y2="6"></line>
    <line x1="6" y1="18" x2="6.01" y2="18"></line>
  </svg>
);


// =========== Components ===========
const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center">
        <CameraIcon className="h-8 w-8 text-cyan-400" />
        <h1 className="text-xl md:text-2xl font-bold ml-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
          V380 Pro Web Viewer Guide
        </h1>
      </div>
    </header>
  );
};

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src }) => {
  return (
    <div className="aspect-video w-full bg-black rounded-lg overflow-hidden shadow-lg border border-gray-700 flex items-center justify-center">
      {src ? (
        <video
          key={src} // Important for React to re-mount the component on src change
          className="w-full h-full"
          controls
          autoPlay
          muted
          playsInline
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="text-center text-gray-500">
          <VideoIcon className="h-16 w-16 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-400">CCTV Stream will appear here</h3>
          <p className="text-sm">Enter a valid web-stream URL below to begin.</p>
        </div>
      )}
    </div>
  );
};

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({ onUrlSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onUrlSubmit(url.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter web-friendly stream URL (e.g., from go2rtc)"
        className="flex-grow bg-gray-800 border border-gray-600 rounded-md px-4 py-2.5 text-gray-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition duration-200"
      />
      <button
        type="submit"
        className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 px-6 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500"
      >
        Load Stream
      </button>
    </form>
  );
};

interface InstructionCardProps {
  step: number;
  title: string;
  children: React.ReactNode;
}

const InstructionCard: React.FC<InstructionCardProps> = ({ step, title, children }) => {
  return (
    <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-5 shadow-md">
      <div className="flex items-center mb-3">
        <div className="flex-shrink-0 bg-cyan-600 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
          {step}
        </div>
        <h3 className="ml-4 text-lg font-semibold text-gray-100">{title}</h3>
      </div>
      <div>{children}</div>
    </div>
  );
};

// =========== Main App Component ===========
const App: React.FC = () => {
  const [streamUrl, setStreamUrl] = useState<string>('');

  const handleUrlSubmit = useCallback((url: string) => {
    setStreamUrl(url);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Player and Input */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-cyan-400">CCTV Web Viewer</h2>
            <VideoPlayer src={streamUrl} />
            <UrlInput onUrlSubmit={handleUrlSubmit} />
          </div>

          {/* Right Column: Instructions */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-cyan-400">Cara Menggunakan Halaman Ini</h2>
            
            <InstructionCard step={1} title="Tantangan: V380 Pro & Stream Web">
              <p className="text-gray-400">
                Kebanyakan kamera V380 Pro dirancang untuk aplikasi selulernya dan tidak menyediakan link streaming web langsung yang mudah digunakan. Mereka sering menggunakan koneksi P2P (peer-to-peer) khusus yang tidak dapat dipahami oleh browser web.
              </p>
              <div className="mt-3 p-3 bg-red-900/50 border border-red-700 rounded-lg flex items-start space-x-3">
                <AlertTriangleIcon className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
                <p className="text-red-300 text-sm">
                  Keberhasilan tidak dijamin dan sepenuhnya bergantung pada model kamera spesifik Anda yang mendukung protokol streaming standar seperti RTSP.
                </p>
              </div>
            </InstructionCard>

            <InstructionCard step={2} title="Penting: Beda API & Link Streaming">
              <p className="text-gray-400">
                Anda mungkin menemukan URL seperti <code className="bg-gray-700 text-cyan-300 px-1.5 py-0.5 rounded text-sm">http://manual.av380.net/...</code> saat memeriksa lalu lintas jaringan aplikasi. URL tersebut adalah API, bukan link video.
              </p>
               <div className="mt-3 p-3 bg-blue-900/50 border border-blue-700 rounded-lg flex items-start space-x-3">
                <ServerIcon className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-blue-300 font-semibold">API Bukan Video Stream</p>
                  <p className="text-blue-400 text-sm">
                    API tersebut digunakan untuk mengambil data (seperti manual atau pengaturan), bukan untuk siaran video langsung. Streaming video menggunakan protokol yang berbeda (misalnya RTSP). Fokus Anda harus tetap mencari URL RTSP.
                  </p>
                </div>
              </div>
            </InstructionCard>
            
            <InstructionCard step={3} title="Temukan URL RTSP Kamera Anda">
              <p className="text-gray-400">
                Tujuan Anda adalah menemukan URL RTSP (Real Time Streaming Protocol). Ini adalah protokol paling umum untuk streaming CCTV lokal.
              </p>
              <ul className="list-disc list-inside text-gray-400 mt-2 space-y-1">
                <li>Cari di internet: <code className="bg-gray-700 text-cyan-300 px-1.5 py-0.5 rounded text-sm">"[Model Kamera Anda] RTSP URL"</code>.</li>
                <li>Temukan alamat IP lokal kamera Anda (misalnya, 192.168.1.55) dari halaman admin router Anda.</li>
                <li>Format URL seringkali: <code className="bg-gray-700 text-cyan-300 px-1.5 py-0.5 rounded text-sm block mt-1">rtsp://username:password@IP_ADDRESS:554/live/ch00_1</code></li>
              </ul>
            </InstructionCard>

            <InstructionCard step={4} title="Konversi RTSP untuk Web">
              <p className="text-gray-400">
                Browser web tidak dapat memutar stream RTSP secara langsung. Anda memerlukan program di jaringan lokal Anda untuk "mengonversi" stream RTSP menjadi format yang ramah web seperti HLS atau WebRTC.
              </p>
               <div className="mt-3 p-3 bg-blue-900/50 border border-blue-700 rounded-lg flex items-start space-x-3">
                <InfoIcon className="h-5 w-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-blue-300 font-semibold">Alat yang Direkomendasikan: go2rtc</p>
                  <p className="text-blue-400 text-sm">
                    Alat gratis yang populer untuk tugas ini. Anda menjalankannya di komputer di jaringan yang sama, memberinya URL RTSP Anda, dan ia menyediakan link yang dapat diputar di web.
                  </p>
                   <a href="https://github.com/AlexxIT/go2rtc" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 text-sm inline-flex items-center mt-2">
                      Lihat go2rtc di GitHub <ExternalLinkIcon className="h-4 w-4 ml-1" />
                   </a>
                </div>
              </div>
            </InstructionCard>

            <InstructionCard step={5} title="Tampilkan Stream Anda">
               <p className="text-gray-400">
                Setelah alat konversi Anda (seperti go2rtc) berjalan, ia akan memberi Anda URL baru. Inilah URL yang perlu Anda gunakan di sini.
              </p>
              <div className="mt-3 p-3 bg-green-900/50 border border-green-700 rounded-lg flex items-start space-x-3">
                <CheckCircleIcon className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <p className="text-green-300 text-sm">
                  Tempelkan URL yang ramah web (misalnya, yang berakhiran <code className="bg-gray-700 text-cyan-300 px-1 py-0.5 rounded">.m3u8</code> untuk HLS) ke kolom input di atas dan klik "Muat Stream".
                </p>
              </div>
            </InstructionCard>

          </div>
        </div>
      </main>
    </div>
  );
};

// =========== Render App ===========
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
