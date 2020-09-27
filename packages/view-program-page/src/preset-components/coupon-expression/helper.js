/*
 * @Date: 2020-09-21 09:28:57
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-21 09:33:41
 */
export function couponDisabled() {
  return this.couponData.status.toString() === '0';
}

export function btnTextComputed() {
  if (this.couponDisabled) {
    return '已过期';
  }
  if (this.leftPercent <= 0) {
    return '已领完';
  }
  if (this.btnText) {
    return this.btnText;
  }
  return this.couponPrice > 0 ? '抢券' : '领券';
}

export function leftPercent() {
  let leftPercent = 0;
  if (this.progress) {
    leftPercent = this.progress * 100;
  }
  else {
    let { limitAmount, receivedAmount } = this.couponData;
    leftPercent = (limitAmount - receivedAmount) / limitAmount * 100;
  }
  return Math.round(leftPercent);
}