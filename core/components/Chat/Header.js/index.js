import _ from "lodash"

import styles from "./styles.module.scss"

export default function Header({name}) {
	return (
		<div className={styles.header} id='header'>
			<img className={styles.avatar} src='https://joeschmoe.io/api/v1/random' alt='avatar' />
			<div className={styles.reciever}>
				<div className={styles.name}>{name}</div>
				<div className={styles.online}>Был в сети вчера</div>
			</div>
		</div>
	)
}
