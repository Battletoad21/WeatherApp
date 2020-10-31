window.addEventListener('load', () => {
    const temperature = document.querySelector('.temp-line');
    const temperatureDescription = document.querySelector('.temp-description');
    const locationCity = document.querySelector('.location-city');
    const tempSpan = document.querySelector('.temperature span')
  
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        const lng = position.coords.longitude;
        const lat = position.coords.latitude;
  
        // Bypass Cors error
        const proxy = `https://cors-anywhere.herokuapp.com/`;
        const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=ce1347c161d1c05ac64d5bae6584e573`
  
        fetch(api)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            const city = data.name;
            // Temp is in Kelvin by default
            const {temp} = data.main;
            const {description} = data.weather[0]
            let weatherIcon = data.weather[0].icon

            let iconurl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
            document.getElementById("iconPic").src = iconurl; 
            
            // SET Dom elements from the API
            temperature.textContent = temp;
            temperatureDescription.textContent = description;
            locationCity.textContent = city;

            //From Kelvin To Celsius
            let celsius = temp - 273.15;
  
            // Change temperature from Celsius/Fahrenheit/Kelvin
            temperature.addEventListener('click', () => {
              if (tempSpan.textContent === "K"){
                tempSpan.textContent = "C";
                temperature.textContent = Math.floor(celsius);
              }else {
                tempSpan.textContent = "K"
                temperature.textContent = temp;
              }
            })
          });
      });
    }
  });