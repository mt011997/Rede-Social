import { ApiRequest } from "./models/api.js";

class Login{

    static entrar(){

        const token = localStorage.getItem("@RedeSocial:token")

        if(token !== null){
            window.location.assign("./src/pages/homePage.html")
        }

        const emailLogin = document.getElementById("emailUser")
        const senhaLogin = document.getElementById("senhaUser")
        const btnLogin   = document.getElementById("btnLogin")

        btnLogin.addEventListener("click", async (event) =>{

            event.preventDefault()

            const data = {
                email: emailLogin.value,
                password: senhaLogin.value
            }

            await ApiRequest.login(data)

        })
    }

}

Login.entrar()