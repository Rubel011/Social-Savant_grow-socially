let container = document.getElementById("main-container")
let showBlogs = document.getElementById("showBlogs")
let addBlog = document.getElementById("addBlog")
const serverUrl = "https://frantic-red-pumps.cyclic.app/"
let showUsers = document.getElementById("showUsers")
let form = document.getElementById("editForm")
let authorin = document.getElementById("author")
let titlein = document.getElementById("title")
let bodyin = document.getElementById("body")
let datep = document.getElementById("date")
let typep = document.getElementById("type")
let id = document.getElementById("id")
let bimgin = document.getElementById("bimg")
let aimgin = document.getElementById("aimg")
let edit = document.getElementById("edit")
let myData;

showUsers.addEventListener("click", () => {
  fetch(`${serverUrl}users/`)
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      showUser(res)
    })


})
function showUser(mydata) {
  container.innerHTML = null;

  let table = document.createElement("table");
  table.setAttribute("id", "table")
  let thead = document.createElement("thead");
  thead.setAttribute("id", "data-table")
  let trhead = document.createElement("tr");
  let th1 = document.createElement("th");
  th1.innerText = "Id"
  let th2 = document.createElement("th");
  th2.innerText = "Name"
  let th3 = document.createElement("th");
  th3.innerText = "Email"
  let th4 = document.createElement("th");
  th4.innerText = "Password"
  trhead.append(th1, th2, th3, th4)
  thead.append(trhead)

  // tbody----------
  let tbody = document.createElement("tbody");
  mydata.forEach((data) => {
    let trbody = document.createElement("tr");
    trbody.setAttribute("id", "data-table")
    let td1 = document.createElement("td");
    td1.innerText = data._id
    let td2 = document.createElement("td");
    td2.innerText = data.name
    let td3 = document.createElement("td");
    td3.innerText = data.email
    let td4 = document.createElement("td");
    td4.innerText = data.password
    trbody.append(td1, td2, td3, td4)
    tbody.append(trbody)

  })
  table.append(thead, tbody)
  container.append(table)

}

showBlogs.addEventListener("submit", (e) => {
  e.preventDefault();


  let value = showBlogs.cars.value;
  if(value=="all"){
    displayBlogs(myData);
  }else{
    let database = myData.filter(ele => ele.type == value)
    displayBlogs(database); 
  }

})
fetchData()
function fetchData() {
  fetch(`${serverUrl}blogs/`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      myData = data;
      displayBlogs(data);
    })
    .catch(function (error) {
      console.log(error);
    })
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  let obj = {
    author: form.author.value,
    title: form.title.value,
    body: form.body.value,
    aimg: form.aimg.value,
    bimg: form.bimg.value,
    type: form.type.value,
    date: form.date.value,
  }
  if (form.priority.value == "add") {
    addProduct(obj)
  } else if (form.priority.value == "update") {
    updateProduct(obj, form.id.value)
  }
  edit.style.display = "none"
})


addBlog.addEventListener("click", () => {
  edit.style.display = "block"
})

function displayBlogs(data) {
  console.log(data);
  container.innerHTML = null;
  data.forEach((element, index) => {

    let cart = document.createElement("div");
    cart.setAttribute("class", "cart")
    let bimg = document.createElement("img");
    bimg.setAttribute("class", "bimg")
    bimg.src = element.bimg;
    let title = document.createElement("h3");
    let a = document.createElement("a");
    a.src = "#";
    a.innerText = element.title
    title.append(a);
    let date = document.createElement("div");
    date.setAttribute("class", "date")
    let time = document.createElement("p");
    time.innerText = element.date
    let read = document.createElement("p");
    read.innerText = "6 min read"
    date.append(time, read)
    let body = document.createElement("p");
    body.innerText = element.body
    let author = document.createElement("div");
    author.setAttribute("class", "author")
    let aimg = document.createElement("img");
    aimg.src = element.aimg
    let name = document.createElement("h4");
    name.innerText = element.author
    author.append(aimg, name)
    let btns = document.createElement("div");
    btns.setAttribute("class","btns")
    let del = document.createElement("button");
    del.setAttribute("class", 'delete')
    del.innerText = "Delete";
    let editbtn = document.createElement("button");
    editbtn.setAttribute('class', "editbtn")
    editbtn.innerText = "Edit";
    btns.append(del, editbtn)

    editbtn.addEventListener('click', () => {
      edit.style.display = "block"
      id.value = element._id
      authorin.value = element.author
      titlein.value = element.title
      bodyin.value = element.body
      bimgin.value = element.bimg
      aimgin.value = element.aimg
      datep.value = element.date
      typep.value = element.type

    })
    del.addEventListener("click", function () {
      // data.splice(index, 1);
      // localStorage.setItem("favourites", JSON.stringify(data));
      // displayproducts(data);
      deleteProduct(element.type, element._id)
    })


    // card.append(bimg, title, date, body, author)
    cart.append(bimg, title, date, body, author, btns);
    container.append(cart);

  });

}

function addProduct(obj) {
  // console.log( JSON.stringify(obj))
  fetch(`${serverUrl}blogs/add`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data)
      fetchData()
    })
    .catch(function (error) {
      console.log(error);
    })
}


function deleteProduct(type, id) {
  // console.log(id)
  fetch(`${serverUrl}blogs/delete/${id}`,
    {
      method: 'DELETE'

    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // fetchData()
      console.log(data)
      fetchData()
    })
    .catch(function (error) {
      console.log(error);
    })
}

function updateProduct(obj, id) {
  // console.log(id)
  fetch(`${serverUrl}blogs/update/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(obj)
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      fetchData()
      console.log(data)
    })
    .catch(function (error) {
      console.log(error);
    })
}
