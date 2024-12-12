const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["./src/index.js"], // Archivo principal
    bundle: true, // Combina todos los archivos en uno
    format: "esm", // Exporta en formato ECMAScript
    outfile: "./dist/index.js", // Archivo de salida
    platform: "neutral", // Neutral para permitir uso tanto en navegador como Node.js
    external: ["react", "react-dom"], // Excluir dependencias externas
    minify: true, // Minifica el código
    sourcemap: true, // Genera un mapa de código fuente
  })
  .catch(() => process.exit(1));
