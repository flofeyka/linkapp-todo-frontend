import styles from './SearchBox.module.css'
import { useFormik } from 'formik';
import { getUsers } from '../../../redux/FriendsReducer';

function SearchBoxFriends(props: any) {
    let formik = useFormik({
        initialValues: {
            searchBoxText: ""
        },
        onSubmit: (values) => {
            getUsers(props.currentPage)
        }
    })

    return (
        <div className={styles.SearchContainer}>
                <input className={styles.textSearch}/>
                <button className={styles.ButtonSearch}>Найти</button>
        </div>
    )
}

export default SearchBoxFriends;