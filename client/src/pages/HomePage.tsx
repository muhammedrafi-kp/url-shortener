
import React, { useState } from 'react';

import Header from '../components/Header';

const HomePage:React.FC = () => {

    const [url, setUrl] = useState('');
    const [shortenedUrls, setShortenedUrls] = useState([]);


    const shortenUrl = () => {
        if (!url.trim()) return;

        const shortCode = Math.random().toString(36).substring(2, 8);
        const newUrl: any = {
            original: url,
            shortened: `https://short.ly/${shortCode}`,
            clicks: 0,
            created: new Date().toLocaleDateString()
        };

        // setShortenedUrls([newUrl, ...shortenedUrls]);
        setUrl('');
    };


    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
            {/* Header */}

            <Header />
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-6 sm:py-12">
                <header className="text-center mb-8 sm:mb-16">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-indigo-900 mb-4">
                        Shorten URLs Instantly
                    </h1>
                    <div className="space-y-2 max-w-2xl mx-auto px-2">
                        <p className="text-sm md:text-lg text-slate-600">
                            Transform long URLs into short, shareable links. Fast and secure.
                        </p>
                    </div>

                    <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-4 justify-center text-xs sm:text-sm">
                        <div className="flex items-center bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm">
                            <span className="text-indigo-600">⚡</span>
                            <span className="ml-2">Instant Processing</span>
                        </div>
                        <div className="flex items-center bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm">
                            <span className="text-indigo-600">🔒</span>
                            <span className="ml-2">100% Secure</span>
                        </div>
                        <div className="flex items-center bg-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-sm">
                            <span className="text-indigo-600">📊</span>
                            <span className="ml-2">Analytics Tracking</span>
                        </div>
                    </div>
                </header>

                <main className="max-w-4xl mx-auto">
                    {/* URL Shortening Form */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-4 sm:p-8 transition-all duration-300 hover:shadow-xl mb-8">
                        <div className="flex flex-col sm:flex-row gap-4 mb-6">
                            <input
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="Enter your long URL here..."
                                className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <button
                                onClick={shortenUrl}
                                className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-medium active:scale-95 hover:shadow-lg"
                            >
                                Shorten URL
                            </button>
                        </div>
                    </div>

                    {/* Shortened URLs List */}
                    {shortenedUrls.length > 0 && (
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 transition-all duration-300">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Shortened URLs</h3>
                            <div className="space-y-4">
                                {shortenedUrls.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                                        <div className="flex-1">
                                            {/* <p className="text-sm text-slate-600 truncate mb-1">{item.original}</p> */}
                                            {/* <p className="text-indigo-600 font-medium">{item.shortened}</p> */}
                                        </div>
                                        <div className="text-right text-sm text-slate-500">
                                            {/* <p>{item.clicks} clicks</p> */}
                                            {/* <p>{item.created}</p> */}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </main>

                {/* Footer */}
                <footer className="mt-12 sm:mt-20 text-center space-y-4">
                    {/* <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-xl shadow-sm">
                        <p className="text-sm sm:text-base text-slate-600">
                            Your privacy matters. All processing is done securely and we never store your personal data.
                        </p>
                    </div> */}
                    <p className="text-xs sm:text-sm text-slate-500">© {new Date().getFullYear()} ShortLink. All rights reserved.</p>
                </footer>
            </div>
        </div>
    )

}

export default HomePage
