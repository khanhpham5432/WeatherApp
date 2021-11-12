 // API call
 function GetInfo(){
  var queryUrl = "https://api.openweathermap.org/data/2.5/onecall?";//tạo biến 

  //tạo biến lat để lấy id lat-select từ tài liệu bên html bằng pt getElementById
  var lat=document.getElementById('lat-select');
  var apiOptions = "units=metric&exclude=minutely,alerts&";
  var apiKey = "appid=dbb76c5d98d5dbafcb94441c6a10236e";
  var file = queryUrl + lat.value + "&" + apiOptions + apiKey;

  fetch(file)//truyền đường file vào fetch và trả về một repo
    .then((response) => response.json())
    //truy cập đến dữ liệu của đường dẫn file
    .then((data) => {
    // Weather main data
    var timezone = document.getElementById('time-zone');
    var countryE1 = document.getElementById('country');
    timezone.innerHTML = data.timezone;
    countryE1.innerHTML = data.lat + 'N ' + data.lon + 'E ';


    var description = data.current.weather[0].description;
    var temp = Math.round(data.daily[0].temp.day);
    var wind_speed = data.daily[0].wind_speed;
    var humidity = data.daily[0].humidity;
    var name = "Thời Tiết Hôm Nay";
    var iconName=data.daily[0].weather[0].icon;
    //Icons
    var iconBaseUrl = "http://openweathermap.org/img/wn/";
    var iconFormat = ".png";
    var weatherName=iconBaseUrl + iconName + iconFormat;
    
    //thời tiết hôm nay
    document.getElementById("wrapper-description").innerHTML = description;
    document.getElementById("wrapper-temp").innerHTML =temp + "°C";
    document.getElementById("wrapper-wind").innerHTML = wind_speed +" m/s";
    document.getElementById("wrapper-humidity").innerHTML = humidity + "%";
    document.getElementById("wrapper-name").innerHTML = name;
    document.getElementById("wrapper-icon").src =weatherName;
  
   // Thời tiết hàng giờ
   // Nhiệt độ 6 giờ liên tiếp
   //Lây icon thời tiết hàng giờ
   for(var i=0;i<6;i++){
    var iconHourNow = data.hourly[i].weather[0].icon;
    document.getElementById("wrapper-icon-hour"+i).src = iconBaseUrl + iconHourNow + iconFormat;
    document.getElementById("wrapper-hour"+i).innerHTML = Math.round(data.hourly[i].temp) + "°";
    if(i>5){
      i=0;
    }
    }
    // Nhiệt độ 6 giờ liên tiếp
    for(var i=0;i<6;i++){
      document.getElementById("wrapper-hour"+i).innerHTML = Math.round(data.hourly[i].temp) + "°";
      if(i>5){
        i=0;
      }
    }
    // Thời Gian 6 giờ liên tiếp
    var timeNow = new Date().getHours();
    var time1 = timeNow + 1;
    var time2 = time1 + 1;
    var time3 = time2 + 1;
    var time4 = time3 + 1;
    var time5 = time4 + 1;
    //kiểm tra nếu quá 24 quay về 0
    if(time1>23){
      time1=time1-24;
    }
    if(time2>23){
      time2=time2-24;
    }
    if(time3>23){
      time3=time3-24;
    }
    if(time4>23){
      time4=time4-24;
    }
    if(time5>23){
      time5=time5-24;
    }
    document.getElementById("wrapper-time1").innerHTML ="Giờ:"+ time1;
    document.getElementById("wrapper-time2").innerHTML ="Giờ:"+ time2;
    document.getElementById("wrapper-time3").innerHTML ="Giờ:"+ time3;
    document.getElementById("wrapper-time4").innerHTML ="Giờ:"+ time4;
    document.getElementById("wrapper-time5").innerHTML ="Giờ:"+ time5;
  
   //Lây icon thời tiết hàng giờ
   for(var i=0;i<6;i++){
     let iconHourNow = data.hourly[i].weather[0].icon;
     let iconFullyUrlHourNow = iconBaseUrl + iconHourNow + iconFormat;
     document.getElementById("wrapper-icon-hour"+i).src = iconFullyUrlHourNow;
     if(i>5){
       i=0;
     }
   }

  
    // thời tiết 3 ngày
    for(var i=0;i<3;i++){
      document.getElementById("wrapper-icon-img"+i).src =iconBaseUrl + data.daily[i].weather[0].icon + iconFormat;
      document.getElementById("wrapper-forecast-temp-min"+i).innerHTML =Math.round(data.daily[i].temp.min) + "°";
      document.getElementById("wrapper-forecast-temp-max"+i).innerHTML = Math.round(data.daily[i].temp.max) + "°";
      document.getElementById("wrapper-forecast-temp-speed"+i).innerHTML ="Tốc độ:" + data.daily[i].wind_speed + "m/s";
      document.getElementById("wrapper-forecast-temp-humidity"+i).innerHTML ="Độ ẩm:" + data.daily[i].humidity + "%";
      if(i>2){
        i=0;
      }
    }
  
    //cập nhật lịch 3 ngày tới
    var day = new Date().getDay();
    var day1=day + 1;
    var day2=day1+1;

    if(day1>6){
      day1=0;
    }
    if(day2>6){
      day2=0;
    }
    var days = ['Chủ Nhật','Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    document.getElementById("days1").innerHTML =days[day];
    document.getElementById("days2").innerHTML =days[day1];
    document.getElementById("days3").innerHTML =days[day2];


    //thời tiết 7 ngày
    for(var i=0;i<7;i++){
      document.getElementById("weather-seven__icon"+i).src =iconBaseUrl + data.daily[i].weather[0].icon + iconFormat;
      document.getElementById("weather-seven-temp-min"+i).innerHTML =Math.round(data.daily[i].temp.min) + "°";
      document.getElementById("weather-seven-temp-max"+i).innerHTML = Math.round(data.daily[i].temp.max) + "°";
      document.getElementById("weather-seven-temp-speed"+i).innerHTML ="Tốc độ:" + data.daily[i].wind_speed + "m/s";
      document.getElementById("weather-seven-temp-humidity"+i).innerHTML ="Độ ẩm:" + data.daily[i].humidity + "%";
      if(i>6){
        i=0;
      }
    }

     //cập nhật lịch 7 ngày tới
     var daySeven = new Date().getDay();
     var daySeven1=daySeven + 1;
     var daySeven2=daySeven1 + 1;
     var daySeven3=daySeven2 + 1;
     var daySeven4=daySeven3 + 1;
     var daySeven5=daySeven4 + 1;
     var daySeven6=daySeven5 + 1;

     if(daySeven1>6){
      daySeven1=daySeven1-7;
     }
     if(daySeven2>6){
      daySeven2=daySeven2-7;
     }
     if(daySeven3>6){
      daySeven3=daySeven3-7;
     }
     if(daySeven4>6){
      daySeven4=daySeven4-7;
     }
     if(daySeven5>6){
      daySeven5=daySeven5-7;
     }
     if(daySeven6>6){
      daySeven6=daySeven6-7;
     }
     console.log(daySeven6);
     var daySevens = ['Chủ Nhật','Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
     document.getElementById("seven-day0").innerHTML =daySevens[daySeven];
     document.getElementById("seven-day1").innerHTML =daySevens[daySeven1];
     document.getElementById("seven-day2").innerHTML =daySevens[daySeven2];
     document.getElementById("seven-day3").innerHTML =daySevens[daySeven3];
     document.getElementById("seven-day4").innerHTML =daySevens[daySeven4];
     document.getElementById("seven-day5").innerHTML =daySevens[daySeven5];
     document.getElementById("seven-day6").innerHTML =daySevens[daySeven6];

  });
};
// dung event onload để thực thi ngay lập tức load trang
// ban đầu sẽ lấy value của TP.Hồ chí minh
function DefaultScreen(){
     GetInfo();
  }




/* thời gian */
var days = ['Chủ Nhật','Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
var months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
var timeEl = document.getElementById('time');
var dateEl = document.getElementById('date');

setInterval(() => {
    var time = new Date();
    var month = time.getMonth();
    var date = time.getDate();
    var day = time.getDay();
    var hour = time.getHours();
    var hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    var minutes = time.getMinutes();
    var ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);
