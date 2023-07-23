const displayLocation = document.querySelector('#display-location');
const weatherCondition = document.querySelector('#weather-condition');

const allCity = async function(){

    try {
        const response = await fetch('../src/data/conditions.json');
        const data = await response.json()
        console.log(data);
        displayLocation.innerHTML = '';
        data.map(fil =>{
            
            const html  = `
            
            
            <option value="value"> Select City</option>
            

            
            `;

            
            

        });


        
    } catch (error) {
        console.log(error)
    }
  
}

allCity();