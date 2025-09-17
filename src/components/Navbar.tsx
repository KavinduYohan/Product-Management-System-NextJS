'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  ShoppingBagIcon, 
  Bars3Icon, 
  XMarkIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

interface NavbarProps {
  isAuthenticated?: boolean;
}

export default function Navbar({ isAuthenticated = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in by checking for token
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }
  }, [pathname]);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      const data = await res.json();
  
      if (res.ok) {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        toast.success("Logged out successfully");
        router.push("/");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch {
      toast.error("An error occurred while logging out");
    }
  };

  const navigation = isLoggedIn ? [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Products', href: '/productDetails', icon: ChartBarIcon },
  ] : [
    { name: 'Features', href: '#features', icon: ChartBarIcon },
    { name: 'About', href: '#about', icon: UserIcon },
  ];

  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg group-hover:scale-110 transition-transform">
              <ShoppingBagIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
              ProductHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === item.href
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-400/50'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <UserIcon className="h-5 w-5" />
                  <span className="text-sm">Welcome back!</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-300 border border-red-400/50 rounded-lg hover:bg-red-500/30 hover:text-red-200 transition-all duration-200"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <button className="px-4 py-2 text-purple-300 border border-purple-400/50 rounded-lg hover:bg-purple-500/20 hover:text-purple-200 transition-all duration-200">
                    Login
                  </button>
                </Link>
                <Link href="/register">
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-purple-500/25">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/20 backdrop-blur-md rounded-lg mt-2 border border-white/10">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      pathname === item.href
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-400/50'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* Mobile Auth Section */}
              <div className="pt-4 mt-4 border-t border-white/10">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-3 py-2 text-gray-300">
                      <UserIcon className="h-4 w-4" />
                      <span className="text-sm">Welcome back!</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-3 py-2 bg-red-500/20 text-red-300 border border-red-400/50 rounded-lg hover:bg-red-500/30 hover:text-red-200 transition-all duration-200"
                    >
                      <ArrowRightOnRectangleIcon className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full px-3 py-2 text-purple-300 border border-purple-400/50 rounded-lg hover:bg-purple-500/20 hover:text-purple-200 transition-all duration-200">
                        Login
                      </button>
                    </Link>
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      <button className="w-full px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                        Get Started
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}