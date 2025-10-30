let mySearchInput = document.querySelector("#search");
let myRowInput = document.querySelector("#myrow");

function search(city) {
  // لو فيه مدينة جاية من البرامتر، استخدمها
  // لو مفيش، استخدم اللي في الـ input
  // لو مفيش حاجة خالص، استخدم cairo
  let cityName = city || mySearchInput.value.trim() || "cairo";

  let url = `https://api.weatherapi.com/v1/forecast.json?key=c66fa49b282c4e5297c180646252406&q=${cityName}&days=3`;

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
      display(data.forecast.forecastday, data.location.name);
    })
    .catch(function(error) {
      console.error(error);
      myRowInput.innerHTML = `
        <h2 class="bg-dark text-white text-center p-3 rounded-2">Error fetching data.</h2>
      `;
    });
}

function display(daysArray, cityName) {
  let cartona = "";

  for (let i = 0; i < daysArray.length; i++) {
    let dayData = daysArray[i];

    // تحويل التاريخ لاسم اليوم
    let date = new Date(dayData.date);
    let dayName = date.toLocaleDateString("en-US", { weekday: "long" });

    cartona += `
      <div class="col-lg-4 ">
        <div class="item text-white p-3 rounded-3 bg-dark m-2">
          <div class="header d-flex justify-content-between bg-black p-3">
            <span>${dayName}</span>
            <span>${dayData.date}</span>
          </div>
          <div class="body text-center">
            <h3 class="my-3">${cityName}</h3>
            <img src="https:${dayData.day.condition.icon}" alt="">
            <p class="my-2">${dayData.day.condition.text}</p>
            <p>Max: ${dayData.day.maxtemp_c}°C</p>
            <p>Min: ${dayData.day.mintemp_c}°C</p>
          </div>
        </div>
      </div>
    `;
  }

  myRowInput.innerHTML = cartona;
}

// أول ما الصفحة تفتح، يعرض القاهرة
window.addEventListener("DOMContentLoaded", function() {
  search("cairo");
});




















// let mySearchInput=document.querySelector("#search");
// let myRowInput=document.querySelector("#myrow");

// let http = new XMLHttpRequest();
// http.open("GET","https://api.weatherapi.com/v1/forecast.json?key=c66fa49b282c4e5297c180646252406&q=london&days=3");
// http.send();
// let data =[];
// http.addEventListener("load",function(){
//     data.push(JSON.parse(http.response));
//     console.log(data);
// })
// const currentDate = new Date();
// // console.log(currentDate); // Outputs the current date and time
// // JSON.parse(http.response);

// function display (arr){
//     var cartona ="";
//     for(var i=0; i<data.length; i++){
//         cartona+=` 
//           <div class="col-lg-4 ">
//       <div class="item">
//         <div class="header">satarday</div>
//           <div class="body">
//             <div>${data.lat}</div>
//           </div>
//       </div>
//     </div> `
//     }
//     document.getElementById("myRow").innerHTML=cartona;
// }



// function search(){
//     var word =mySearchInput.value;
//  var Searchedcountry =[];
//      for(var i=0; data.length; i++){
//         // if(data[i]==word){
//         //     Searchedcountry.push(data[i]);
//         //     break;
//         // }  
//        ;
//     }
//     if(Searchedcountry==""){
//         document.getElementById("myRow").innerHTML=`<h2 class=" bg-dark text-white text-center p-3 rounded-2">NO DATA TO SHOW</h2>`;
//     }
//     else{
//         display(Searchedcountry);
//     }
// }