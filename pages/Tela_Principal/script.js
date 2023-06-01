const searchWrapper = document.querySelector('.search');
const inputBox = searchWrapper.querySelector('input');
const sugestBox = searchWrapper.querySelector('.list');
const lupa = searchWrapper.querySelector('.btn btn-outline-warning');
let linkTag = searchWrapper.querySelector('a');
let webLink;

inputBox.onkeyup =(e)=>{
    let userData = e.target.value;
    let emptyArray = [];

    if (e.key === 'Enter')
    {
        if (userData)
        {
            window.open(`/pages/=${userData}/index.html`);
        }
    }

    if (userData)
    {
        lupa.onclick = ()=>{
            webLink = `/pages/=${userData}/index.html`
            linkTag.setAttribute('href', webLink);
            linkTag.click();
        }

        emptyArray = sugestoes.filter((data)=>{
            return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());
        })
        emptyArray = emptyArray.map((data)=>{
            return data = `<li>${data}</li>`;
        })
        searchWrapper.classList.add('active');
        ShowSuggestions(emptyArray);
        let allList = sugestBox.querySelectorAll('li');
        for (let i = 0; i < allList.length; i++) {
            allList[i].setAttribute('onclick', 'select(this)');z    
        } 
    }
}

function select(element){
    let selectData = element.textContent;
    inputBox.value = selectData;
    lupa.onclick = ()=>{
        webLink = `/pages/=${selectData}/index.html`
        linkTag.setAttribute('href', webLink);
        linkTag.click();
    }
    searchWrapper.classList.remove('active');
}

function ShowSuggestions(list){
    let listData;
    if (!list.length){
        userValue = inputBox.value;
        listData = `<li>${userData}</li>`
    }
    else {
        listData = list.join('');
    }

    sugestBox.innerHTML = listData;
}