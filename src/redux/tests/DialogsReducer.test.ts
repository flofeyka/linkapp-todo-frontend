import DialogsReducer, {sendMessage} from "../DialogsReducer";
import {DialogsType} from "../../types/types";

let state: DialogsType = {
    Dialogs: [],
    Messages: [],
}


it("Message should be send", () => {
    let action = sendMessage("WAR IS PEACE", 1, "Winston Smith", null);

    let newState = DialogsReducer(state, action);

    expect(newState.Messages[0]).toStrictEqual({
        id: 1,
        message: "WAR IS PEACE",
        userId: 1,
        fullName: "Winston Smith",
        usersPhoto: null,
    });
});

