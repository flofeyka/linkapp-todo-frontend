import React from "react";
import d from "./dialogs.module.css"
import DialogItem from "./DialogsComponents/Dialogs/DialogsItem/DialogsItem";
import Message from "./DialogsComponents/Messages/Message";
import SearchDialogs from "./DialogsComponents/Dialogs/SearchDialogs/SearchDialogs";
import {useSelector} from "react-redux";
import SendMessageArea from "./DialogsComponents/SendMsg/SendMsg";
import {RootState} from "../../redux/ReduxStore";


function Dialogs() {
    const [Dialogs, Messages] = useSelector((state: RootState) => [state.MsgPage.Dialogs, state.MsgPage.Messages])

    let DialogsElements = Dialogs.map((dialog:any) => <DialogItem name={dialog.name} id={dialog.id}
                                                                  logo={dialog.logo} key={d.id}
                                                                  lastMessage={dialog.lastMessage}
                                                       date={dialog.date}/>)
    let MessagesElements = Messages.map((message: any) => <Message currentUserId={message.userId} name={message.fullName}
                                                                   usersPhoto={message.usersPhoto} message={message.message}
                                                                   id={message.id} key={message.id}/>)
    return <div className={d.dialogs}>
        <div>
            <SearchDialogs/>
            {DialogsElements}
        </div>
        <div>
            {MessagesElements}
            <SendMessageArea/>
        </div>
        <div>
        </div>
    </div>

}


export default Dialogs;