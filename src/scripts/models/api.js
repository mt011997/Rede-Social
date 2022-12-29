export class ApiRequest{

    static baseUrl = "https://m2-rede-social.herokuapp.com/api/"
    static token   = localStorage.getItem("@RedeSocial:token")
    static userId  = localStorage.getItem("@RedeSocial:User_id")
    static headers = {
        "Content-Type": "application/json",
        authorization: `Token ${this.token}`
    }

    static async cadastro(data){
        const registroUsuario = await fetch(`${this.baseUrl}users/`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            if(res.email == "user with this email already exists."){
                alert (res.email)
                location.reload()
            }else{
                window.location.assign("../../index.html")
            }
        })
        .catch(err => err)

        return registroUsuario
    }

    static async login(data){
        const loginUsuario = await fetch(`${this.baseUrl}users/login/`,{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            
            localStorage.setItem("@RedeSocial:token", res.token)
            localStorage.setItem("@RedeSocial:User_id", res.user_uuid)

            if(res.token !== undefined){
                window.location.assign("./src/pages/homePage.html")
            }else{

                const modal = document.querySelector(".modal")
                modal.classList.toggle("hidden")

                localStorage.clear()

                const btnModal = document.querySelector(".modal__container--button")
                btnModal.addEventListener("click", (event) =>{
                    event.preventDefault()
                    modal.classList.toggle("hidden")
                    location.reload()
                })
            }

        })
        .catch(err => console.log(err))

        return loginUsuario
    }

    static async usuario(id){
        const user = await fetch(`${this.baseUrl}users/${id}/`,{
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .catch(err => err)

        return user
    }

    static async posts(){
        const post = await fetch(`${this.baseUrl}posts/?limit=2000&offset=50/`,{
            method: "GET",
            headers: this.headers
        })
        .then(res => res.json())
        .catch(err => console.log(err))

        return post
    }

    static async criarPostagem(data){
        const post = await fetch(`${this.baseUrl}posts/`,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        })

        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log(err))

        return post 
    }

    static async todosUsuarios(){

        const usuarios = await fetch(`${this.baseUrl}users/?limit=100&offset=50`,{

            method: "GET",
            headers: this.headers,
        })
        .then(res => res.json())
        .catch(err => err)

        return usuarios
    }

    static async seguir(data){
        const segue = await fetch(`${this.baseUrl}users/follow/`,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))

        
    }

    static async deixarDeSeguir(id){
        const naoSegue = await fetch(`${this.baseUrl}users/unfollow/${id}/`,{
            method: "DELETE",
            headers: this.headers,
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))

        return naoSegue
    }

    static async curtir(data){
        const teste = []
        const curtir = await fetch(`${this.baseUrl}likes/`,{
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => res)
        .then(res => {    
            teste.push(res.uuid)
            console.log(res)
        })
        .catch(err => console.log(err))
        
        return teste
    }

    static async descurtir(id){
        const descurtir = await fetch(`${this.baseUrl}likes/${id}/`,{
            method: "DELETE",
            headers: this.headers,
        })
        .then(res => res)
        .then(res => console.log(res))
        .catch(err => console.log(err))
        console.log(descurtir)
        return descurtir

    }
    
}
