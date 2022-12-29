import { ApiRequest } from "./models/api.js";

const ul = document.querySelector(".main__postagens")

class HomePage{

    // LogOut

    static logOut(){

        const btnLogOut = document.querySelector(".logOut")
        const token = localStorage.getItem("@RedeSocial:token")

        if(token == undefined){
            window.location.assign("../../index.html")
        }

        btnLogOut.addEventListener("click", () =>{

            localStorage.clear()
            window.location.assign("../../index.html")
        })
    }

    // Perfil

    static async usuarioLogado(){

        let id = localStorage.getItem("@RedeSocial:User_id")
        let api = await ApiRequest.usuario(id)

        const div1 = document.querySelector(".main__container--img")
        const div2 = document.querySelector(".main__container--dados")
        const div3 = document.querySelector(".main__container--seguidores")
        const img  = document.createElement("img")
        const h2   = document.createElement("h2")
        const span = document.createElement("span")
        const p    = document.createElement("p")

        img.src = api.image
        img.alt = "Avatar Usuário"
        h2.innerText = api.username
        span.innerText = api.work_at
        p.innerText = `${api.followers_amount} seguidores`

        div1.append(img)
        div2.append(h2, span)
        div3.append(p)
    }

    //Posts

    static async renderPosts(){

        let api = await ApiRequest.posts()
      
        ul.innerHTML = ""
        api.results.reverse().forEach((elem) =>{
            
            const li        = document.createElement("li")
            const div1      = this.div("cardImg")
            const imgAvatar = this.img(elem.author.image)
            const div2      = this.div("cardDados")
            const h3        = this.h3(elem.author.username)
            const p         = this.p(elem.author.work_at)
            const div3      = this.div("cardPost")
            const h2        = this.h2(elem.title)
            const spanPost  = this.span1(elem.description)
            const div4      = this.div("cardRodape")
            const button    = this.btn(elem.uuid, "Abrir Post")
            const imgLike   = document.createElement("img")
            const span2     = this.span2(elem.likes.length)

            span2.classList.add("likes")
            imgLike.src = "../../src/assets/heartBlack.png"
            imgLike.alt = "ImgOff"
            
            // if(idpost == undefined){
            //     imgLike.id  = elem.uuid
            // }else{
            //     imgLike.id = idpost
            // }
            

            const meuId = localStorage.getItem("@RedeSocial:User_id")
            
            elem.likes.forEach((element) =>{

                if(element.user.uuid == meuId){
                    imgLike.src = "../../src/assets/heartRed.png"
                    imgLike.alt = "ImgOn"
                }

            })

            imgLike.addEventListener("click", async ()=>{
               
                const postId = button.id
                const data = {
                    post_uuid: postId
                }
                
                if(imgLike.alt == "ImgOff"){
                  
                    imgLike.src = "../../src/assets/heartRed.png"   
                    imgLike.alt = "ImgOn"
                    span2.innerText = (elem.likes.length) +1
                    const teste2 = await ApiRequest.curtir(data)
                    imgLike.id = teste2
                   
                }

                else{
                    imgLike.src = "../../src/assets/heartBlack.png"
                    imgLike.alt = "ImgOff"
                    if(span2.innerText !== 0){
                        span2.innerText = (elem.likes.length)
                    }
                    await ApiRequest.descurtir(imgLike.id)
        
                }
            })

            li.classList.add("postagens--card")
            button.classList.add("abrirPost")

            ul.append(li)
            li.append(div1, div2, div3, div4)
            div1.append(imgAvatar)
            div2.append(h3, p)
            div3.append(h2, spanPost)
            div4.append(button, imgLike, span2)

            button.addEventListener("click", (event) => {
                event.preventDefault()
                const id = button.id
                const modal = document.querySelector(".modal")
                modal.innerHTML = ""
                modal.classList.toggle("hidden")

                this.modal(id)
            })

            return ul
        })

        return api

    }

    static div(classe){
        const div = document.createElement("div")
        div.classList.add(classe)
        return div
    }

    static img(src){
        const img = document.createElement("img")
        img.src = src
        img.alt = "Avatar Imagem"
        return img
    }

