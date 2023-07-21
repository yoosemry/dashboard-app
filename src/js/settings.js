let userInformation = JSON.parse(localStorage.getItem('userInformation'));
let users = JSON.parse(localStorage.getItem('users'));

const ProfileUrl = document.querySelector('#settings_profileUrl');
const setingsProfile = document.querySelector('#setings_profile');



const UpdateProfile = function(url){

    const checkPhoto = url.find(search => search.id === userInformation.userId);
    const deleteFil = url.filter(search => search.id !== userInformation.userId);
    console.log('update user ', checkPhoto);

    console.log('remove update user' , deleteFil);

    const dataRec = {
        id: checkPhoto.id,
        fullName: checkPhoto.fullName,
        username: checkPhoto.username,
        password: checkPhoto.password,
        photo: ProfileUrl.value
    };

    const userInfo = {
              
        userId: dataRec.id,
        username: dataRec.username,
        name: dataRec.fullName,
        photo: dataRec.photo,

};

  
    localStorage.setItem('users', JSON.stringify(deleteFil));
    users = JSON.parse(localStorage.getItem('users'));
     console.log(dataRec)
      users.push(dataRec);
      localStorage.setItem('userInformation', JSON.stringify(userInfo));
    localStorage.setItem('users', JSON.stringify(users));

    ProfileUrl.value = '';

    window.location.href = '/overview.html';

}

setingsProfile.addEventListener('submit', (e)=>{
    e.preventDefault();
    UpdateProfile(users);
});

