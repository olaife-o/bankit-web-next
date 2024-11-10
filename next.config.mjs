/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['nigerianbanks.xyz'], // Add external domains here
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
