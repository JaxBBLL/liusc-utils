import buble from "rollup-plugin-buble"; // convert ES2015 with buble
import flow from "rollup-plugin-flow-no-whitespace"; // remove flow types, without leaving whitespace
import commonjs from "rollup-plugin-commonjs";
import node from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import babel from "rollup-plugin-babel";
import typescript from "rollup-plugin-typescript2";
import { uglify } from "rollup-plugin-uglify";

const LIBRARY_NAME = require("./package.json").name;
const path = require("path");
const resolve = _path => path.resolve(__dirname, "./", _path);
const version = process.env.VERSION || require("./package.json").version;
const banner =
  "/*!\n" +
  ` * ${LIBRARY_NAME}.js v${version}\n` +
  ` * (c) 2019-${new Date().getFullYear()} JaxBBLL\n` +
  " * Released under the MIT License.\n" +
  " */";

const outputs = [
  {
    file: resolve(`dist/${LIBRARY_NAME}.js`),
    format: "umd",
    env: "development"
  },
  {
    file: resolve(`dist/${LIBRARY_NAME}.min.js`),
    format: "umd",
    env: "production"
  },
  {
    file: resolve(`dist/${LIBRARY_NAME}.common.js`),
    format: "cjs"
  },
  {
    file: resolve(`dist/${LIBRARY_NAME}.esm.js`),
    format: "es"
  }
];

function buildRollupConfig(output) {
  let config = {
    input: resolve("src/index.ts"),
    plugins: [
      typescript(),
      flow(),
      node(),
      commonjs({
        include: "node_modules/**",
        extensions: [".js", ".ts"]
      }),
      replace({
        __VERSION__: version
      }),
      buble(),
      babel({
        extensions: [".js"],
        runtimeHelpers: true,
        exclude: ["node_modules/**"]
      })
    ],
    output: {
      file: output.file,
      format: output.format,
      banner,
      name: toCamel(LIBRARY_NAME)
    }
  };

  if (output.env) {
    config.plugins.unshift(
      replace({
        "process.env.NODE_ENV": JSON.stringify(output.env)
      })
    );
    if (output.env.includes("prod")) {
      config.plugins.push(uglify());
    }
  }

  return config;
}


function toCamel(str) {
  return str.replace(/([^-])(?:-+([^-]))/g, function ($0, $1, $2) {
    return $1 + $2.toUpperCase();
  });
}

export default outputs.map(buildRollupConfig);
