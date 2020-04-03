const ulAnniversary = document.querySelector(".js-anniversary");
const formAnniversary = document.querySelector(".js-formAnni");

let count = 0;

function displayAnniversary(date, anniversary, day){
    const temp = new Date();
    //지난 기념일은 스킵
    if(parseDate(date) >= temp && count < 7){
        const li = document.createElement("li");
        const spanAnniversary = document.createElement("span");
        const spanDate = document.createElement("span");
        const spanRemains = document.createElement("span");

        const tempDate = date.split("-");
        spanDate.innerText = `${tempDate[0]} 년 ${tempDate[1]} 월 ${tempDate[2]} 일 ${day}`;
        spanDate.classList.add("listDate");
        spanAnniversary.innerText = anniversary;
        spanAnniversary.classList.add("listAnniversary");
        spanRemains.innerText = `D - ${getRemainingDays(date, true)}`;
        spanRemains.classList.add("listRemains");

        li.appendChild(spanAnniversary);
        li.appendChild(spanDate);
        li.appendChild(spanRemains);

        ulAnniversary.appendChild(li);
        count++;
    }
}

//로컬 스토리지에서 기념일 정보 가져오기
function loadAnniversary(anniversaryData){
    formAnniversary.classList.add(SHOW);
    const parsedData = JSON.parse(anniversaryData);
    parsedData.forEach(data => {
       displayAnniversary(data.date, data.anniversary, data.day);
    });
}


function init(){
    const listAnniversary = localStorage.getItem(Anniversary);
    if(listAnniversary !== null){
        loadAnniversary(listAnniversary);
    }
}

init();