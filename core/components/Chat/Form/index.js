import _ from "lodash"

import styles from "./styles.module.scss"

export default function Form({id = "form", value, setValue, onFinish}) {
	return (
		<div className={styles.form} id={id}>
			<input className={styles.input} value={value} onChange={(e) => setValue(_.get(e, "target.value", ""))} />
			<button onClick={onFinish}>Отправить</button>
		</div>
	)
}
