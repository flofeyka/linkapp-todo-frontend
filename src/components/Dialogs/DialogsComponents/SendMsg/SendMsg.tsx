import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "../../../../redux/DialogsReducer";
import {RootState} from "../../../../redux/ReduxStore";

function SendMessageArea() {
    const [userId, fullName, usersPhoto] = useSelector((state: RootState) => [state.AuthPage.userId, state.AuthPage.login, state.AuthPage.currentProfileImage.small])
    const dispatch = useDispatch()

    function sendMessageSubmit(values: any) {
        dispatch(sendMessage(userId, fullName, usersPhoto, values.MessageText));
    }

    return <div>
        <input/>
    </div>
}

export default SendMessageArea;