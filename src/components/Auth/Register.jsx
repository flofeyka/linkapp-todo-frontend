import {Button, Input} from "@nextui-org/react";
import {NavLink} from "react-router-dom";
import {useForm} from "react-hook-form";

export default function Register() {
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) => console.log(data);

    return <form onSubmit={handleSubmit(onSubmit)}>
        <div className={"h-screen flex flex-col items-center justify-center bg-[aliceblue]"}>
            <div className={"min-h-[62vh] max-h-[80vh] min-w-[25vw] max-w-[100vw] shadow-2xl rounded-xl flex flex-col items-center justify-center bg-white p-4"}>
                <div className={"font-semibold text-5xl flex justify-center my-5"}>Регистрация</div>
                <Input {...register("email", {required: "Это поле обязательно"})} className={"mt-4"} size={"lg"} label={"Электронная почта"}/>
                <Input {...register("password", {required: "Это поле обязательно"})} className={"mt-2.5"} size={"lg"} label={"Пароль"}/>
                <Button type={"submit"} className={"my-5 font-bold"} size={"lg"} color={"primary"}>Создать аккаунт</Button>
                <div>Уже есть аккаунт? <NavLink className={"text-primary-500 font-bold"} to={"/login"}>Войти</NavLink></div>
            </div>
        </div>
    </form>
}