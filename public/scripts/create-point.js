function populateUFs(){
    const ufSelect =document.querySelector("select[name=uf]") 
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    /* .then(  res => res.json() )  também funciona no caso abaixo*/
    .then( (res) => { return res.json() })
    .then(states =>{

        for( const state of states){
            ufSelect.innerHTML = ufSelect.innerHTML + `<option value="${state.id}">${state.nome}</option>`
        }
        
    } )
}
populateUFs()

function getCities(){
    const citySelect =document.querySelector("select[name=city]")
    const stateInput =document.querySelector("input[name=state]")

    indexOfSelectState= event.target.selectedIndex
    stateInput.value= event.target.options[indexOfSelectState].text
    
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios` 

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disable = true

    fetch(url)
    /* .then(  res => res.json() )  também funciona no caso abaixo*/
    .then( (res) => { return res.json() })
    .then(cities =>{
       
        for( const city of cities){
            citySelect.innerHTML = citySelect.innerHTML + `<option value="${city.nome}">${city.nome}</option>`
        }
            citySelect.disable = false
    } )

}

    document
        .querySelector("select[name=uf]")
        .addEventListener("change", getCities)


        //COLECTOR ITENS
        //pegar todos os lis com javascript

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")
        //função faz o efeito de seleção dos itens
let selectedItems=[]

function handleSelectedItem(event){

    const itemLI = event.target 
    //adicionar ou remover uma classe com javascript
    itemLI.classList.toggle("select")
    
    const itemID = itemLI.dataset.id
    // Verificar se tem itens selecionados se sim pegar itens selecionados
    const alreadySelected =selectedItems.findIndex( (item)=>{
        const itemFound = item == itemID // ISSO SERÁ TRUE OU FALSE
        return itemFound
    })
    
    // se ja estiver selecionado, tirar da seleção  
    if(alreadySelected >=0){
        //tira da selecao
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemID 
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{//se nao estiver selecionado 
        selectedItems.push(itemID)

    }
    collectedItems.value = selectedItems  
}