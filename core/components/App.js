import {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"

import {asyncActions} from "../redux/slices/user"
import Header from "./UI/Header"

export default function App({Component, pageProps}) {
	const dispatch = useDispatch()
	const {profile: user, loading: loading} = useSelector((state) => state.user)

	useEffect(() => {
		console.log("getUser")
		dispatch(asyncActions.getUser())
	}, [])

	useEffect(() => {
		if (loading == false && !user._id && !/login/.test(window.location.pathname)) {
			window.location.href = "/login"
		}
	}, [user])

	return (
		<>
			<Header />
			<Component {...pageProps} />
		</>
	)
}
