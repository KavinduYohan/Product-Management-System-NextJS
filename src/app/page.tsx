
'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRightIcon, ShoppingBagIcon, ChartBarIcon, UserGroupIcon, CogIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="relative px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ShoppingBagIcon className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">ProductHub</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
          <div className="flex space-x-4">
            <Link href="/login">
              <button className="px-4 py-2 text-purple-400 border border-purple-400 rounded-lg hover:bg-purple-400 hover:text-white transition-all duration-300">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Manage Your
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Products</span>
              <br />With Ease
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A powerful, intuitive product management system that helps you track inventory, 
              manage products, and streamline your business operations with modern technology.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/register">
              <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2">
                <span>Start Managing Products</span>
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/login">
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-300 text-lg font-semibold rounded-xl hover:border-white hover:text-white transition-all duration-300">
                Sign In
              </button>
            </Link>
          </div>

          {/* Hero Image/Demo */}
          <div className="relative">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <ChartBarIcon className="h-12 w-12 text-purple-400 mb-4 mx-auto" />
                  <h3 className="text-white font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-300 text-sm">Track your product performance with detailed analytics</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <ShoppingBagIcon className="h-12 w-12 text-pink-400 mb-4 mx-auto" />
                  <h3 className="text-white font-semibold mb-2">Inventory Management</h3>
                  <p className="text-gray-300 text-sm">Manage your products and inventory in real-time</p>
                </div>
                <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                  <UserGroupIcon className="h-12 w-12 text-blue-400 mb-4 mx-auto" />
                  <h3 className="text-white font-semibold mb-2">Team Collaboration</h3>
                  <p className="text-gray-300 text-sm">Work together with your team seamlessly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Everything You Need to
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Succeed</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our comprehensive product management system provides all the tools you need to grow your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-2xl border border-white/10 hover:border-purple-400/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShoppingBagIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Product Management</h3>
              <p className="text-gray-300 leading-relaxed">
                Add, edit, and organize your products with an intuitive interface. Upload images, manage descriptions, and track inventory levels.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl border border-white/10 hover:border-blue-400/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ChartBarIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Advanced Analytics</h3>
              <p className="text-gray-300 leading-relaxed">
                Get insights into your product performance with detailed analytics, sales tracking, and inventory reports.
              </p>
            </div>

            <div className="group p-8 bg-gradient-to-br from-green-900/30 to-blue-900/30 rounded-2xl border border-white/10 hover:border-green-400/50 transition-all duration-300">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <CogIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Easy Integration</h3>
              <p className="text-gray-300 leading-relaxed">
                Seamlessly integrate with your existing systems and workflows. Built with modern web technologies for reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> Business?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using ProductHub to streamline their operations and boost productivity.
          </p>
          <Link href="/register">
            <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2 mx-auto">
              <span>Get Started for Free</span>
              <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <ShoppingBagIcon className="h-6 w-6 text-purple-400" />
            <span className="text-xl font-bold text-white">ProductHub</span>
          </div>
          <p className="text-gray-400">© 2025 ProductHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}