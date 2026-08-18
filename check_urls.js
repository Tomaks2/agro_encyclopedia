const http = require('http');

const urls = [
    "http://localhost:3000/uk/ahrus/obrizka-ta-shtamb",
    "http://localhost:3000/uk/lokhyna/" + encodeURIComponent("biolohiya-та-atsydofiliia"),
    "http://localhost:3000/uk/malytsia/" + encodeURIComponent("shpalery-та-obrizka"),
    "http://localhost:3000/uk/ozhyna/" + encodeURIComponent("zbir-охлодження-зберігання"),
    "http://localhost:3000/uk/polunytsia/" + encodeURIComponent("biolohiya-та-genetyka"),
    "http://localhost:3000/uk/smorodyna/sorty-smorodyny-ta-porichok"
];

urls.forEach(url => {
    http.get(url, (res) => {
        console.log(`[${res.statusCode}] ${url}`);
    }).on('error', (e) => {
        console.error(`Error: ${e.message}`);
    });
});