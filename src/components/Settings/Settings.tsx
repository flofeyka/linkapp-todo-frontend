import React, {useState} from "react";
import styles from "./Settings.module.css"
import user from "./../../assets/Profile/usersProfileIcon.png"
import {setNewCurrentUsersPhoto} from "../../redux/AuthReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/ReduxStore";


const Settings: React.FC = () => {
    const currentUserPhoto = useSelector((state: RootState) => state.AuthPage.currentProfileImage.large)

    const [photo, setPhoto] = useState<File>();
    const dispatch: any = useDispatch();

    function getCurrentPhoto(event: any) {
        setPhoto(event.target.files)
    }

    return <div>
        <div>
            <div>
                <img className={styles.usersPhoto} src={currentUserPhoto || user} alt={"User's avatar"}/>
            </div>
            <div>
                <input type={"file"} onChange={getCurrentPhoto}/>
                <div>
                    <button onClick={() => {
                        dispatch(setNewCurrentUsersPhoto(photo));
                    }}>Update
                    </button>
                </div>
            </div>
        </div>
        <div className={styles.UsersDescriptionBlock}>
            <div>
                FullName: <input/>
            </div>
            <div>
                Status: <input/>
            </div>
            <div>
                Nickname: flofeyka <button>Change nickname</button>
            </div>
        </div>
        <div>
            <div>
                E-mail: <input/>
            </div>
            <div>
                <button>Change</button>
            </div>
            <div>
                Password: <button>Change Password</button>
            </div>
        </div>

    </div>
}

export default Settings;
