const express = require('express');
const app = express();
console.log("--------------------------------------");
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));
app.use(express.text({
    defaultCharset: "utf-8",
    limit:'199kb'
}));

var data
app.post('/apiTest', (request, response) => {
    data  = request.body;
    console.log(data);
    response.json({
        status: 'success',
        account: data.account,
        timeCode: data.timeCode,
        keyword: data.keyword
    })
});






const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));