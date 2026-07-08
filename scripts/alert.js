var currentMonth = new Date().getMonth();

// 只有在 6 月，且本次访问（Session）还没弹过窗时才触发
if (currentMonth === 5 && !sessionStorage.getItem('pride_alert_shown')) {
    alert("[2026.5.29 更新]\n欢迎光临原站！\n6月是跨性别者及所有性少数人群的骄傲月。\n因为本人是一位坚定的跨性别女性，所以本人在本站首页添加了一个提示框，以此表达对跨性别骄傲月的庆祝与崇高敬意。\n站长决定，每年骄傲月期间，在您每一次访问之前，都会看到这条提示。\n如果您知道了，请点击“确定”。");
    
    // 标记为已弹窗，直到用户关闭标签页或浏览器
    sessionStorage.setItem('pride_alert_shown', 'true');
}
