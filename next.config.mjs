/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/home',
          permanent: true, // 永続的なリダイレクト（301リダイレクト）
        },
      ];
    },
  };
  
  export default nextConfig;
  