import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";
import { pluginSvgr } from "@rsbuild/plugin-svgr";

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSvgr({
      svgrOptions: {
        svgo: true,
        exportType: "default",
        namedExport: "ReactComponent",
        jsxRuntime: "automatic",
      },
    }),
  ],
  html: {
    template: "./index.html",
  },
  source: {
    entry: {
      index: "./src/app/main.tsx",
    },
  },
  tools: {
    cssLoader: {
      modules: {
        auto: true,
        localIdentName: "[name]__[local]--[hash:base64:5]",
      },
    },
  },
});
