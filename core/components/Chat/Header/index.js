import _ from "lodash"

import Avatar from "../../UI/Avatar"
import styles from "./styles.module.scss"

export default function Header({name}) {
	return (
		<div className={styles.header} id='header'>
			<Avatar />
			<div className={styles.reciever}>
				<div className={styles.name}>{name}</div>
				<div className={styles.online}>Был в сети вчера</div>
			</div>
		</div>
	)
}
