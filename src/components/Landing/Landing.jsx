import { Button } from "@nextui-org/react";
import LinkAppLogo from "../../assets/LinkApp-Logo.png";
import { NavLink } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <header
        className={
          "flex min-h-[5vh] max-h-[10vh] border-b-1.5 border-solid border-black items-center px-5 py-0.5"
        }
      >
        <div className={"flex ml-2 font-bold text-5xl justify-start h-[100%]"}>
          <img
            className={"min-h-[30px] max-h-[55px] min-w-[30px] max-w-[55px]"}
            src={LinkAppLogo}
            alt={""}
          />
          LinkApp
        </div>
        <div
          className={"flex w-[100%] justify-end h-[100%] items-center max-mr-3"}
        >
          <NavLink to={"/login"}>
            <Button size={"lg"} className={"font-bold mx-1"} color={"primary"}>
              Войти
            </Button>
          </NavLink>
          <NavLink to={"/register"}>
            <Button size={"lg"} className={"font-bold"} color={"primary"}>
              Зарегистрироваться
            </Button>
          </NavLink>
        </div>
      </header>
      <main className="h-[100vh] bg-[url('/public/Images/backgroundContact.png')]">
        <div className="p-20">
          <div className="flex">
            <div>
              <img
                src={LinkAppLogo}
                alt="LinkApp Logo"
                className="w-[250px] h-[250px]"
              />
            </div>
            <div className="font-bold text-[55px] max-w-12 ml-10">
              Социальная сеть будущего
            </div>
          </div>
        </div>
        <div className="p-10">
          <div className="text-2xl font-bold mb-10">Общение & Переговоры.</div>
          <div className="max-w-[50%]">
            <div className="text-xl font-bold">
              Дефицит в общении - ключевая проблема человека.
            </div>
            <div className="max-w">
              Мы предлагаем решить эту проблему с помощью нашей социальной сети.
              Не задумывайтесь о знакомствах и противоречиях. Просто
              общайтесь:).
            </div>
            <div className="mt-5 text-xl font-bold">
              Круг по интересам стало находить легче.
            </div>
            <div>
              Люди и сообщества подбираются по вашему кругу интересов благодаря
              обученным алгоритмам. Заводите новые связи, общайтесь, веселитесь!
            </div>
            <div className="mt-5 text-xl font-bold">Отношения с бизнесом.</div>
            <div>
              Для профессиональных переговоров требуется человек соответствующий
              ожиданиям. Мы закрываем эту потребность. Проводите переговоры с
              помощью видеозвонков и видеоконференций.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
