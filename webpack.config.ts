require("dotenv").config();
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import path from "path";
import AssetsPlugin from "assets-webpack-plugin";

export default ({app = "admin", mode = "development", context = "/"} = {}) => {
    console.log(app, "--ap-");
    if (!app) throw "Please Provide an app name";
    const publicPath = context + "apps/" + app + "/";
    const src = path.resolve(__dirname, "frontend", app);
    const output = path.resolve(__dirname, "assets", "apps", app);
    const is_development = mode === "development";
    return {
        mode,
        devtool: is_development ? "source-map" : false,
        entry: [
            path.resolve(src, "index.ts"),
            path.resolve(src, "index.scss"),
        ],
        output: {
            path: output,
            publicPath,
            filename: is_development ? "[name].js" : "[name].[hash].js"
        },
        optimization: {
            runtimeChunk: "single",
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /node_modules/,
                        name: "vendor",
                        enforce: true,
                        chunks: "initial"
                    }
                }
            },
            minimizer: [
                new TerserPlugin({parallel: true}),
                new OptimizeCSSAssetsPlugin({})
            ],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: [
                        {
                            loader: "ts-loader",
                            options: {
                                transpileOnly: is_development,
                                experimentalWatchApi: is_development,
                                configFile: "../tsconfig.json"
                            }
                        }
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.(js|ts|tsx)$/,
                    exclude: /node_modules/,
                    loader: "eslint-loader",
                    options: {
                        failOnError: true,
                        quiet: true
                    },
                },
                {
                    test: /index\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                {
                    test: /\.scss$/,
                    use: ["sass-loader"]
                },
                // {
                //     test: /\.css$/i,
                //     use: ["css-loader"]
                // },
                {
                    test: /\.(svg|jpg|png|jpeg|gif|eot|woff|ttf|ico|mp4|csv|pdf)/,
                    use: "file-loader"
                }

            ]
        },
        resolve: {extensions: [".js", ".json", ".ts", ".tsx"]},
        plugins: [
            new MiniCssExtractPlugin({chunkFilename: is_development ? "[name].css" : "[name].[hash].css"}),
            new AssetsPlugin({
                path: path.resolve(output),
                filename: "assets.json"
            })
        ]
    };
};
