function calculate() {
  var number1 = parseFloat(document.getElementById("number1").value);
  var number2 = parseFloat(document.getElementById("number2").value);
  var result = Math.round((number1 * 2) + number2);
  var score = getScore(result);
  var scoreElement = document.getElementById("score");
  scoreElement.innerHTML = "由此推断，该圣遗物：<span style='color:" + score.color + ";'>" + score.suggestion + "</span>";
  document.getElementById("result").innerText = "经鉴定，该圣遗物的双暴评分为：" + result;
}

function getScore(result) {
  if (result < 20) {
    return { suggestion: "双暴分数太垃圾了", color: "red" };
  } else if (result >= 20 && result < 30) {
    return { suggestion: "双暴分数勉强及格", color: "green" };
  } else if (result >= 30 && result < 40) {
    return { suggestion: "双暴分数还可以接受", color: "green" };
  } else if (result >= 40 && result < 50) {
    return { suggestion: "双暴分数还算不错", color: "green" };
  } else {
    return { suggestion: "极品双暴分数，千万不要被毁号", color: "gold" };
  }
}

document.getElementById("calculateBtn").addEventListener("click", calculate);