    static h3(nome){
        const h3 = document.createElement("h3")
        h3.innerText = nome
        return h3
    }

    static p(trabalho){
        const p = document.createElement("p")
        p.innerText = trabalho
        return p
    }

    static h2(titulo){
        const h2 = document.createElement("h2")
        h2.innerText = titulo
        return h2
    }

    static span1(desc){
        const span = document.createElement("span")
        span.innerText = desc
        return span
    }

    static btn(id, text){
        const btn = document.createElement("button")
        btn.innerText = text
        btn.id = id
        return btn
    }

    static span2(qtd){
        const span = document.createElement("span")
        span.innerText = qtd
        return span
    }

    //Postagem

    static async criarPost(){
        const titulo = document.getElementById("postUser")
        const descricao = document.getElementById("postDescricao")
        const btnPostar = document.getElementById("postar")

        btnPostar.addEventListener("click", async (event) => {

            event.preventDefault()
            ul.innerHTML = ""

            const data = {
                title: titulo.value,
                description: descricao.value
            }
            
            await ApiRequest.criarPostagem(data)
            location.reload()
        })
    }    

    static async modal(id){

        const api = await ApiRequest.posts()

        return api.results.forEach((elem) => {
            
            if(elem.uuid == id){
                
                const div1    = document.querySelector(".modal")
                const section = document.createElement("section")
                const div2    = this.div("modal--container")
                const div3    = this.div("modal--cardImg")
                const img     = this.img(elem.author.image)
                const div4    = this.div("modal--cardDados")
                const h3      = this.h3(elem.author.username)
                const p       = this.p(elem.author.work_at)
                const div5    = this.div("modal--close")
                const btnFechar   = document.createElement("button")
                const div6    = this.div("modal--cardPost")
                const h2      = this.h2(elem.title)
                const span2   = this.span2(elem.description)

                section.classList.add("modal--bcg")
                section.classList.add("showModal")
                btnFechar.classList.add("buttonPrimary--geral")
                btnFechar.innerText = "X"

                div1.append(section)
                section.append(div2)
                div2.append(div3, div4, div5, div6)
                div3.append(img)
                div4.append(h3, p)
                div5.append(btnFechar)
                div6.append(h2, span2)
                
                span1.addEventListener("click", () => {
                    div1.classList.toggle("hidden")
                })

                return div1
            }
        })
       
    }

    static async aside(){

        const api = await ApiRequest.todosUsuarios()
    
        api.results.forEach(async (elem) =>{

            const ul = document.querySelector(".sugest__container")
            const li = document.createElement("li")
            const div1 = this.div("userImg")
            const img = this.img(elem.image)
            const div2 = this.div("userDados")
            const h2 = this.h2(elem.username)
            const span = this.span1(elem.work_at)
            const div3 = this.div("userSeguir")
            const btn = this.btn(elem.uuid, "Seguir")

            li.classList.add("sugest--user")

            let pessoa = await ApiRequest.usuario(btn.id)
            let myId = localStorage.getItem("@RedeSocial:User_id")

            pessoa.followers.forEach(element => {
                
                if(element.followers_users_id.uuid == myId){
                    btn.classList.add("seguindo")
                    btn.innerText = "Seguindo"
                }
            })

                btn.addEventListener("click", async () => {
                    
                    const id = btn.id
                    const usuario = await ApiRequest.usuario(id)

                    if(btn.innerText == "Seguir"){

                        const data ={
                            following_users_uuid: id
                        }

                        btn.classList.add("seguindo")
                        btn.innerText = "Seguindo"
                        await ApiRequest.seguir(data)
                            
                    }else{
                        usuario.followers.forEach( async (elem) => {                             
                            btn.classList.toggle("seguindo")
                            btn.innerText = "Seguir"
                            console.log(elem.uuid)
                            await ApiRequest.deixarDeSeguir(elem.uuid)     
                        })
                    }    
                })
                       

            ul.append(li)
            li.append(div1, div2, div3)
            div1.append(img)
            div2.append(h2, span)
            div3.append(btn)

        })

    }

}

HomePage.logOut()
HomePage.usuarioLogado()
HomePage.renderPosts()
HomePage.criarPost()
HomePage.aside()
