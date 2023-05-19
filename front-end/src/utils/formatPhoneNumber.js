// 휴대폰 번호 형식 변경 함수
export default function formatPhoneNumber(phoneNumber) {
  const lastPart = phoneNumber.length - 4;
  return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, lastPart)}-${phoneNumber.slice(lastPart)}`;
}
