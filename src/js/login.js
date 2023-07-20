let username = document.getElementById('username');
let password = document.getElementById('password');
const formLogin = document.getElementById('login-form');
const loginBtn = document.querySelector('.btn-login');

let userInformation = JSON.parse(localStorage.getItem('userInformation'));

// if(userInformation.username){
//     window.location.href = '/overview.html'
//   }


formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    username.value = username.value.toLowerCase();
    password.value = password.value.toLowerCase();
    loginBtn.value = 'Please Wait ...'
    try {

        let users = JSON.parse(localStorage.getItem('users'));
        const userCheking = users.find(find => find.username == username.value && find.password == password.value)

        if (!userCheking) throw new Error('invaled username or password')
        loginBtn.value = 'loging ...'
        let userInformation = {
            userId: userCheking.id,
            username: userCheking.username,
            name: userCheking.fullName,
            photo: userCheking.photo
        }

        localStorage.setItem('userInformation', JSON.stringify(userInformation))

        window.location.href = '/overview.html'

        console.log(userInformation)
    } catch (error) {
        alert(error)
    }



});