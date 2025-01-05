let body=document.querySelector("body");
body.style.backgroundColor="#c9d6e3";
body.style.display="flex";
body.style.justifyContent="center";
body.style.flexWrap="wrap";

let header=document.createElement("h1");
header.innerText="Oru Prognozės";
header.style.width="100vw";
header.style.textAlign="center";
body.append(header);

let span=document.createElement("span");
span.style.width="100vw";
span.style.display="flex";
span.style.justifyContent="center";
span.style.marginBottom="20px";
body.append(span);

let input=document.createElement("input");
input.placeholder="Įveskite miesto pavadinimą";
span.append(input);

let button=document.createElement("button");
button.innerText="Pridėti miestą";
button.style.backgroundColor="#4daf51";
button.style.color="white";
span.append(button);

let spanSecond=document.createElement("span");
spanSecond.style.width="100vw";
spanSecond.style.display="flex";
spanSecond.style.justifyContent="center";
spanSecond.style.alignItems="center";
body.append(spanSecond);

let headerFour=document.createElement("h4");
headerFour.innerText="Pasirinkite prognozės datą:";
headerFour.style.textAlign="center";
spanSecond.append(headerFour);

let select=document.createElement("select");
spanSecond.append(select);

let optionOne=document.createElement("option");
optionOne.innerText="Šiandiena";
select.append(optionOne);

let optionTwo=document.createElement("option");
optionTwo.innerText="Rytojus";
select.append(optionTwo);

let headerSecond=document.createElement("h2");
headerSecond.innerText="Pagrindiniai Miestai";
headerSecond.style.width="100vw";
headerSecond.style.textAlign="center";
body.append(headerSecond);

let main=document.createElement("main");
main.style.display="flex";
main.style.justifyContent="center";
main.style.flexWrap="wrap";
body.append(main);


const getCity = async(city, miliseconds)=>{
    try{
        const response = await fetch(`https://api.meteo.lt/v1/places/${city}/forecasts/long-term`);
    const data =await response.json();
    for (let i=0; i<data.forecastTimestamps.length; i++){
        if(data.forecastTimestamps[i].forecastTimeUtc.includes(getDate(miliseconds))){
        return data.forecastTimestamps[i];}
    }
    }
    catch(error){
        console.log(error);
    }
}

const milisecondsNextDay=86400000;
const milisecondsToDay=0;

function getDate(miliseconds){
const currentDay=new Date().getTime();
const date=new Date(currentDay+miliseconds);
const year = date.getFullYear().toString();  
const month = (date.getMonth() + 1).toString().padStart(2, '0');  
const day = date.getDate().toString().padStart(2, '0');  
const hour = date.getHours().toString().padStart(2, '0');  
const formattedDate = `${year}-${month}-${day} ${hour}`;
return formattedDate;}


const cityArray=["Vilnius", "Kaunas", "Klaipėda", "Šiauliai", "Panevėžys", "Tauragė"];
function mainCards(city){
    let div=document.createElement("div");
    div.setAttribute("id", `${city}`);
    div.setAttribute("class", "constDiv")
    div.style.marginRight="10px";
    div.style.marginBottom="10px";
    div.style.display="flex";
    div.style.flexFlow="column wrap";
    div.style.alignItems="center";
    div.style.backgroundColor="white";
    div.style.width="25vw";
    div.style.height="15vw";
    div.style.borderRadius="25px";
    main.append(div);
    cardContent(city, milisecondsToDay, div);

}

const cardContent=async(city, time, card)=>{
    const data= await getCity(city, time);
    let pCity=document.createElement("p");
    pCity.setAttribute("id", `p${city}`);
    pCity.innerText=city;
    pCity.style.fontWeight="bold";
    pCity.style.textAlign="center";
    pCity.style.width="100%";
    card.append(pCity);

    let pTemp=document.createElement("p");
    pTemp.setAttribute("id", `pTemp${city}`);
    pTemp.innerText=`Temperatūra: ${data.airTemperature}°C`;
    pTemp.style.textAlign="center";
    card.append(pTemp);

    let pFeelsTemp=document.createElement("p");
    pFeelsTemp.setAttribute("id", `pFeelsTemp${city}`);
    pFeelsTemp.innerText=`Jutiminė temperatūra: ${data.feelsLikeTemperature}°C`;
    pFeelsTemp.style.textAlign="center";
    card.append(pFeelsTemp);

    const condition=["clear", "partly-cloudy", "cloudy-with-sunny-intervals", "cloudy", "light-rain", "rain", "heavy-rain", "thunder", "isolated-thunderstorms", "thunderstorms", "heavy-rain-with-thunderstorms", "light-sleet", "sleet", "freezing-rain", "hail", "light-snow", "snow", "heavy-snow", "fog", "null"];
    let pictureNumber=0;
    condition.forEach((el, x)=>{
        if(el==data.conditionCode){
            pictureNumber=x;
        }
    });


    let pCondition=document.createElement("img");
    pCondition.setAttribute("id", `condition${city}`);
    pCondition.alt=`${data.conditionCode}`;
    pCondition.src=`./media/${pictureNumber}.png`;
    card.append(pCondition);
}
function addedCities(city, j, time){
    if(document.getElementById("addedCities")===null){
        let headerAddedCities=document.createElement("h2");
        headerAddedCities.setAttribute("id", "addedCities")
        headerAddedCities.innerText="Pridėti miestai";
        headerAddedCities.style.width="100vw";
        headerAddedCities.style.textAlign="center";
        body.append(headerAddedCities);}
    if(document.getElementById(`${city}`)!=null){
        document.getElementById(`${city}`).remove()
    }
    let div=document.createElement("div");
    div.setAttribute("id", `${city}`);
    div.setAttribute("class", "addedClass");
    div.style.marginRight="10px";
    div.style.marginBottom="10px";
    div.style.display="flex";
    div.style.flexDirection="column";
    div.style.alignItems="center";
    div.style.backgroundColor="white";
    div.style.width="25vw";
    div.style.height="15vw";
    div.style.borderRadius="25px";
    div.style.position = "relative";
    body.append(div);

    cardContent(city, time, div);

    let buttonDelete=document.createElement("button");
    buttonDelete.innerText="Pašalinti";
    buttonDelete.setAttribute("id", `buttonDelete${city}`)
    buttonDelete.style.backgroundColor="#bd393a";
    buttonDelete.style.color="#f6f7f8";
    buttonDelete.style.width="10vw";
    buttonDelete.style.position = "absolute";
    buttonDelete.style.bottom = "10px";
    div.append(buttonDelete);
   
    buttonDelete.addEventListener("click", ()=>{
        const savedCitylist=JSON.parse(localStorage.getItem("savedCities"));
        document.getElementById(`${city}`).remove();
        savedCitylist.splice(j,1);
        localStorage.setItem("savedCities", JSON.stringify(savedCitylist));
        if(document.querySelectorAll(".addedClass").length==0){
            document.getElementById("addedCities").remove();
        }
    })
}

