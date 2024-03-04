import styles from './friendsitem.module.css'
import { NavLink } from 'react-router-dom';
import usersIcon from "../../../assets/Profile/usersProfileIcon.png";
import { friendsItemType } from "../../../types/types";
import { useAppDispatch } from "../../../redux/ReduxStore";
import { Follow, unFollow } from "../../../redux/FriendsReducer";

type Props = {
    followingInProgress: any
    user: friendsItemType
}

function FriendsItem({ user, ...props }: Props) {
    const dispatch = useAppDispatch();

    return <div className={styles.Friends}>
        <div className={styles.logoContainer}>
            <div>
                <NavLink to={"/user/" + user.id}>
                    <img src={user.photos.small || usersIcon} alt="" className={styles.logo} />
                </NavLink>
            </div>
            {user.followed
                ?
                <button disabled={props.followingInProgress.some((id: number) => id === user.id)}
                    className={styles.subscribe}
                    onClick={() => {
                        dispatch(unFollow(user.id));
                    }}>Отписаться</button>
                :
                <button disabled={props.followingInProgress.some((id: number) => id === user.id)}
                    className={styles.subscribe}
                    onClick={() => {
                        dispatch(Follow(user.id));
                    }}>Подписаться</button>
            }
        </div>
        <div className={styles.descriptionContainer}>
            <div className={styles.name}>
                {user.name || "Неизвестный пользователь"}
            </div>
            <div className={styles.status}>
                {user.status || "Статус отсутствует :)"}
            </div>
        </div>
    </div>
}

export default FriendsItem;