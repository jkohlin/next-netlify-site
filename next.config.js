/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    allowedDevOrigins: ['192.168.1.49:3000', 'localhost:3000', '192.168.1.49:3000', 'localhost:8888'],
};

module.exports = nextConfig;