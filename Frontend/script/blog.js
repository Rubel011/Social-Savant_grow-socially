let mainContainer=document.getElementById("main-container");
let small=document.getElementById("small");
let latest=document.getElementById("latest");
let social=document.getElementById("social");
let news=document.getElementById("news");
let podcasts=document.getElementById("podcasts");
let openBlog=document.getElementById("openBlog");
let case1=document.getElementById("case1");

let data;

fetch('https://63981671fe03352a94c468ef.mockapi.io/blogs/')
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        data=res
        displayCard(res[1].latest);
        console.log(res);
    })
small.addEventListener("click",()=>{
    displayCard(data[0].small)
})
latest.addEventListener("click",()=>{
    displayCard(data[1].latest)
})
social.addEventListener("click",()=>{
    displayCard(data[2].social)
})
news.addEventListener("click",()=>{
    displayCard(data[2].news)
})
podcasts.addEventListener("click",()=>{
    displayCard(data[2].podcasts)
})
openBlog.addEventListener("click",()=>{
    displayCard(data[2].openBlog)
})
case1.addEventListener("click",()=>{
    displayCard(data[2].case1)
})

    function displayCard(data){
        mainContainer.innerHTML=null;

        data.forEach((ele)=>{
            let card=document.createElement("div");
            let img=document.createElement("img");
            img.src=ele.bimg
            img.setAttribute("class","body_img")
            let title=document.createElement("h3");
            let a=document.createElement("a");
            a.src="#";
            a.innerText=ele.title
            title.append(a);
            let date=document.createElement("div");
            date.setAttribute("class","date")
            let time=document.createElement("p");
            time.innerText=ele.date
            let read=document.createElement("p");
            read.innerText=ele.time
            date.append(time,read)
            let body=document.createElement("p");
            body.innerText=ele.body
            let author=document.createElement("div");
            let aimg=document.createElement("img");
            aimg.src=ele.aimg
            let name=document.createElement("h3");
            author.append(aimg,name)
            card.append(img,title,date,body,author)
            mainContainer.append(card)
        })
    }