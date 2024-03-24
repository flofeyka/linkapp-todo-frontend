import styles from './SearchBox.module.css'
import { Field, Form, Formik, useFormik } from 'formik';
import { getUsers } from '../../../redux/FriendsReducer';
import { useAppDispatch } from '../../../redux/ReduxStore';

const SearchBoxFriends: React.FC = (props: any) => {
    const dispatch = useAppDispatch();

    return (
        <div className={styles.SearchContainer}>
            <Formik initialValues={{
                boxSearch: ""
            }}
                onSubmit={(values: any) => {
                    //@ts-ignore
                    dispatch(getUsers(props.currentPage, values.boxSearch));
                }}>
                {() => <Form>
                    <Field className={styles.textSearch} name="boxSearch" />
                    <button className={styles.ButtonSearch} type="submit">Найти</button>
                </Form>}
            </Formik>
        </div>
    )
}

export default SearchBoxFriends;