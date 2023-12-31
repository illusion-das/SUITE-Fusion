
// 이 곳에 나이스 API 키를 입력하세요.
const APIKey = ""

// 이 곳에 시도교육청 코드를 입력하세요.
const AOSC = ""

// 이 곳에 표준학교 코드를 입력하세요.
const SSC = ""

const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

// API 요청 URL
const API_URL = `https://open.neis.go.kr/hub/mealServiceDietInfo?\
KEY=${APIKey}\
&Type=json\
&ATPT_OFCDC_SC_CODE=${AOSC}\
&SD_SCHUL_CODE=${SSC}\
&MLSV_FROM_YMD=${year}${month}${day}\
&MLSV_TO_YMD=${year}${month}${day}`;

// 정규식으로 알레르기 정보 제거
function RX(item) {
    return item.replace(/\([^)]*\)/g, '');
}
  
// 당일 급식 정보 반환
async function todayMeal() {
    const response = await fetch(API_URL);
    const result = await response.json();
    const mealData = result.mealServiceDietInfo[1];

    let mealInfo = [];

    mealData['row'].forEach(i => {
        mealTime = i['MMEAL_SC_NM'];
        mealList = RX(i['DDISH_NM']);

        mealInfo.push([mealTime, mealList]);
    });

    return mealInfo;
}