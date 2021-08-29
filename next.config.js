/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
	images: {
		domains: [process.env.IMAGE_IP]
	},
}
