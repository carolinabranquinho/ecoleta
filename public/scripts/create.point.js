
function populateUFs(){
    const ufSelect = document.querySelector('select[name=uf]');

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then( states => {
        for( const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event){
    const citySelect = document.querySelector('select[name=city]');
    const stateInput = document.querySelector('input[name=state]');

    const uf = event.target.value;
    const index = event.target.selectedIndex;
    stateInput.value = event.target.options[index].text;

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`;

    citySelect.innerHTML = '<option value>Selecione a Cidade </option>'
    citySelect.disabled = true;

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false;
    })
}

document.querySelector("select[name=uf]")
.addEventListener("change", getCities)


// Itens de Coleta

const itensToCollect = document.querySelectorAll(".items-grid li");

for(const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = [];

function handleSelectedItem(event){
    const itemLi = event.target;

    itemLi.classList.toggle("selected");
    const itemId = itemLi.dataset.id;
    
    const alreadySelected = selectedItems.
    findIndex( item => item == itemId );

    if(alreadySelected >= 0){
        const filteredItemns = selectedItems.filter( item => {
            const itemIsDiferent = item != itemId;
            return itemIsDiferent;
        })

        selectedItems = filteredItemns;
    } else{
        selectedItems.push(itemId);
    }

    collectedItems.value = selectedItems;
}
