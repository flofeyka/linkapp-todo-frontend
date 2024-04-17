import {Button} from "@nextui-org/react";
import LinkAppLogo from "../../assets/LinkApp-Logo.png"
import {NavLink} from "react-router-dom";

export default function Landing() {
    return <div>
        <header className={"flex min-h-[5vh] max-h-[10vh] border-b-1.5 border-solid border-black"}>
            <div className={"flex ml-2 font-bold text-5xl justify-start h-[100%]"}>
                <img className={"min-h-[30px] max-h-[55px] min-w-[30px] max-w-[55px]"} src={LinkAppLogo} alt={""}/>
                LinkApp
            </div>
            <div className={"flex w-[100%] justify-end h-[100%] items-center max-mr-3"}>
                <NavLink to={"/login"}>
                    <Button size={"lg"} className={"font-bold mx-1"} color={"primary"}>Войти</Button>
                </NavLink>
                <NavLink to={"/register"}>
                    <Button size={"lg"} className={"font-bold"} color={"primary"}>Зарегистрироваться</Button>
                </NavLink>
            </div>
        </header>
        <div className={"h-screen"}>Эко-система будущего</div>
    </div>
}