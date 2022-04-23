getProdutos = () => JSON.parse(localStorage.getItem("ls_Produtos")) ?? []


var val = document.getElementById('quantity')
count = 0
Min=()=>{
    if(count>0){
       count -= 1
       
    }
    val.innerHTML = count 
}
Max=()=>{
    count += 1
    val.innerHTML = count
}
debugger
NewCard=(produto, i)=>{

     document.getElementById('store').innerHTML +=
     `
    <div class="produto-container" >
     <div class = "produto" id="container-${i}" >
    
      <img class="produto-imagem" 
       src='${produto.imagem}' 
       alt="${produto.nome}"/>
       </div>
    
    
    
    <div class = "produto-card" id="card-${i}">
       <h3>${produto.nome}</h3>
       <p>${produto.descricao}</p>
       <div class="info">
       <p>R$${produto.preco}</p>
       <p>${produto.estoque} unidades disponíveis</p>
       </div>
       <div class="elements">
       <input type="button" onclick="Min()" id="less" value="-"/> <p id="quantity">0</p> <input value="+" onclick="Max()" type="button" id="more"/>
       <input type="button" value="Adicionar ao carrinho" id="add-car">
       </div> 
      </div> 
      </div>
   `
 

    

}

UpStore=()=>{
    lsProdutos=getProdutos()
    lsProdutos.forEach(NewCard)
}




Close = () => document.getElementById('cart').style.display = 'none'

Open = () => document.getElementById('cart').style.display = 'flex'


// Products=()=>{
//     let Total = 0
//     lsProdutos=getProdutos()
//     for (const i of lsProdutos){
//         if(produto.estoque > 0){

//         }
//     }
// }
OpenCard=(i)=>{
    document.getElementById(`container-${i}`).style.display = 'none'
    document.getElementById(`card-${i}`).style.display = 'flex'
}
CloseCard=(i)=>{
    document.getElementById(`container-${i}`).style.display = 'flex'
    document.getElementById(`card-${i}`).style.display = 'none'
}

ShowCard=(event)=>{
    if(event.target.type == 'div'){
         const [divType, i] = event.target.id.split('-')

         if(divType == 'container'){
             OpenCard(i)
             
         }else{
             CloseCard(i)
         }
    }


}
let Msg = "";
SendRequest=()=>{
    let CelNumber = ''
    Msg = Msg.replaceAll("<p>", "").replaceAll("</p>", "\n")
    Msg = Msg.replaceAll("<b>", "*").replaceAll("</b>", "*")
    let nome = document.getElementById("nome").value
    let endereco = document.getElementById("endereco").value
    Msg += `\nNome: *${nome}*`
    Msg += `\nEnderço: *${endereco}*`
    Msg = encodeURI(Msg)

    link = `https://api.whatsapp.com/send?phone=${CelNumber}&text=${Msg}`
    window.open(link, '_blanck')


}

UpStore()

// Eventos

document.getElementById('Send').addEventListener('click', SendRequest)

document.querySelector('#store').addEventListener('click', ShowCard)

document.getElementsByTagName('img')[0].addEventListener('click', Open)

document.getElementById('del').addEventListener('click', Close)
    
