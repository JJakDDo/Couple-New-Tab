const ulAnniversary = document.querySelector(".js-anniversary");
const formAnniversary = document.querySelector(".js-formAnni");

function displayAnniversary(date, anniversary, day){
    const temp = new Date();
    //지난 기념일은 스킵
    if(parseDate(date) >= temp){
        const li = document.createElement("li");
        const span = document.createElement("span");

        const tempDate = date.split("-");
        const text = `${tempDate[0]} 년 ${tempDate[1]} 월 ${tempDate[2]} 일 ${day} ${getRemainingDays(date, true)}일 남음`;

        span.innerText = text;

        li.appendChild(span);

        ulAnniversary.appendChild(li);            
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