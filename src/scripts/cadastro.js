import { ApiRequest } from "./models/api.js"

class Cadastro{

    static criarUsuario(){

        const nome      = document.getElementById("userName")
        const email     = document.getElementById("emailUser")
        const senha     = document.getElementById("senhaUser")
        const trabalho  = document.getElementById("jobUser")
        const avatar    = document.getElementById("imgUser")
        const button    = document.getElementById("btnRegistrar")

        button.addEventListener("click", async (event) => {

            event.preventDefault()

            const data = {
                username: nome.value,
                email: email.value,
                password: senha.value, 
                work_at: trabalho.value, 
                image: avatar.value
            }
            
            await ApiRequest.cadastro(data)
        })

    }

}

Cadastro.criarUsuario()