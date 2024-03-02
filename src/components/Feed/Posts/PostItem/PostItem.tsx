import { NavLink } from "react-router-dom";
import styles from "./PostItem.module.css"
import user from "../../../../assets/Profile/usersProfileIcon.png"
import details from "../../../../assets/AdditionalyPhoto.png"
import PostInterections from "../../../Profile/PostsBlock/Post/PostInterectionsBlock/PostInterections";

function PostItem({ post, setOpenPost }: any) {
    return (
        <div className={styles.PostBox}>
            <div>
                <img src={post.usersPhoto || user} alt="" className={styles.UsersPhoto} />
            </div>
            <div className={styles.DescriptionBox}>
                <div>
                    <NavLink to={`/user/${post.userId}`}>
                        <div className={styles.UsersName}>
                            {post.fullName}
                        </div>
                    </NavLink>
                    <span className={styles.detailsBlock}>
                        <button className={styles.details}><img src={details} /></button>
                    </span>
                </div>
                <div className={styles.UsersMessage} onClick={() => {
                    setOpenPost(true);
                }}>
                    {post.postMessage}
                </div>
                <div>
                </div>
            </div>
        </div>
    )
}

export default PostItem;