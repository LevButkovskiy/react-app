import _ from "lodash"
import {useState} from "react"
import {useDispatch} from "react-redux"

import {asyncActions} from "../../../redux/slices/user"
import {apiRequest} from "../../../utils/request"
import Header from "../../UI/Header"
import styles from "./styles.module.scss"

export default function Login() {
	const dispatch = useDispatch()

	const [login, setLogin] = useState("")
	const [password, setPassword] = useState("")

	const onFinish = () => {
		apiRequest(
			"/user/auth",
			{},
			{
				method: "POST",
				body: {
					login,
					password,
				},
			},
		)
			.then((res) => res.data)
			.then((user) => {
				dispatch(asyncActions.setUser(user))
				window.location.href = "/chat"
			})
			.catch((res) => alert(res.error.message))
	}

	return (
		<div className={styles.login}>
			<div className={styles.form}>
				<div>Login</div>
				<input placeholder='login' value={login} onChange={(e) => setLogin(_.get(e, "target.value", ""))} />
				<input placeholder='password' type='password' value={password} onChange={(e) => setPassword(_.get(e, "target.value", ""))} />
				<button onClick={onFinish}>Войти</button>
			</div>
		</div>
	)
}
