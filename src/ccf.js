function lastTime (lastTime) {
	var lastStr = '';

	var flag = Date.parse(new Date(lastTime)) - Date.parse(new Date()) > 0? '+' : '-';

	var ctn = Math.abs(Date.parse(new Date(lastTime)) - Date.parse(new Date()));
	var diffYear = Math.floor(ctn / 1000 / 60 / 60 / 24 / 30 / 12);
	var diffYearCtn = ctn - diffYear *1000*60*60*24* 30*12;
	var diffMonth = Math.floor(diffYearCtn / 1000 / 60 / 60 / 24 / 30 );
	var diffMonthCtn = diffYearCtn - diffMonth *1000*60*60*24* 30;
	var diffDay = Math.floor(diffMonthCtn / 1000 / 60 / 60 / 24 );
	var difDayCtn = diffMonthCtn - diffDay*1000*60*60*24;
	var diffHour = Math.floor((difDayCtn)/ 1000/60/60);
	var diffHourCtn = difDayCtn - diffHour*1000*60*60;
	var diffMinutes = Math.floor((diffHourCtn)/ 1000/60);
	var diffMinutesCtn = diffHourCtn - (diffMinutes)* 1000*60;
	var diffSeconds = Math.floor((diffMinutesCtn)/ 1000);

	if (diffYear !== 0) {
		lastStr += diffYear + '年';
	}
	if (diffMonth !== 0) {
		lastStr += diffMonth + '月';
	}
	if (diffDay !== NaN) {
		lastStr += diffDay + '天';
	}
	if (diffHour !== NaN) {
		lastStr += diffHour + '小时';
	}
	if (diffMinutes !== NaN) {
		lastStr += diffMinutes + '分钟';
	}
	if (diffSeconds !== NaN) {
		lastStr += diffSeconds + '秒';
	}
	return lastStr
}