
let list = document.querySelectorAll(".navigation li");

function activeLink() {
    list.forEach((item)=>{
        item.classList.remove("hovered");

        

       
    });
    this.classList.add("hovered");
}

list.forEach((item) => item.addEventListener("mouseover", activeLink));

// ========menu toggle=======

let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function(){
    navigation.classList.toggle("active");
    main.classList.toggle("active");
};



// read avator image 
const profileAvator = document.querySelector('#avatorImg');
// read name
const fullName = document.querySelector('#disName');


// reading data from local storage
let userinformation = JSON.parse(localStorage.getItem('userInformation'));

// set profile image 
profileAvator.attributes[1].textContent = userinformation.photo;
// set fullname name 
fullName.textContent = userinformation.name;


// logout


logOut = document.querySelectorAll('#logoutUser');

logOut.onclick = function(){
    localStorage.setItem('userInformation', null)
    
    window.location.href = '/index.html'
}

   



