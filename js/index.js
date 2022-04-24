 getProdutos = () => JSON.parse(localStorage.getItem("ls_Produtos")) ?? []
 let count = 0
 Min=(i)=>{
     var val = document.getElementsByClassName('quantity')[i]
     if(count>0){
        count -= 1
     }
     val.innerHTML = count 
 }
 Max=(i)=>{
    produto = getProdutos()[i]
    var val = document.getElementsByClassName('quantity')[i]

     if(count<produto.estoque){
         count += 1
     }
     val.innerHTML = count

 }
 let Total= 0
 AddCar=(i)=>{

     produto = getProdutos()[i]

     Subtotal = (parseFloat(produto.preco)*count).toFixed(2)
     Total += +Subtotal
     if (count>0){
         document.getElementById("value").innerHTML += `${count} X ${produto.nome} => <br>
         ${count} x ${produto.preco}  = R$ ${parseFloat(produto.preco)*count}<br>
     `

     document.getElementById('Total').innerHTML = `Total = R$ ${Total}`
     }
 }
 NewCard=(produto, i)=>{
      document.getElementById('store').innerHTML +=
      `
     <div class="produto-container" onclick="OpenCard(this)" >
      <div class = "produto"  >

       <img class="produto-imagem"
        src='${produto.imagem}' 
        alt="${produto.nome}"/>
        </div>



     <div class = "produto-card" >
      <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <div class="info">
        <p>R$${produto.preco}</p>
        <p class="estoque">${produto.estoque} unidades disponíveis</p>
        </div>
        <div class="elements">
        <input type="button" onclick="Min(${i})" id="less" value="-"/> <p class="quantity">0</p> <input value="+" onclick="Max(${i})" type="button" id="more"/>
        <input type="button" value="Adicionar ao carrinho" class="add-car" onclick="AddCar(${i})">
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
 // debugger
 OpenCard=(i)=>{
     if(i.querySelector(".produto").style.display === 'flex'){
        i.querySelector(".produto").style.display = 'none' 
     }else{
        i.querySelector(".produto").style.display = 'none'
     }
     
}
// CloseCard=(i)=>{
//     i.querySelector("div[class=produto]:not(.elements)").style.display = 'flex'
// }

 let Msg = ""
 MsgProduct=()=>{
     Msg = document.getElementById('value').textContent + document.getElementById('Total').textContent
 }
 SendRequest=()=>{
     let CelNumber = ''
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
 document.getElementsByTagName('img')[0].addEventListener('click', Open)
 document.getElementById('del').addEventListener('click', Close)
