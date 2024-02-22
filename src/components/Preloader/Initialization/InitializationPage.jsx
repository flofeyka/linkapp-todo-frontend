import React from "react";
import styles from "./Initialization.module.css"
import Logo from "../../../assets/logo.png";
import Preloader from "../Preloader";
function InitializationPage() {
    return <div className={styles.InitializingWaiter}>
        <div className={styles.LogoContainer}>
            <div>
                <img src={Logo} alt="Initialize logo in the center of screen"/>
            </div>
            <div className={styles.LoaderContainer}>
                <Preloader className={styles.Loader}/>
            </div>
        </div>
    </div>
}

export default InitializationPage;