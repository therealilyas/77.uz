import { ViteWebfontDownload } from "vite-plugin-webfont-dl";

export default {
  plugins: [
    ViteWebfontDownload([
      "https://fonts.googleapis.com/css2?family=Fira+Sans:wght@100;200;300;400;500;600;700&display=swap",
    ]),
  ],
};
