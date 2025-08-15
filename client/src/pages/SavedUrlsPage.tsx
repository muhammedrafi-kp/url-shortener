import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSavedUrls } from '../api/urlApi';
import type { IUrl } from '../types/types';
import Header from '../components/Header';

const SavedUrlsPage: React.FC = () => {
    const [savedUrls, setSavedUrls] = useState<IUrl[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSavedUrls();
    }, []);

    const fetchSavedUrls = async () => {
        try {
            setLoading(true);
            const response = await getSavedUrls();
            console.log("response :", response);
            if (response.success) {
                setSavedUrls(response.data);
            } else {
                setError(response.message || 'Failed to fetch saved URLs');
            }
        } catch (err) {
            setError('Failed to fetch saved URLs. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (shortUrl: string) => {
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopiedUrl(shortUrl);
            setTimeout(() => setCopiedUrl(null), 2000);
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = shortUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopiedUrl(shortUrl);
            setTimeout(() => setCopiedUrl(null), 2000);
        }
    };

    const formatDate = (dateString: string | Date) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50">
            <Header />

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header - Always visible */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-indigo-900 mb-4">
                            Your Saved URLs
                        </h1>
                        <p className="text-lg text-slate-600">
                            Access all your shortened URLs in one place
                        </p>
                    </div>

                    {/* Loading State - Only for URLs list */}
                    {loading ? (
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <div className="flex justify-center items-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Error Message */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm text-red-800">{error}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* URLs List */}
                            {savedUrls.length === 0 ? (
                                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4">
                                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No URLs found</h3>
                                    <p className="text-gray-500 mb-4">
                                        You haven't created any shortened URLs yet.
                                    </p>
                                    <a
                                        href="/"
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Create Your First URL
                                    </a>
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                                        <h3 className="text-lg font-medium text-gray-900">
                                            Total URLs: {savedUrls.length}
                                        </h3>

                                        <div>
                                            <button
                                                onClick={() => navigate("/")}
                                                className="px-4 py-2 text-slate-600 hover:text-indigo-600 font-medium border border-slate-300 hover:bg-gray-50 rounded-lg transition-colors"
                                            >
                                                Shorten URL</button>
                                        </div>

                                    </div>

                                    <div className="divide-y divide-gray-200">
                                        {savedUrls.map((url) => {

                                            const isCopied = copiedUrl === url.shortUrl;

                                            return (
                                                <div key={url.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                                                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                                                        <div className="flex-1 min-w-0">
                                                            {/* Original URL */}
                                                            <div className="mb-3">
                                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                                    Original URL
                                                                </label>
                                                                <p className="text-sm text-gray-900 break-all">
                                                                    {url.originalUrl}
                                                                </p>
                                                            </div>

                                                            {/* Short URL */}
                                                            <div className="mb-3">
                                                                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                                                    Shortened URL
                                                                </label>
                                                                <div className="flex items-center space-x-2">
                                                                    <p className="text-indigo-600 font-medium break-all">
                                                                        {url.shortUrl}
                                                                    </p>
                                                                    <button
                                                                        onClick={() => copyToClipboard(url.shortUrl)}
                                                                        className={`inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md transition-colors duration-200 ${isCopied
                                                                                ? 'bg-green-100 text-green-800 border-green-200'
                                                                                : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200 border-indigo-200'
                                                                            }`}
                                                                    >
                                                                        {isCopied ? (
                                                                            <>
                                                                                <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                                </svg>
                                                                                Copied!
                                                                            </>
                                                                        ) : (
                                                                            <>
                                                                                <svg className="h-3 w-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                                                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                                                                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                                                                                </svg>
                                                                                Copy
                                                                            </>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            {/* Metadata */}
                                                            <div className="flex flex-wrap items-center space-x-4 text-xs text-gray-500">
                                                                <span>Created: {formatDate(url.createdAt)}</span>
                                                                {/* <span>Short Code: {url.shortCode}</span> */}
                                                            </div>
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                                            <a
                                                                href={url.shortUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                            >
                                                                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                                Visit
                                                            </a>

                                                            <a
                                                                href={url.originalUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                            >
                                                                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                                </svg>
                                                                Original
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SavedUrlsPage;
