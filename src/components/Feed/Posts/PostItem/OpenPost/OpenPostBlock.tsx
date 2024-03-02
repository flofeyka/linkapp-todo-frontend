import styles from "./OpenPost.module.css";
import closer from "../../../../../assets/Closer.png"

function OpenPostBlock(props: any) {
    return <div className={styles.openPostBlock}>
        <div className={styles.openPostContainer}>
            <div className={styles.closePage}>
                <button onClick={() => {
                    props.setOpenPost(false)
                }}>
                    <img src={closer} />
                </button>
            </div>
        </div>
    </div>
}

export default OpenPostBlock;