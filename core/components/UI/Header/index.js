import {useEffect} from "react"
import {useSelector} from "react-redux"

import Avatar from "../Avatar"
import styles from "./styles.module.scss"

export default function Header() {
	const user = useSelector((state) => state.user.profile)

	useEffect(() => {
		console.log(user)
	}, [user])

	return (
		<header className={styles.header}>
			{user.id} <Avatar />
		</header>
	)
}
