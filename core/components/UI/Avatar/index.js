import styles from "./styles.module.scss"

export default function Avatar() {
	return <img className={styles.avatar} src='https://joeschmoe.io/api/v1/random' alt='avatar' />
}
