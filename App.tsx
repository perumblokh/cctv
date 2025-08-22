
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { VideoPlayer } from './components/VideoPlayer';
import { UrlInput } from './components/UrlInput';
import { InstructionCard } from './components/InstructionCard';
import { InfoIcon, AlertTriangleIcon, CheckCircleIcon, ExternalLinkIcon, ServerIcon } from './components/Icons';

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

export default App;
