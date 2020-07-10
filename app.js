const express = require('express');
const app = express();
const path = require('path');
console.log("--------------------------------------");
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.text({
    defaultCharset: "utf-8",
    limit:'199kb'
}));


const urls = {
    refg: path.join(__dirname,'/html/refg.html')
};
app.get('/api/refg', (req,res) =>{
    res.sendFile(urls.refg);    
});






app.post('/apiTest', (req, res) => {
    const data  = req.body;
    console.log(data);
    res.json({
        status: 'success',
        account: data.account,
        timeCode: data.timeCode,
        keyword: data.keyword
    })
});






const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));