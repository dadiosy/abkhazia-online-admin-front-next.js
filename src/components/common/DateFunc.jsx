const doMakeStr = function (currentDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const day = currentDate.getDate();
    const dayOfWeekIndex = currentDate.getDay();
    const days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    var rvalue = {
        'year': year,
        'day': day,
        'dayStr': days[dayOfWeekIndex],
        'monthStr': months[month]
    }
    return rvalue;
}
exports.doMakeStr = doMakeStr;