import React from "react";
import styles from "./FormControl.module.css";
export function Textarea({input, meta, ...props}) {
    return <div>
        <textarea {...input} {...meta} {...props}/>
    </div>
}

export function Input({input, meta, ...props}) {
    return <div className={styles.formControl}>
        {meta.touched && meta.error && <div className={styles.errorText}>{meta.error}</div>}
        <input className={styles.error} {...input} {...meta} {...props}/>
    </div>
}