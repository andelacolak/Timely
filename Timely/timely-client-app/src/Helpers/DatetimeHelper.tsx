export default function getCurrentDate(){

    let newDate = new Date()
    var seconds = newDate.getSeconds();
    var minutes = newDate.getMinutes();
    var hours = newDate.getHours();
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    // 2015-05-16T05:50:06
    return `${year}-${month<10?`0${month}`:`${month}`}-${day<10?`0${day}`:`${day}`}T${hours<10?`0${hours}`:`${hours}`}:${minutes<10?`0${minutes}`:`${minutes}`}:${seconds<10?`0${seconds}`:`${seconds}`}`
    }