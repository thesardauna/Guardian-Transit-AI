const isProd = process.env.NODE_ENV === "production";

module.exports = {
  output: "export",
  basePath: isProd ? "/Guardian-Transit-AI" : "",
  images: {
    unoptimized: true
  }
};
