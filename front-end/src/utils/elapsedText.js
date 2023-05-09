function SimpleDateTimeFormat(date, pattern) {
  const dateString = pattern.replace(/(yyyy|MM|dd|HH|mm|ss|SSS)/g, match => {
    let matchString = "";
    switch (match) {
      case "yyyy":
        matchString = date.getFullYear();
        break;
      case "MM":
        matchString = date.getMonth() + 1;
        break;
      case "dd":
        matchString = date.getDate();
        break;
      case "HH":
        matchString = date.getHours();
        break;
      case "mm":
        matchString = date.getMinutes();
        break;
      case "ss":
        matchString = date.getSeconds();
        break;
      case "SSS":
        matchString = date.getMilliseconds();
        break;
      default:
        matchString = match;
        break;
    }
    if (match === "SSS") {
      if (matchString < 10) {
        matchString = `00${matchString}`;
      } else if (matchString < 100) {
        matchString = `0${matchString}`;
      }
    } else if (typeof matchString === "number" && matchString < 10) {
      matchString = `0${matchString}`;
    }
    return matchString;
  });

  return dateString;
}

// 지난 시간 구하는 함수
export default function elapsedText(date) {
  // 초 (밀리초)
  const seconds = 1;
  // 분
  const minute = seconds * 60;
  // 시
  const hour = minute * 60;
  // 일
  const day = hour * 24;

  const today = new Date();
  const elapsedTime = Math.trunc((today.getTime() - date.getTime()) / 1000);

  let elapsed = "";
  if (elapsedTime < seconds) {
    elapsed = "방금 전";
  } else if (elapsedTime < minute) {
    elapsed = `${elapsedTime}초 전`;
  } else if (elapsedTime < hour) {
    elapsed = `${Math.trunc(elapsedTime / minute)}분 전`;
  } else if (elapsedTime < day) {
    elapsed = `${Math.trunc(elapsedTime / hour)}시간 전`;
  } else if (elapsedTime < day * 15) {
    elapsed = `${Math.trunc(elapsedTime / day)}일 전`;
  } else {
    elapsed = SimpleDateTimeFormat(date, "yyyy.M.d");
  }

  return elapsed;
}