if (localStorage.getItem("savedCities") === null) {
    localStorage.setItem("savedCities", JSON.stringify([]));
}
const savedCitylist=JSON.parse(localStorage.getItem("savedCities"));
function onLoad(){
    for (let i=0; i<cityArray.length; i++){
        mainCards(cityArray[i]);
    }
    const savedCitylist=JSON.parse(localStorage.getItem("savedCities"));
    for(let i=0; i<savedCitylist.length; i++){
        addedCities(savedCitylist[i], i, milisecondsToDay);
    }
}
const updateCardContent=async(city, time)=>{
    const data= await getCity(city, time);
    const temperature=document.getElementById(`pTemp${city}`);
    temperature.innerText=`Temperatūra: ${data.airTemperature}°C`;

    const feelsLikeTemperature=document.getElementById(`pFeelsTemp${city}`);
    feelsLikeTemperature.innerText=`Jutiminė temperatūra: ${data.feelsLikeTemperature}°C`;

    const conditionCode=document.getElementById(`condition${city}`);
    const condition=["clear", "partly-cloudy", "cloudy-with-sunny-intervals", "cloudy", "light-rain", "rain", "heavy-rain", "thunder", "isolated-thunderstorms", "thunderstorms", "heavy-rain-with-thunderstorms", "light-sleet", "sleet", "freezing-rain", "hail", "light-snow", "snow", "heavy-snow", "fog", "null"];
    let pictureNumber=0;
    condition.forEach((el, x)=>{
        if(el==data.conditionCode){
            pictureNumber=x;
        }
    });
    conditionCode.alt=`${data.conditionCode}`;
    conditionCode.src=`./media/${pictureNumber}.png`;

}

const cityExist = async(inputValue)=>{
    try{
    const response = await fetch(`https://api.meteo.lt/v1/places/${inputValue}/forecasts/long-term`);
    const data =await response.json();
    if(data.error!=null){
        alert(`'${inputValue}' tokio ivesto miesto nėra`);
    }
    else{
        let k=0;
        for(let i=0; i<cityArray.length; i++){
            if(cityArray[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().includes(inputValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase())){
            k=k+1;
            alert(`'${inputValue}' toks miestas jau yra atvaizduojamas`)
            break
            }
        }
        if(k==0){
            isCityInLS(inputValue);
    }}
}
    catch(error){
        console.log(error);
    }}
function isCityInLS(inputValue){
    let k=0;
    const savedCitylist=JSON.parse(localStorage.getItem("savedCities"));
    for(let i=0; i<savedCitylist.length; i++){
        if(savedCitylist[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().includes(inputValue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase())){
            console.log(k);
            k=k+1;
            alert(`'${inputValue}' toks miestas jau yra atvaizduojamas`)
            break
        }
    }
    if(k==0){
        inputValue=inputValue[0].toUpperCase()+inputValue.slice(1);
        savedCitylist.push(inputValue);
        localStorage.setItem("savedCities", JSON.stringify(savedCitylist));
        if(select.options.selectedIndex===0){
        for(let i=0; i<savedCitylist.length; i++){
            addedCities(savedCitylist[i], i, milisecondsToDay);
        }}
        else{
            for(let i=0; i<savedCitylist.length; i++){
            addedCities(savedCitylist[i], i, milisecondsNextDay);
        }
    }
    }}
button.addEventListener("click", ()=>{
    if(input.value===""){
        alert("Negalima pridėti tuščio lauko");
    }
    else{
        cityExist(input.value);
        input.value="";
    }
})

onLoad();
select.addEventListener("change", ()=>{
    if(select.options.selectedIndex===0){
        for (let i=0; i<cityArray.length; i++){
            updateCardContent(cityArray[i], milisecondsToDay);
        }
        const savedCitylist=JSON.parse(localStorage.getItem("savedCities"));
    for(let i=0; i<savedCitylist.length; i++){
        updateCardContent(savedCitylist[i], milisecondsToDay);
    }

    }
    else{
        for (let i=0; i<cityArray.length; i++){
            updateCardContent(cityArray[i], milisecondsNextDay);
        }
        const savedCitylist=JSON.parse(localStorage.getItem("savedCities"));
        for(let i=0; i<savedCitylist.length; i++){
            updateCardContent(savedCitylist[i], milisecondsNextDay);
        }
    }
})



