$('document').ready(function() {
    
    $('.results').hide();
    
    var getWeather = function (coordinates) {
        $.ajax({
            url: `https://api.darksky.net/forecast/564af446e75b203eadd30ec2db3855ec/${coordinates.lat},${coordinates.lng}`,

            jsonp: "callback",

            dataType: "jsonp",

            success: function(response){
                console.log(response);
                var currentWeather = [response.currently.temperature, response.currently.summary, response.currently.precipProbability]
                var currentTemperature = currentWeather[0];
                var currentCondition = currentWeather[1];
                var currentPrecip = Math.round(currentWeather[2]*100);
                $('.condition').text(currentCondition);
                $('.temp').text(currentTemperature);
                $('.precip').text(currentPrecip);
                
                var todayWeather = [response.daily.data[0].temperatureMax, response.daily.data[0].temperatureMin, response.daily.data[0].precipProbability]
                var todayMax = todayWeather[0];
                var todayMin = todayWeather[1];
                var todayPrecip = Math.round(todayWeather[2]*100);
                $('.today-max-temp').text(todayMax);
                $('.today-min-temp').text(todayMin);
                $('.today-precip').text(todayPrecip);
                
                var days = response.daily.data;
                dailyInfo(days);
            }
        })
    }

    var getWeatherOfLocation = function (location) {
        $.ajax({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyAS4LTkS62WqeSRlMB9fwLjTyCfTxnj6NQ`,
            success: function(response){
                console.log(response);
                var formattedAddress = [response.results[0].formatted_address];
                getWeather(response.results[0].geometry.location)
                $('.address').text(formattedAddress);
            }
        })
    }
    
    var dailyInfo = function(days){
        $('.upcoming').empty();
        var count = 0;
        days.forEach(function(day){
            count += 1; 
            var maxTemp = day.temperatureMax;
            maxTemp = maxTemp + "\xB0F"
            var minTemp = day.temperatureMin;
            minTemp = minTemp + "\xB0F"
            var iconDay = day.icon;
            if (iconDay === 'clear-day'){
                var iconDayElement = ('<i class="wi wi-day-sunny"></i>')
            }
            else if (iconDay === 'clear-night'){
                var iconDayElement = ('<i class="wi wi-night-clear"></i>')
            }
            else if (iconDay === 'partly-cloudy-day'){
                var iconDayElement = ('<i class="wi wi-day-sunny-overcast"></i>')
            }
            else if (iconDay === 'partly-cloudy-night'){
                var iconDayElement = ('<i class="wi wi-night-alt-partly-cloudy"></i>')
            }
            else if (iconDay === 'cloudy'){
                var iconDayElement = ('<i class="wi wi-cloudy"></i>')
            }
            else if (iconDay ==='rain'){
                var iconDayElement = ('<i class="wi wi-rain"></i>')
            }
            else if (iconDay === 'sleet'){
                var iconDayElement = ('<i class="wi wi-sleet"></i>')
            }
            else if (iconDay === 'snow'){
                var iconDayElement = ('<i class="wi wi-snow"></i>')
            }
            else if (iconDay === 'wind'){
                var iconDayElement = ('<i class="wi wi-stong-wind"></i>')
            }
            else{
                var iconDayElement = ('<i class="wi wi-day-fog"></i>')
            }
        
            
            if (count<7){
                var dayElement = `
                <div class = "day">
                    <p class="weekday-name"> ${ moment.unix(day.time).format('dddd')} </p>
                    ${iconDayElement}
                    <p class="summary">${day.summary}</p>
                    <p class="maxData">High: ${maxTemp}</p>
                    <p class="minData">Low: ${minTemp}</p>
                </div>
                `
                $('.upcoming').append(dayElement);
            }
            
        })
    }
    
    $('.submit-button').click(function(e) {
        $('.first').slideUp();
        $('.results').slideDown();
        var location = $('#city').val();
        getWeatherOfLocation(location);
    })
    
//    $("input").keypress(function (e){
//        if (event.which == 13){
//            event.preventDefault();
//            $('.first').slideUp();
//            $('.results').slideDown();
//            var location = $('#city').val();
//            getWeatherOfLocation(location);
//        }
//    }
    
    
    
    $('.nav-submit-button').click(function(e){
        var location = $('#city2').val();
        getWeatherOfLocation(location);
    })
    
})
