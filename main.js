var good_text = document.getElementById('text');
const now = new Date();
const hours = now.getHours();
var turn = 0;

if (4 <= hours && hours < 12){
    good_text.textContent = 'Good Morning'
    document.title = 'Good Morning'
}
else if (12 <= hours && hours < 18){
    good_text.textContent = 'Good Afternoon'
    document.title = 'Good Afternoon'
}
else if (18 <= hours && hours < 22){
    good_text.textContent = 'Good Evening'
    document.title = 'Good Evening'
}
else{
    good_text.textContent = 'Good Night'
    document.title = 'Good Night'
}

var url_weather = 'https://api.openweathermap.org/data/2.5/weather?lat=47.6693&lon=9.0799&appid=51387f71b3654879e5fb657de92e89d6'

var temp_value = document.getElementById('temp_value')
var windspeed_value = document.getElementById('windspeed_value')
var feelslike_value = document.getElementById('feelslike_value')
var winddirection_value = document.getElementById('winddirection_value')
var rain_value = document.getElementById('rain_value')
var humidity_value = document.getElementById('humidity_value')
var rain_name = document.getElementById('rain_name')
var arrow = document.getElementById('arrow')


fetch(url_weather)
    .then(response => response.json())
    .then(data => {
      /*console.log(data);*/
        temp_value.innerHTML = `${Math.floor((parseFloat(data['main']['temp']) - 273.15))}°C`
        feelslike_value.innerHTML =  `${Math.floor((parseFloat(data['main']['feels_like']) - 273.15))}°C`
        humidity_value.innerHTML =  `${data['main']['humidity']}%`
        windspeed_value.innerHTML = `${Math.floor(parseFloat(data['wind']['speed'])* 3.6)}km/h`
        /*winddirection_value.innerHTML = `${Math.abs(data['wind']['deg']-180)}°`*/
        /*console.log(Math.abs(data['wind']['deg']-180))*/
        arrow.style.rotate = (`${Math.abs(data['wind']['deg']-180)}deg`)
        if (data['weather'][0]['main'] == 'Rain'){
            rain_name.innerHTML = 'Rain'
            rain_value.innerHTML = `${data['rain']['1h']}mm`
        }
        else if (data['weather'][0]['main'] == 'Snow'){
            rain_name.innerHTML = 'Snow'
            rain_value.innerHTML = `${data['snow']['1h']}mm`
        }
        else{
            rain_name.innerHTML = 'Rain'
            rain_value.innerHTML = `0mm`
        }
        
        
        document.getElementById('weather_icon').src = `img/${data['weather'][0]['icon']}.png`
       
    })

var url_train = 'https://transport.opendata.ch/v1/stationboard?id=8506133&limit=10'
var train_table = document.getElementById('train_values')

fetch(url_train)
    .then(response => response.json())
    .then(data => {
        
        for(var t=0; t<10; t++){
            var date = new Date(data['stationboard'][t]['passList'][0]['departure'])
            var formated_time = `${(date.getHours()).toString().padStart(2, '0')}:${(date.getMinutes()).toString().padStart(2, '0')}`
            var row = `<tr>
                            <td>${formated_time}</td>
                            <td>${data['stationboard'][t]['category'] + " " + data['stationboard'][t]['number']}</td>
                            <td>${data['stationboard'][t]['to']}</td>
                            <td>${data['stationboard'][t]['operator']}</td>
                            <td>${data['stationboard'][t]['passList'][0]['platform']}</td>
                            <td>+${data['stationboard'][t]['passList'][0]['delay']}</td>
                    </tr>`
            train_table.innerHTML += row;
        }
    
    })

var switch_button = document.getElementById('switch')

switch_button.addEventListener('click', () =>{
   turn += 1;
   if ((turn%2) == 1){
    var url_weather = 'https://api.openweathermap.org/data/2.5/weather?lat=47.5657&lon=9.3772&appid=51387f71b3654879e5fb657de92e89d6'

    var temp_value = document.getElementById('temp_value')
    var windspeed_value = document.getElementById('windspeed_value')
    var feelslike_value = document.getElementById('feelslike_value')
    var winddirection_value = document.getElementById('winddirection_value')
    var rain_value = document.getElementById('rain_value')
    var humidity_value = document.getElementById('humidity_value')
    var rain_name = document.getElementById('rain_name')
    
    
    fetch(url_weather)
        .then(response => response.json())
        .then(data => {
          /*console.log(data);*/
            temp_value.innerHTML = `${Math.floor((parseFloat(data['main']['temp']) - 273.15))}°C`
            feelslike_value.innerHTML =  `${Math.floor((parseFloat(data['main']['feels_like']) - 273.15))}°C`
            humidity_value.innerHTML =  `${data['main']['humidity']}%`
            windspeed_value.innerHTML = `${Math.floor(parseFloat(data['wind']['speed'])* 3.6)}km/h`
            /*winddirection_value.innerHTML = `${Math.abs(data['wind']['deg']-180)}°`*/
            arrow.style.rotate = (`${Math.abs(data['wind']['deg']-180)}deg`)
            /*console.log(Math.abs(data['wind']['deg']-180))*/

            if (data['weather'][0]['main'] == 'Rain'){
                rain_name.innerHTML = 'Rain'
                rain_value.innerHTML = `${data['rain']['1h']}mm`
            }
            else if (data['weather'][0]['main'] == 'Snow'){
                rain_name.innerHTML = 'Snow'
                rain_value.innerHTML = `${data['snow']['1h']}mm`
            }
            else{
                rain_name.innerHTML = 'Rain'
                rain_value.innerHTML = `0mm`
            }
            
            
            document.getElementById('weather_icon').src = `img/${data['weather'][0]['icon']}.png`
           
        })
    
    var url_train = 'https://transport.opendata.ch/v1/stationboard?id=8506121&limit=10'
    var train_table = document.getElementById('train_values')
    
    train_table.innerHTML = ''

    fetch(url_train)
        .then(response => response.json())
        .then(data => {
            
            for(var t=0; t<10; t++){
                var date = new Date(data['stationboard'][t]['passList'][0]['departure'])
                var formated_time = `${(date.getHours()).toString().padStart(2, '0')}:${(date.getMinutes()).toString().padStart(2, '0')}`
                if (data['stationboard'][t]['category'] == 'RE'){
                    num = '33'
                }
                else{
                    num = data['stationboard'][t]['number']
                }
                var row = `<tr>
                                <td>${formated_time}</td>
                                <td>${data['stationboard'][t]['category'] + " " + num}</td>
                                <td>${data['stationboard'][t]['to']}</td>
                                <td>${data['stationboard'][t]['operator']}</td>
                                <td>${data['stationboard'][t]['passList'][0]['platform']}</td>
                                <td>+${data['stationboard'][t]['passList'][0]['delay']}</td>
                        </tr>`
                train_table.innerHTML += row;
            }
        
        })
   }
})


var train_cont = document.getElementById('train_box')

train_cont.addEventListener('click', ()=>{
    window.location.href = 'train.html'
})
