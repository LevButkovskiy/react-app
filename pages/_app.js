import "antd/dist/antd.css"

import "../styles/globals.css"

import Head from "next/head"

function MyApp({Component, pageProps, router}) {
	return (
		<div>
			<Head>
				<title>{Component.title ? `${Component.title} | ` : ""}App</title>
			</Head>
			<Component {...pageProps} />
		</div>
	)
}

export default MyApp
