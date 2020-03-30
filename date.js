const dateForm = document.querySelector(".js-dateForm");
const input = dateForm.querySelector("input");
const currentDay = document.querySelector(".js-currentDay");

const FirstDay = "firstDay";
const SHOW = "showing";

function getNumberOfDays(currentValue){
    //오늘 날짜 가져오기
    const today = new Date();
    //유저가 입력한 날짜를 Date 객체로 변환
    const arrCurrentValue = currentValue.split("-");
    const newCurrentValue = new Date(arrCurrentValue[0], arrCurrentValue[1]-1, arrCurrentValue[2]);
    
    //Date 객체를 빼면 밀리세컨드로 가져옴
    const diff = today - newCurrentValue;
    const currDay = 24 * 60 * 60 * 1000;
    
    return parseInt(diff/currDay) + 1;
}

function askForDay(){
    dateForm.classList.add(SHOW);
    dateForm.addEventListener("submit", function(e){
        e.preventDefault();
        const currentValue = input.value;
        showToday(currentValue);
        localStorage.setItem(FirstDay, currentValue);
    });
}

function showToday(text){
    dateForm.classList.remove(SHOW);
    currentDay.classList.add(SHOW);
    
    currentDay.innerText = `우리 커플 ${getNumberOfDays(text)} 일 째!`;
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