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
    }
}