import {useEffect} from "react"
import {useDispatch} from "react-redux"

import {asyncActions} from "../redux/slices/user"
import Header from "./UI/Header"

export default function App({Component, pageProps}) {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(asyncActions.getUser())
	}, [])

	return (
		<>
			<Header />
			<Component {...pageProps} />
		</>
	)
}
