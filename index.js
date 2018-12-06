const PORT = process.env.PORT || 3000;

const request = require('request');
const app = require('express')();
var path = require('path');

function getDayNumberForDayOfWeek(dayOfWeek) {
    let dayNumber = -1;

    switch (dayOfWeek) {
        case 'Monday':
            dayNumber = 1;
            break;
        case 'Tuesday':
            dayNumber = 2;
            break;
        case 'Wednesday':
            dayNumber = 3;
            break;
        case 'Thursday':
            dayNumber = 4;
            break;
        case 'Friday':
            dayNumber = 5;
            break;
        case 'Saturday':
            dayNumber = 6;
            break;
        case 'Sunday':
            dayNumber = 7;
            break;
    }

    return dayNumber;
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.get('/api/v1/lawson/aquatic/:dayOfWeek', function (req, res) {
    // https://leisurefeedimages.blob.core.windows.net/lawson/6%20LAQC%20Saturday.png
    const dayOfWeek = req.params.dayOfWeek;
    const dayNumber = getDayNumberForDayOfWeek(dayOfWeek);
    const URL = `https://leisurefeedimages.blob.core.windows.net/lawson/${dayNumber}%20LAQC%20${dayOfWeek}.png`;
    request.get(URL).pipe(res);
});

app.get('/api/v1/lawson/fieldhouse/:dayOfWeek', function (req, res) {
    const dayOfWeek = req.params.dayOfWeek;
    const dayNumber = getDayNumberForDayOfWeek(dayOfWeek);
    const URL = `https://leisurefeedimages.blob.core.windows.net/fieldhouse/${dayNumber}%20FLDH%20${dayOfWeek}.png`;
    request.get(URL).pipe(res);
});


app.listen(PORT, function() {
    console.log(`running on ${PORT}`);
});
