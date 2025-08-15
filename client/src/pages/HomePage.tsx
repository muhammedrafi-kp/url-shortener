
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { createShortUrl, getSavedUrls } from "../api/urlApi";
import { AxiosError } from "axios";
import toast from 'react-hot-toast';


const HomePage: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [url, setUrl] = useState('');
    const [shortenedUrls, setShortenedUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [newShortUrl, setNewShortUrl] = useState('');
    const [originalUrl, setOriginalUrl] = useState('');

    const navigate = useNavigate();

    const shortenUrl = async () => {
        if (!url.trim()) return;
        console.log("url:", url);

        setIsLoading(true);
        setNewShortUrl('');
        setOriginalUrl(url);

        try {
            const res = await createShortUrl(url);
            if(res.success){
                setNewShortUrl(res.data);
                toast.success('URL shortened successfully!');
            }
        } catch (error:unknown) {
            const err = error as AxiosError<{ message: string }>;
            console.error('Error while creating shortUrl:', error);
            toast.error(err?.response?.data?.message || "Something went wrong");
        } finally {
            setUrl('');
            setIsLoading(false);
        }

        // setShortenedUrls([newUrl, ...shortenedUrls]);

    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Copied to clipboard!');
        } catch (err) {
            toast.error('Failed to copy to clipboard');
        }
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
                                disabled={isLoading}
                                className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-medium active:scale-95 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Shortening...
                                    </>
                                ) : (
                                    'Shorten URL'
                                )}
                            </button>
                        </div>

                        {/* Newly Shortened URL Display */}
                        {newShortUrl && (
                            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                                <h3 className="text-lg font-semibold text-green-800 mb-3">Your Shortened URL</h3>
                                <div className="flex items-center justify-between p-3 bg-white border border-green-200 rounded-lg">
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-600 mb-1">Original URL:</p>
                                        <p className="text-gray-800 truncate">{originalUrl}</p>
                                        <p className="text-sm text-gray-600 mt-2 mb-1">Shortened URL:</p>
                                        <p className="text-green-600 font-medium break-all">{newShortUrl}</p>
                                    </div>
                                    <div className="ml-4 flex gap-2">
                                        <button
                                            onClick={() => copyToClipboard(newShortUrl)}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            Copy
                                        </button>
                                        <button
                                            onClick={() => window.open(newShortUrl, '_blank')}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                                        >
                                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            Visit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Link to Saved URLs for authenticated users */}
                        {isAuthenticated && (
                            <div className="text-center pt-4 border-t border-gray-100">
                                <p className="text-sm text-gray-600 mb-2">
                                    Want to see all your shortened URLs?
                                </p>
                                <p
                                    onClick={() => navigate('/saved-urls')}
                                    className="inline-flex items-center px-4 py-2 text-md font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 cursor-pointer transition-colors duration-200"
                                >
                                    <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    View My URLs
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Shortened URLs List */}
                    {shortenedUrls.length > 0 && (
                        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 transition-all duration-300">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Shortened URLs</h3>
                            <div className="space-y-4">
                                {shortenedUrls.map((_, index) => (
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
