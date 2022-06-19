import _ from "lodash"
import {useState} from "react"
import {useDispatch} from "react-redux"

import {asyncActions} from "../../../redux/slices/user"
import Header from "../../UI/Header"
import styles from "./styles.module.scss"

export default function Login() {
	const dispatch = useDispatch()

	const [login, setLogin] = useState("")

	return (
		<div className={styles.login}>
			<div className={styles.form}>
				<div>Login</div>
				<input placeholder='login' value={login} onChange={(e) => setLogin(_.get(e, "target.value", ""))} />
				<button
					onClick={() => {
						dispatch(asyncActions.setUser({id: login}))
						window.location.href = "/chat"
					}}
				>
					Войти
				</button>
			</div>
		</div>
	)
}
