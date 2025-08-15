import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

const CustomToaster: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on mount
    checkMobile();

    // Add resize listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <Toaster 
      position={isMobile ? "bottom-center" : "top-center"}
      toastOptions={{
        duration: 2000,
        style: {
          background: '#ffffff',
          color: '#1e293b',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          maxWidth: '400px',
        },
        success: {
          style: {
            background: '#f0f9ff',
            color: '#0c4a6e',
            border: '1px solid #7dd3fc',
            borderLeft: '4px solid #0ea5e9',
          },
          iconTheme: {
            primary: '#0ea5e9',
            secondary: '#ffffff',
          },
        },
        error: {
          style: {
            background: '#fef2f2',
            color: '#991b1b',
            border: '1px solid #fca5a5',
            borderLeft: '4px solid #dc2626',
          },
          iconTheme: {
            primary: '#dc2626',
            secondary: '#ffffff',
          },
        },
        loading: {
          style: {
            background: '#fefce8',
            color: '#92400e',
            border: '1px solid #fde047',
            borderLeft: '4px solid #eab308',
          },
          iconTheme: {
            primary: '#eab308',
            secondary: '#ffffff',
          },
        },
      }}
    />
  );
};

export default CustomToaster;
