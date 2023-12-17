/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["cdn.myanimelist.net", "files.yande.re", "assets.yande.re"],
  },
};

module.exports = nextConfig;
