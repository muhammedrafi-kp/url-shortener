import React from 'react';
import { Routes, Route } from "react-router-dom";

// const URLShortenerApp = () => {


//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [url, setUrl] = useState('');
//   const [shortenedUrls, setShortenedUrls] = useState([]);
//   const [currentPage, setCurrentPage] = useState('home');
//   // const shortenUrl = () => {
//   //   if (!url.trim()) return;

//   //   const shortCode = Math.random().toString(36).substring(2, 8);
//   //   const newUrl:any = {
//   //     original: url,
//   //     shortened: `https://short.ly/${shortCode}`,
//   //     clicks: 0,
//   //     created: new Date().toLocaleDateString()
//   //   };

//   //   setShortenedUrls([newUrl, ...shortenedUrls]);
//   //   setUrl('');
//   // };



//   // const LoginPage = () => (
//   //   <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 flex items-center justify-center px-4 sm:px-6">
//   //     <div className="max-w-md w-full">
//   //       {/* Header */}
//   //       <div className="text-center mb-8">
//   //         <div className="flex items-center justify-center space-x-2 mb-4">
//   //           <Link2 className="w-8 h-8 text-indigo-600" />
//   //           <span className="text-2xl font-bold text-indigo-900">ShortLink</span>
//   //         </div>
//   //         <h2 className="text-3xl font-bold text-indigo-900 mb-2">Welcome Back</h2>
//   //         <p className="text-slate-600">Sign in to your account to continue</p>
//   //       </div>

//   //       {/* Login Form */}
//   //       <div className="bg-white rounded-xl shadow-lg overflow-hidden p-4 sm:p-8 transition-all duration-300 hover:shadow-xl">
//   //         <div className="space-y-6">
//   //           <div>
//   //             <label className="block text-sm font-medium text-slate-700 mb-2">
//   //               Email Address
//   //             </label>
//   //             <div className="relative">
//   //               <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
//   //               <input
//   //                 type="email"
//   //                 className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//   //                 placeholder="Enter your email"
//   //               />
//   //             </div>
//   //           </div>

//   //           <div>
//   //             <label className="block text-sm font-medium text-slate-700 mb-2">
//   //               Password
//   //             </label>
//   //             <div className="relative">
//   //               <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
//   //               <input
//   //                 type={showPassword ? "text" : "password"}
//   //                 className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//   //                 placeholder="Enter your password"
//   //               />
//   //               <button
//   //                 type="button"
//   //                 onClick={() => setShowPassword(!showPassword)}
//   //                 className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
//   //               >
//   //                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//   //               </button>
//   //             </div>
//   //           </div>

//   //           <div className="flex items-center justify-between">
//   //             <label className="flex items-center">
//   //               <input type="checkbox" className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500" />
//   //               <span className="ml-2 text-sm text-slate-600">Remember me</span>
//   //             </label>
//   //             <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700">
//   //               Forgot password?
//   //             </a>
//   //           </div>

//   //           <button
//   //             type="button"
//   //             className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-medium active:scale-95 hover:shadow-lg"
//   //           >
//   //             Sign In
//   //           </button>
//   //         </div>

//   //         <div className="mt-6 text-center">
//   //           <p className="text-slate-600">
//   //             Don't have an account?{' '}
//   //             <button
//   //               onClick={() => setCurrentPage('signup')}
//   //               className="text-indigo-600 hover:text-indigo-700 font-medium"
//   //             >
//   //               Sign up
//   //             </button>
//   //           </p>
//   //         </div>
//   //       </div>

//   //       <div className="mt-6 text-center">
//   //         <button
//   //           onClick={() => setCurrentPage('home')}
//   //           className="text-slate-500 hover:text-slate-700"
//   //         >
//   //           ← Back to Home
//   //         </button>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );

