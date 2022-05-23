const toggle = document.querySelector('.nav_bar_toggle');
const navMenu = document.querySelector('.nav_bar_menu');
const results = document.querySelector('#show');

const longLink = document.querySelector('.long_link');
const shortLink = document.querySelector('.short_link');
const button2 = document.querySelector('#button2');

toggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    toggle.classList.toggle('is-active');
})


const button = document.getElementById('button');
var url = document.getElementById('url');
const errorMessage = document.getElementById('error_message');
const urlSection = document.querySelector('.url_section');


button.addEventListener('click', () => {
    link = /(https(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
if(url.value === "" || url.value == "null" || !url.value.match(link)){
 errorMessage.innerHTML = 'Please add a link';
 url.classList.add('active2');
    urlSection.style.paddingBottom = '10px';
} 
if(url.value.match(link)){
    results.style.display = "block";
    errorMessage.innerHTML = '';
    url.classList.remove('active2');
    urlSection.style.paddingBottom = '30px';
    if(window.innerWidth < 960){
        urlSection.style.paddingBottom = '15px';
      longLink.style.overflow = 'scroll';
    }
    const input = url.value;
        getShort(input)  
   }
})

async function getShort(input){
try{
    const urlLink =  `https://api.shrtco.de/v2/shorten?url=${input}`

    let resp = await fetch(urlLink, {method: 'GET'});
    let data = await resp.json();
        console.log(data);


        longLink.innerHTML = `${data.result.original_link}`
       var copyText = `${data.result.full_short_link}`
        shortLink.innerHTML = copyText;
       
        button2.addEventListener('click', () => {
            button2.style.backgroundColor = 'hsl(257, 27%, 26%)';
            button2.innerHTML = 'Copied!';
            navigator.clipboard.writeText(copyText);
        })

}catch(error){
    console.log()
}
}


