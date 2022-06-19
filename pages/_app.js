import "antd/dist/antd.css"

import "../styles/globals.css"

import Head from "next/head"
import {Provider} from "react-redux"

import App from "../core/components/App"
import {store} from "../core/redux/"

function MyApp({Component, pageProps, router}) {
	return (
		<Provider store={store}>
			<Head>
				<title>{Component.title ? `${Component.title} | ` : ""}App</title>
			</Head>
			<App Component={Component} pageProps={pageProps} />
		</Provider>
	)
}

export default MyApp
