/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    chatBotUrl: process.env.CHATBOT_URL,
  },
};

export default nextConfig;
