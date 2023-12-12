var return_arrow = document.getElementById('return_arrow')
var search_box = document.getElementById('search_box')

return_arrow.addEventListener('click', ()=>{
    window.location.href="index.html"
})

search_box.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
    getId(search_box.value);
    }
});

var station_options = document.getElementById('station_options')

function getId(place){
    var url_id = 'http://transport.opendata.ch/v1/locations?query=' + place
    fetch(url_id)
        .then(response => response.json())
        .then(data => {
            station_options.innerHTML = ""
            for(var n = 0; n < (data['stations']).length; n++){
                var opt =  `<option value="${data['stations'][n]['id']}" style="background-image: url(img/${data['stations'][n]['icon']}.png);"><span class="name_display">${data['stations'][n]['name']}</span>
                                
                            </option>`
                /*console.log(opt)*/
                station_options.innerHTML += opt
            }})
}


station_options.addEventListener('change', ()=>{
    getStationInfo(station_options.value)
})




function getStationInfo(id){
    
var url_train = `https://transport.opendata.ch/v1/stationboard?id=${id}&limit=10`
var train_table = document.getElementById('train_values')
train_table.innerHTML = ""

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
}