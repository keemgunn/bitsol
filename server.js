const express = require('express');
const app = express();
app.listen(3000, () => console.log("Server is running in port 3000")); // callback function
console.log("--------------------------------------");
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));
app.use(express.text({
    defaultCharset: "utf-8",
    limit:'199kb'
}));

app.post('/apiTest', (request, response) => {
    var data  = request.body;
    console.log(data);
    response.json({
        status: 'success',
        account: data.account,
        timeCode: data.timeCode,
        keyword: data.keyword
    })

});
