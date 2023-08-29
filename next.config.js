/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config, { resolve, buildId, dev, isServer, defaultLoaders, webpack }) => {
		// 重要: 変更された設定を返す
		config.resolve.fallback = {
			...config.resolve.fallback,
			'tfhe_bg.wasm': require.resolve('tfhe/tfhe_bg.wasm'),
		}
		return config
	  },
}

module.exports = nextConfig
