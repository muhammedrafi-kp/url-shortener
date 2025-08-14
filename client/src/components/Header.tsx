import React from 'react'
import { Link2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header:React.FC = () => {
    const navigate = useNavigate();
  return (
    <>
       <header className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Link2 className="w-8 h-8 text-indigo-600" />
                        <span className="text-2xl font-bold text-indigo-900">ShortLink</span>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={()=>navigate("/login")}
                            className="px-4 py-2 text-slate-600 hover:text-indigo-600 font-medium border border-1 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                            Login
                        </button>
                        <button
                            onClick={()=>navigate("/signup")}
                            className="px-6 py-2 bg-indigo-600 font-medium text-white rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>
    </>
  )
}

export default Header;
