/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		unoptimized: true,
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
			},
		],
	},
	env: {
		BALL_DONT_LIE_API_KEY: process.env.BALL_DONT_LIE_API_KEY,
	},
};

module.exports = nextConfig;
