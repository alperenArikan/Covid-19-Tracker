const countryStatisticCol = document.getElementById("countryStatisticCol");
const countrySearchForm = document.getElementById("countrySearchForm");
const totalCasesWorldwideSection = document.getElementById("total-cases-worldwide");
const countryStatisticsTable = document.getElementById("countryTableBody");

countrySearchForm.addEventListener("submit",getSpecsificData);
document.addEventListener("DOMContentLoaded",getTotalCases);
document.addEventListener("DOMContentLoaded", getTableStatistics(10));

for(i=0; i<3; i++){
    const countryNumberToShow = document.querySelectorAll(".custom-control-input")[i].addEventListener("input",changeCountryNumberToShow);
}

function changeCountryNumberToShow(e){
    const countryNumber = this.value;
    countryStatisticsTable.innerHTML ="";
    getTableStatistics(countryNumber);
}

function getTotalCases(){
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response =>{
        return response.json();
    })
    .then(data =>{
        const totalCasesWorldwide = new Intl.NumberFormat().format(data.cases);
        totalCasesWorldwideSection.textContent = totalCasesWorldwide;
    })
}

function getTableStatistics(number){
    fetch("https://disease.sh/v3/covid-19/countries?sort=cases")
    .then(response =>{
        return response.json();
    })
    .then(data => {
        for(i=0; i<number; i++){
            const flag = data[i].countryInfo.flag;
            const country = data[i].country;
            const totalCases = new Intl.NumberFormat().format(data[i].cases); 
            const recovered = new Intl.NumberFormat().format(data[i].recovered);
            const deaths = new Intl.NumberFormat().format(data[i].deaths);

            countryStatisticsTable.innerHTML += `
            <tr>
                <th  scope="row" class=" text-left text-muted"><img src="${flag}"/>  (${country})</th>
                <td>${totalCases}</td>
                <td>${recovered}</td>
                <td>${deaths}</td>
              </tr>
            
            `
        }

    })
}

function getSpecsificData(e){
    const searchedCountry = document.getElementById("searchedCountry").value;

    if(searchedCountry ===""){
        
        countryStatisticCol.innerHTML=` 
            
        <div class="col-md-12">
            <div class="card card-cascade text-center p-4">
                <div class="view view-cascade overlay">
                <i class="fas fa-question fa-5x pink-text"></i>
                
                </div>
                <div class="card-body card-body-cascade">
                <p class="card-text">Hmm.. You forgot something...Country!!</p>
                </div>
            </div>
        </div>
        `
        e.preventDefault();
        return;
    }
    fetch(`https://disease.sh/v3/covid-19/countries/${searchedCountry}`)
    .then(function(response){
        if(!response.ok){
            return
        }
        return response.json();
    })
    .then(data =>{

        const totalCases = new Intl.NumberFormat().format(data.cases); 
        const recovered = new Intl.NumberFormat().format(data.recovered);
        const todayCases = new Intl.NumberFormat().format(data.todayCases);
        const deaths = new Intl.NumberFormat().format(data.deaths);



        countryStatisticCol.innerHTML=`
    
    <div class="col-md-4 col-lg-3 pb-4">
    <div class="card card-cascade">
        <div class="view view-cascade overlay text-center">
          <img class="card-img-top" src="/img/3622110.jpg"
            alt="Card image cap">
            <a class = "text-muted font-italic font-weight-lighter"href="http://www.freepik.com">Designed by Freepik</a>
        </div>
        <div class="card-body card-body-cascade pink lighten-1">
          <h5 class="white-text pb-2 pt-1">Total Cases</h5>
          <p class="white-text card-text">${totalCases}</p>
        </div>
    </div>
</div>

<!-- ------------------ -->

<div class="col-md-4 col-lg-3  pb-4">
    <div class="card card-cascade">
        <div class="view view-cascade overlay text-center">
          <img class="card-img-top" src="/img/3959220.jpg"
            alt="Card image cap">
            <a class = "text-muted font-italic font-weight-lighter"href="http://www.freepik.com">Designed by pikisuperstar / Freepik</a>
        </div>
        <div class="card-body card-body-cascade pink lighten-1">
          <h5 class="white-text pb-2 pt-1"> Recovered</h5>
          <p class="white-text card-text">${recovered}</p>
        </div>
    </div>
</div>

<!-- ------------------ -->


<div class="col-md-4 col-lg-3  pb-4">
    <div class="card card-cascade">
        <div class="view view-cascade overlay text-center">
          <img class="card-img-top" src="/img/3707125.jpg"
            alt="Card image cap">
            <a class = "text-muted font-italic font-weight-lighter"href="http://www.freepik.com">Designed by Freepik</a>
        </div>
        <div class="card-body card-body-cascade pink lighten-1">
          <h5 class="white-text pb-2 pt-1">Cases Today</h5>
          <p class="white-text card-text">${todayCases}</p>
        </div>
    </div>
</div>

<!-- ------------------ -->


<div class="col-md-4 col-lg-3  pb-4">
    <div class="card card-cascade">
        <div class="view view-cascade overlay text-center">
          <img class="card-img-top" src="/img/342.jpg"
            alt="Card image cap">
            <a class = "text-muted font-italic font-weight-lighter"href="http://www.freepik.com">Designed by upklyak / Freepik</a>
        </div>
        <div class="card-body card-body-cascade elegant-color">
          <h5 class="white-text pb-2 pt-1">Total Deaths</h5>
          <p class="white-text card-text">${deaths}</p>
        </div>
    </div>
</div>
    
    `

    })
    .catch(err=>{
        countryStatisticCol.innerHTML=` 
            
        <div class="col-md-12">
            <div class="card card-cascade text-center p-4">
                <div class="view view-cascade overlay">
                <i class="far fa-times-circle fa-5x pink-text"></i>
                
                </div>
                <div class="card-body card-body-cascade">
                <p class="card-text">Opps... Please Enter a Valid Country :(</p>
                </div>
            </div>
        </div>
        `
    })

    

    
    e.preventDefault();
}