//   // const SignupPage = () => (
//   //   <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-indigo-50 flex items-center justify-center px-4 sm:px-6">
//   //     <div className="max-w-md w-full">
//   //       {/* Header */}
//   //       <div className="text-center mb-8">
//   //         <div className="flex items-center justify-center space-x-2 mb-4">
//   //           <Link2 className="w-8 h-8 text-indigo-600" />
//   //           <span className="text-2xl font-bold text-indigo-900">ShortLink</span>
//   //         </div>
//   //         <h2 className="text-3xl font-bold text-indigo-900 mb-2">Create Account</h2>
//   //         <p className="text-slate-600">Join us to start shortening your URLs</p>
//   //       </div>

//   //       {/* Signup Form */}
//   //       <div className="bg-white rounded-xl shadow-lg overflow-hidden p-4 sm:p-8 transition-all duration-300 hover:shadow-xl">
//   //         <div className="space-y-6">
//   //           <div>
//   //             <label className="block text-sm font-medium text-slate-700 mb-2">
//   //               Full Name
//   //             </label>
//   //             <div className="relative">
//   //               <User className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
//   //               <input
//   //                 type="text"
//   //                 className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//   //                 placeholder="Enter your full name"
//   //               />
//   //             </div>
//   //           </div>

//   //           <div>
//   //             <label className="block text-sm font-medium text-slate-700 mb-2">
//   //               Email Address
//   //             </label>
//   //             <div className="relative">
//   //               <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
//   //               <input
//   //                 type="email"
//   //                 className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//   //                 placeholder="Enter your email"
//   //               />
//   //             </div>
//   //           </div>

//   //           <div>
//   //             <label className="block text-sm font-medium text-slate-700 mb-2">
//   //               Password
//   //             </label>
//   //             <div className="relative">
//   //               <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
//   //               <input
//   //                 type={showPassword ? "text" : "password"}
//   //                 className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//   //                 placeholder="Create a password"
//   //               />
//   //               <button
//   //                 type="button"
//   //                 onClick={() => setShowPassword(!showPassword)}
//   //                 className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
//   //               >
//   //                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//   //               </button>
//   //             </div>
//   //           </div>

//   //           <div>
//   //             <label className="block text-sm font-medium text-slate-700 mb-2">
//   //               Confirm Password
//   //             </label>
//   //             <div className="relative">
//   //               <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
//   //               <input
//   //                 type={showConfirmPassword ? "text" : "password"}
//   //                 className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//   //                 placeholder="Confirm your password"
//   //               />
//   //               <button
//   //                 type="button"
//   //                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//   //                 className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
//   //               >
//   //                 {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//   //               </button>
//   //             </div>
//   //           </div>

//   //           <div>
//   //             <label className="flex items-start">
//   //               <input type="checkbox" className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500 mt-0.5" />
//   //               <span className="ml-2 text-sm text-slate-600">
//   //                 I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-700">Terms of Service</a> and{' '}
//   //                 <a href="#" className="text-indigo-600 hover:text-indigo-700">Privacy Policy</a>
//   //               </span>
//   //             </label>
//   //           </div>

//   //           <button
//   //             type="button"
//   //             className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300 font-medium active:scale-95 hover:shadow-lg"
//   //           >
//   //             Create Account
//   //           </button>
//   //         </div>

//   //         <div className="mt-6 text-center">
//   //           <p className="text-slate-600">
//   //             Already have an account?{' '}
//   //             <button
//   //               onClick={() => setCurrentPage('login')}
//   //               className="text-indigo-600 hover:text-indigo-700 font-medium"
//   //             >
//   //               Sign in
//   //             </button>
//   //           </p>
//   //         </div>
//   //       </div>

//   //       <div className="mt-6 text-center">
//   //         <button
//   //           onClick={() => setCurrentPage('home')}
//   //           className="text-slate-500 hover:text-slate-700"
//   //         >
//   //           ← Back to Home
//   //         </button>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );

//   // const renderCurrentPage = () => {
//   //   switch (currentPage) {
//   //     case 'login':
//   //       return <LoginPage />;
//   //     case 'signup':
//   //       return <SignupPage />;
//   //     default:
//   //       return <HomePage />;
//   //   }
//   // };

//   // return renderCurrentPage();
// };

// export default URLShortenerApp;
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/signup' element={<LoginPage/>}/>
      </Routes>
    </>
  )
}

export default App
