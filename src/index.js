const express = require("express");
const app = express(),
      port = 80,
      token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NzczMDAwMDAxIiwiZHNDb2RlIjoiNDc3MzAwMDAwMSIsImRzTmFtZSI6Iu2VmOyynCDruYTslYjsnbTrkZDsp4DqtawiLCJkc0tpbmQiOiJDIiwiZHNCckdiIjoiMCIsImlhdCI6MTY4OTY2NDYwOSwiZXhwIjoxNjg5NjY4MzI5fQ.Y0CLNDdrDabgL-yHFVETH8l7smy1efaYAdgGKqCEZyE",
      reToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NzczMDAwMDAxIiwiaWF0IjoxNjg5NjY0NjA5LCJleHAiOjE2ODk3NTEwMDl9.TnFq5N_H5giiIrkpN4TqahlFKM4Q-2j0wqkSzwkf0yw";

const warning = require("./warning/warning.js");
const flood = require("./flood/flood.js");

app.use(express.json());
app.use("/c", warning);
app.use("/d", flood);

app.post("/", (req, res) =>
{
    let a = new Array();

    for (let j = 7; j <= 8; j++)
    {
        for (let i = 0; i < 60; i++)
        {
            let b = new Object();
            b.cdDistObsv = 1002;
            b.obsrDe = "20230720";
            b.obsrDe += `0${j}`;
            b.obsrDe += i < 10 ? `0${i}` : i;
            b.obsrDe += "00";
            b.obsrValue = i;

            a.push(b);
        }
    }

    for (let j = 7; j <= 8; j++)
    {
        for (let i = 0; i < 60; i++)
        {
            let b = new Object();
            b.cdDistObsv = 1003;
            b.obsrDe = "20230720";
            b.obsrDe += `0${j}`;
            b.obsrDe += i < 10 ? `0${i}` : i;
            b.obsrDe += "00";
            b.obsrValue = i;

            a.push(b);
        }
    }

    a.sort((a, b) => 
    {
        if (a.obsrDe > b.obsrDe) return -1;
        if (a.obsrDe < b.obsrDe) return 1;
        return 0;
    })

    let result = new Object();
    result.resultCode = 101;
    result.body = a;
    
    res.json(result);
})

app.listen(port, () => 
{
    console.log(`Server Start (Port::${port})`);
})
