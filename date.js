const dateForm = document.querySelector(".js-dateForm");
const input = dateForm.querySelector("input");
const currentDay = document.querySelector(".js-currentDay");

const FirstDay = "firstDay";
const Anniversary = "Anniversary";
const SHOW = "showing";
const day = ["일", "월", "화", "수", "목", "금", "토"];

let listAnniversary = [];
//스트링을 Date로 변경
function parseDate(str){
    return new Date(str);
}
//Date를 스트링 YYYY-MM-DD 형식으로 변경
function parseStr(date){
    let str = "";
    let tempMonth = parseInt(date.getMonth());
    tempMonth = tempMonth + 1;
    str += date.getFullYear() + "-";
    if(tempMonth < 10)
        str += "0" + tempMonth + "-";
    else str += tempMonth + "-";
    if(date.getDate() < 10)
        str += "0" + date.getDate();
    else str += date.getDate();
    return str;
}

//각 기념일 별로 날짜구하기
function getDates(date){
    //각 기념일 별로 날짜 구하기 NNN일
    for(let i=1;i<20;i++){
        const temp = new Date(date.getFullYear(), date.getMonth(), date.getDate() + (i * 100) - 1);
        listAnniversary.push({"date":temp, "day":day[temp.getDay()], "anniversary":i*100+"일"});        
    }
    //각 기념일 별로 날짜 구하기 N주년
    for(let i=1;i<6;i++){
        const temp = new Date(date.getFullYear() + i, date.getMonth(), date.getDate());
        listAnniversary.push({"date":temp, "day":day[temp.getDay()], "anniversary":i+"주년"});        
    }
    listAnniversary.sort(function(a,b){
        return a.date - b.date;
    });
    //스트링으로 변경 후 YYYY-MM-DD 정렬이 왜 안되는지 모르겠음
    listAnniversary.forEach(data =>{
        data.date = parseStr(data.date);
    })
}

//기념일 남은 일수 구하기
function getRemainingDays(currentValue, isAnniversary){
    //오늘 날짜 가져오기
    const today = new Date();
    //유저가 입력한 날짜를 Date 객체로 변환
    const newCurrentValue = parseDate(currentValue);
    
    //Date 객체를 빼면 밀리세컨드로 가져옴
    const diff = today - newCurrentValue;
    const currDay = 24 * 60 * 60 * 1000;
    
    if(isAnniversary)
        return -(parseInt(diff/currDay) - 1);
    else return parseInt(diff/currDay) + 1;
}

function askForDay(){
    dateForm.classList.add(SHOW);
    dateForm.addEventListener("submit", function(e){
        e.preventDefault();
        const currentValue = input.value;
        showToday(currentValue);
        localStorage.setItem(FirstDay, currentValue);
        saveAnniversary();
    });
}

function showToday(text){
    dateForm.classList.remove(SHOW);
    currentDay.classList.add(SHOW);
    
    currentDay.querySelector("h1").innerText = `우리 커플`;
    currentDay.querySelector("p").innerText = `${getRemainingDays(text, false)} 일 째`;
}
//기념일들 로컬스토리지에 저장하기
function saveAnniversary(){
    const savedAnniversary = localStorage.getItem(Anniversary);
    const tempDay = localStorage.getItem(FirstDay);
    if(savedAnniversary === null && tempDay !== null){        
        const dateFirstDay = parseDate(tempDay);
        getDates(dateFirstDay);
        localStorage.setItem(Anniversary, JSON.stringify(listAnniversary));
        //저장하고 바로 불러오기
        loadAnniversary(localStorage.getItem(Anniversary));
    }
}

function init(){
    //로컬 저장소에서 설정된 날짜 가져오기
    const savedDay = localStorage.getItem(FirstDay);
    //설정된 날짜가 없으면 실행
    if(savedDay === null){
        askForDay();
    }
    else{
        showToday(savedDay);
    }
}

init();