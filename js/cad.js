

Open = () => document.getElementById('container').style.display = 'flex'

Close = () => {
    Clear()
    document.getElementById('container').style.display = 'none'
}



getProdutos = () => JSON.parse(localStorage.getItem("ls_Produtos")) ?? []
setProdutos = (lsProdutos)=>localStorage.setItem("ls_Produtos", JSON.stringify(lsProdutos))


Delete = (i)=>{
    lsProdutos = getProdutos()
    lsProdutos.splice(i,1)
        setProdutos(lsProdutos)
        alert("Produto deletado!")
        UpTable()
} 
Update =(i, produto)=>{
    lsProdutos = getProdutos()
    lsProdutos[i]=produto
    setProdutos(lsProdutos)
}
Create=(produto)=>{
    lsProdutos=getProdutos()
    lsProdutos.push(produto)
    setProdutos(lsProdutos)
}
Clear=()=> {
    const fields = document.querySelectorAll("form input")
    for(i=0;i<fields.length;i++){
        fields[i].value = ""
}

document.getElementById('nome').dataset.i = 'novo'
}
Validate=()=>
{
    const fields = document.getElementsByTagName("input")
    for(i=0;i<fields.length;i++){
        if(fields[i].value!=""){
            return true
        } else{
                return false
            }
}}

Save=()=> {

    if(Validate()==true){
           const produto={
               imagem: document.getElementById('imagem').value,
                 nome: document.getElementById('nome').value,
                 descricao: document.getElementById('descricao').value,
                 preco: document.getElementById('preco').value,
                 estoque: document.getElementById('estoque').value
             } 
             const i = document.getElementById('nome').dataset.i
              if(i=='novo'){
             Create(produto) 
                 UpTable()
                 alert('Produto adicionado')
                 Close()
                 Clear()
            
            
         }else{
             Update(i,produto)
             alert('Produto atualizado')
      
             UpTable()
             Close()
         }

                     
              
         }
         
 }

 ClearTable=()=>{
     rows = document.querySelectorAll('tbody tr')
     rows.forEach(row=>row.parentNode.removeChild(row))
 }
 UpTable=()=>{
     lsProdutos=getProdutos()
     ClearTable()
     lsProdutos.forEach(NewRow)
 }

 NewRow=(produto, i)=>{
     document.getElementById('tbody').innerHTML +=
     `
     <td>${i}</td>
     <td>${produto.imagem}</td>
     <td>${produto.nome}</td>
     <td>${produto.descricao}</td>
       <td>${produto.estoque}</td>
     <td>R$ ${produto.preco}</td>
     <td>
     <input type="image" src="icons/editing.png" class="Add" onclick="Edit(${i})">
     <input type="image" src="icons/delete.png" class="Delete" onclick="Delete(${i})" >
 </td>
     
     `


     

 }
 Fields = (produto)=>{
    document.getElementById('imagem').value = produto.imagem
    document.getElementById('nome').value = produto.nome
    document.getElementById('descricao').value = produto.descricao
    document.getElementById('preco').value = produto.preco
    document.getElementById('estoque').value = produto.estoque
    document.getElementById('nome').dataset.i= produto.i

 }
 Edit=(i)=>{
     produto=getProdutos()[i]
     produto.i = i
     Fields(produto)
     Open()
 }



 UpTable()





document.getElementById("btn").addEventListener("click", Save)
document.getElementById('close').addEventListener("click", Close)
document.getElementById('btn-add').addEventListener("click", Open)


