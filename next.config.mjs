/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.b-cdn.net" },
      { protocol: "https", hostname: "i.vimeocdn.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "play.creartbox.nyc" },
      // Supabase Storage public bucket (set your project ref host).
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
