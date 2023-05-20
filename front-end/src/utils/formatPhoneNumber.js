// 휴대폰 번호 형식 변경 함수
export default function formatPhoneNumber(phoneNumber) {
  if (typeof phoneNumber === "string") {
    const lastPart = phoneNumber.length - 4;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, lastPart)}-${phoneNumber.slice(lastPart)}`;
  }
  return phoneNumber;
}
