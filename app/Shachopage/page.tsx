"use client";
import Head from 'next/head';


export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to My Website</title>
        <meta name="description" content="Welcome to my awesome website built with Next.js and Tailwind CSS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white">
        <h1 className="text-6xl font-bold animate-fade-in">
          Welcome to My Website
        </h1>
        <p className="mt-4 text-2xl animate-fade-in">
          This is the coolest website built with Next.js and Tailwind CSS
        </p>
        <div className="mt-10">
          <a
            href="#"
            className="px-6 py-3 bg-white text-purple-500 font-semibold rounded-md shadow-md hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Get Started
          </a>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 2s ease-in-out;
        }
      `}</style>
    </>
  );
}
