const express = require("express");
const { cwd } = require("process");
const pool = require("../db.js");
const { rejects } = require("assert");
const warning = express.Router();
const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NzczMDAwMDAxIiwiZHNDb2RlIjoiNDc3MzAwMDAwMSIsImRzTmFtZSI6Iu2VmOyynCDruYTslYjsnbTrkZDsp4DqtawiLCJkc0tpbmQiOiJDIiwiZHNCckdiIjoiMCIsImlhdCI6MTY4OTY2NDYwOSwiZXhwIjoxNjg5NjY4MzI5fQ.Y0CLNDdrDabgL-yHFVETH8l7smy1efaYAdgGKqCEZyE";
const rToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0NzczMDAwMDAxIiwiaWF0IjoxNjg5NjY0NjA5LCJleHAiOjE2ODk3NTEwMDl9.TnFq5N_H5giiIrkpN4TqahlFKM4Q-2j0wqkSzwkf0yw";


const selectEquip = async (where = "1=1") =>
{
    let sql = `SELECT * FROM equip WHERE ${where}`;
    let rtv = new Array();

    const conn = await pool.getConnection(async connect => connect);
    const [reviews, fields] = await conn.query(sql);

    await reviews.forEach((val) => 
    {
        let obj = 
        {
            dsCode : val.dsCode,
            cdDistObsv : val.cdDistObsv,
            nmDistObsv : val.nmDistObsv,
            gbObsv : val.gbObsv,
            bdongCd : val.bdongCd,
            lat : val.lat,
            lon : val.lon,
            useYn : val.useYn,
            mntnAdresAt : val.mntnAdresAt,
            mlnm : val.mlnm,
            aulnm : val.aulnm,
            dtlAdres : val.dtlAdres,
            rdnmadrCd : val.rdnmadrCd,
            rnDtlAdres : val.rnDtlAdres,
            spoNoCd : val.spoNoCd,
            orgnCd : val.orgnCd,
            rgsDe : val.rgsDe,
            updDe : val.updDe
        };
    
        rtv.push(obj);
    });
        
    conn.release();
    return rtv;
};

const selectCri = async (where = "1=1") =>
{
    let sql = `SELECT * FROM critical WHERE ${where} ORDER BY cdDistObsv DESC, almCode`;
    let rtv = new Array();

    const conn = await pool.getConnection(async connect => connect);
    const [reviews, fields] = await conn.query(sql);

    await reviews.forEach((val) => 
    {
        let obj = 
        {
            dsCode : val.dsCode,
            cdDistObsv : val.cdDistObsv,
            almCode : val.almCode,
            obsrGb : val.obsrGb,
            tholdGb : val.tholdGb,
            tholdValue : val.tholdValue,
            useYn : val.useYn,
            rgsDe : val.rgsDe,
            updDe : val.updDe
        };
    
        rtv.push(obj);
    });
        
    conn.release();
    return rtv;
};

const selectValue = async (where = "1=1") =>
{
    let sql = `SELECT * FROM val WHERE ${where} ORDER BY obsrDe DESC LIMIT 30`;
    let rtv = new Array();

    const conn = await pool.getConnection(async connect => connect);
    const [reviews, fields] = await conn.query(sql);

    await reviews.forEach((val) => 
    {
        let obj = 
        {
            cdDistObsv : val.cdDistObsv,
            obsrDe : val.obsrDe,
            obsrValue : val.obsrValue,
            rgsDe : val.rgsDe,
            updDe : val.updDe
        };
    
        rtv.push(obj);
    });
        
    conn.release();
    return rtv;
};

const selectAlt = async (where = "1=1") =>
{
    let sql = `SELECT * FROM alert WHERE ${where} ORDER BY cdDistObsv DESC, almCode`;
    let rtv = new Array();

    const conn = await pool.getConnection(async connect => connect);
    const [reviews, fields] = await conn.query(sql);

    await reviews.forEach((val) => 
    {
        let obj = 
        {
            dsCode : val.dsCode,
            cdDistObsv : val.cdDistObsv,
            almCode : val.almCode,
            almDe : val.almDe,
            almGb : val.almGb,
            almNote : val.almNote,
            rgsDe : val.rgsDe,
            updDe : val.updDe
        };
    
        rtv.push(obj);
    });
        
    conn.release();
    return rtv;
};

const insertEquip = async (vo) =>
{
    let sql;

    let col = new Array();
    let val = new Array();

    if (vo.dsCode !== undefined) { col.push("dsCode"); val.push(`'${vo.dsCode}'`); }
    if (vo.cdDistObsv !== undefined) { col.push("cdDistObsv"); val.push(vo.cdDistObsv); }
    if (vo.nmDistObsv !== undefined) { col.push("nmDistObsv"); val.push(`'${vo.nmDistObsv}'`); }
    if (vo.gbObsv !== undefined) { col.push("gbObsv"); val.push(`'${vo.gbObsv}'`); }
    if (vo.bdongCd !== undefined) { col.push("bdongCd"); val.push(`'${vo.bdongCd}'`); }
    if (vo.lat !== undefined) { col.push("lat"); val.push(vo.lat); }
    if (vo.lon !== undefined) { col.push("lon"); val.push(vo.lon); }
    if (vo.useYn !== undefined) { col.push("useYn"); val.push(`'${vo.useYn}'`); }
    if (vo.mntnAdresAt !== undefined) { col.push("mntnAdresAt"); val.push(`'${vo.mntnAdresAt}'`); }
    if (vo.mlnm !== undefined) { col.push("mlnm"); val.push(`'${vo.mlnm}'`); }
    if (vo.aulnm !== undefined) { col.push("aulnm"); val.push(`'${vo.aulnm}'`); }
    if (vo.dtlAdres !== undefined) { col.push("dtlAdres"); val.push(`'${vo.dtlAdres}'`); }
    if (vo.rdnmadrCd !== undefined) { col.push("rdnmadrCd"); val.push(`'${vo.rdnmadrCd}'`); }
    if (vo.rnDtlAdres !== undefined) { col.push("rnDtlAdres"); val.push(`'${vo.rnDtlAdres}'`); }
    if (vo.spoNoCd !== undefined) { col.push("spoNoCd"); val.push(`'${vo.spoNoCd}'`); }
    if (vo.orgnCd !== undefined) { col.push("orgnCd"); val.push(`'${vo.orgnCd}'`); }

    sql = `INSERT INTO equip (${col.join(',')}) VALUES (${val.join(',')})`;
    sql += ` ON DUPLICATE KEY UPDATE `;

    for (let i = 0; i < col.length; i++)
    {
        if (i !== 0) sql += ',';
        sql += `${col[i]} = ${val[i]}`;
    }

    const conn = await pool.getConnection(async connect => connect);
    const [rows] = await conn.query(sql);
    const rtv = rows.insertId;

    conn.release();

    console.log(sql);
    return rtv;
};

const insertValue = async (vo) =>
{
    let sql;

    let col = new Array();
    let val = new Array();

    if (vo.cdDistObsv !== undefined) { col.push("cdDistObsv"); val.push(vo.cdDistObsv); }
    if (vo.obsrDe !== undefined) { col.push("obsrDe"); val.push(`'${vo.obsrDe}'`); }
    if (vo.obsrValue !== undefined) { col.push("obsrValue"); val.push(vo.obsrValue); }

    sql = `INSERT INTO val (${col.join(',')}) VALUES (${val.join(',')})`;
    sql += ` ON DUPLICATE KEY UPDATE `;

    for (let i = 0; i < col.length; i++)
    {
        if (i !== 0) sql += ',';
        sql += `${col[i]} = ${val[i]}`;
    }

    const conn = await pool.getConnection(async connect => connect);
    const [rows] = await conn.query(sql);
    const rtv = rows.insertId;

    conn.release();

    return rtv;
};

const insertAlt = async (vo) =>
{
    let sql;

    let col = new Array();
    let val = new Array();

    if (vo.dsCode !== undefined) { col.push("dsCode"); val.push(`'${vo.dsCode}'`); }
    if (vo.cdDistObsv !== undefined) { col.push("cdDistObsv"); val.push(vo.cdDistObsv); }
    if (vo.almCode !== undefined) { col.push("almCode"); val.push(`'${vo.almCode}'`); }
    if (vo.almDe !== undefined) { col.push("almDe"); val.push(`'${vo.almDe}'`); }
    if (vo.almGb !== undefined) { col.push("almGb"); val.push(`'${vo.almGb}'`); }
    if (vo.almNote !== undefined) { col.push("almNote"); val.push(`'${vo.almNote}'`); }

    sql = `INSERT INTO alert (${col.join(',')}) VALUES (${val.join(',')})`;
    sql += ` ON DUPLICATE KEY UPDATE `;

    for (let i = 0; i < col.length; i++)
    {
        if (i !== 0) sql += ',';
        sql += `${col[i]} = ${val[i]}`;
    }

    const conn = await pool.getConnection(async connect => connect);
    const [rows] = await conn.query(sql);
    const rtv = rows.insertId;

    conn.release();

    return rtv;
};

const insertCri = async (vo) =>
{
    let sql;

    let col = new Array();
    let val = new Array();

    if (vo.dsCode !== undefined) { col.push("dsCode"); val.push(`'${vo.dsCode}'`); }
    if (vo.cdDistObsv !== undefined) { col.push("cdDistObsv"); val.push(vo.cdDistObsv); }
    if (vo.almCode !== undefined) { col.push("almCode"); val.push(`'${vo.almCode}'`); }
    if (vo.obsrGb !== undefined) { col.push("obsrGb"); val.push(`'${vo.obsrGb}'`); }
    if (vo.tholdGb !== undefined) { col.push("tholdGb"); val.push(`'${vo.tholdGb}'`); }
    if (vo.tholdValue !== undefined) { col.push("tholdValue"); val.push(vo.tholdValue); }
    if (vo.useYn !== undefined) { col.push("useYn"); val.push(`'${vo.useYn}'`); }

    sql = `INSERT INTO critical (${col.join(',')}) VALUES (${val.join(',')})`;
    sql += ` ON DUPLICATE KEY UPDATE `;

    for (let i = 0; i < col.length; i++)
    {
        if (i !== 0) sql += ',';
        sql += `${col[i]} = ${val[i]}`;
    }

    const conn = await pool.getConnection(async connect => connect);
    const [rows] = await conn.query(sql);
    const rtv = rows.insertId;

    conn.release();

    console.log(sql);
    return rtv;
};

warning.post("/:key", async (req, res) => 
{
    let result = new Object();

    try
    {      
        let key = req.params.key;
        let a = "1";

        result.resultCode = 101;

        switch (key)
        {
            case "equip":
                result.body = equip;
                break;

            case "value":
                result.body = value;
                break;

            case "critical":
                result.body = critical;
                break;

            case "alert":
                result.body = alert;
                break;

            case "sql":
                let obj =
                {
                   cdDistObsv : 3,
                   obsrDe : "dd",
                   obsrValue : 33.0
                };

                result.body = await insertValue(obj);
                break;

            default:
                break;
        }

        res.json(result);
    }
    catch (ex)
    {

    }
})

warning.post("/v1/lo", (req, res) => 
{
    console.log("토큰발행");
    let result = new Object();

    try
    {
        let body = req.body;
        if (body.dsCode == undefined || body.dsPwd == undefined) throw "ID 또는 비밀번호를 확인 바랍니다.";
        if (!body.dsCode == "4773000001" || !body.dsPwd == "1234") throw "ID 또는 비밀번호를 확인 바랍니다.";

        result.resultCode = "101";
        result.atoken = token;
        result.rtoken = rToken;
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.resultMessage = new Array();
        result.resultMessage.push(ex);
        
        console.log(ex);
        res.status(216).json(result);
    }
})

warning.post("/v1/rl/:id", (req, res) => 
{
    console.log("토큰재발행");
    let result = new Object();

    try
    {
        if (req.params.id !== "4773000001") throw `DsCode가 잘못됨(${req.params.id})`;
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || !auth[1] == token) throw "Token 잘못됨";

        result.resultCode = "101";
        result.atoken = token;
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.resultMessage = new Array();
        result.resultMessage.push(ex);

        console.log(ex);
        res.status(216).json(result);
    }
})

warning.post("/v1/obsv/info/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.params.id !== "4773000001") throw `DsCode가 잘못됨(${req.params.id})`;
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || !auth[1] == token) throw "Token 잘못됨";

        result.resultCode = "101";
        result.body = await selectEquip();

        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.resultMessage = new Array();
        result.resultMessage.push(ex.toString());
        
        console.log(ex);
        res.status(216).json(result);
    }
})

warning.post("/v1/obsv/insert/:id", async (req, res) => 
{
    console.log("장비등록");
    let result = new Object();

    try
    {
        if (req.params.id !== "4773000001") throw `DsCode가 잘못됨(${req.params.id})`;
        if (req.headers["authorization"] === undefined) throw "Token 없음";

        let body = req.body;
        let auth = req.headers["authorization"].split(' ');
        
        if (!auth[0] == "Bearer" || !auth[1] == token) throw "Token 잘못됨";

        await insertEquip(body);

        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.resultMessage = new Array();
        result.resultMessage.push(ex.toString());
        
        console.log(ex);
        res.status(216).json(result);
    }
})

warning.post("/v1/obsv/update/:id", async (req, res) => 
{
    console.log("장비수정");
    let result = new Object();

    try
    {
        if (req.params.id !== "4773000001") throw `DsCode가 잘못됨(${req.params.id})`;
        if (req.headers["authorization"] === undefined) throw "Token 없음";

        let body = req.body;
        let auth = req.headers["authorization"].split(' ');
        
        if (!auth[0] == "Bearer" || !auth[1] == token) throw "Token 잘못됨";

        await insertEquip(body);

        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.resultMessage = new Array();
        result.resultMessage.push(ex.toString());
        
        console.log(ex);
        res.status(216).json(result);
    }
})

warning.post("/v1/obsvrecd/info/:id/:cdDistObsv", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.params.id !== "4773000001") throw `DsCode가 잘못됨(${req.params.id})`;
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let cdDistObsv = req.headers["cdDistObsv"] !== undefined ? req.params.cdDistObsv : 0;
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || !auth[1] == token) throw "Token 잘못됨";

        result.resultCode = "101";
        if (cdDistObsv === 0)
        {
            result.body = await selectValue();
        }
        else
        {
            result.body = await selectValue(`cdDistObsv = ${cdDistObsv}`);
        }

        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.resultMessage = new Array();
        result.resultMessage.push(ex.toString());
        
        console.log(ex);
        res.status(216).json(result);
    }
});

warning.post("/v1/obsvrecd/info/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.params.id !== "4773000001") throw `DsCode가 잘못됨(${req.params.id})`;
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || !auth[1] == token) throw "Token 잘못됨";

        result.resultCode = "101";
        result.body = await selectValue();

        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.resultMessage = new Array();
        result.resultMessage.push(ex.toString());
        
        console.log(ex);
        res.status(216).json(result);
    }
})

warning.post("/v1/obsvrecd/insert/:id", async (req, res) => 
{
    let result = new Object();
    
    try
    {
        if (req.params.id !== "4773000001") throw `DsCode가 잘못됨(${req.params.id})`;
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let body = req.body;
        let auth = req.headers["authorization"].split(' ');
        
        if (!auth[0] == "Bearer" || !auth[1] == token) throw "Token 잘못됨";
        
        console.log(`===========================================================================`);
        await body.forEach(async (val) => 
        {
            console.log(`값 등록 :: ${val.obsrDe}] Value_cdDistObsv = ${val.cdDistObsv} // Value = ${val.obsrValue}`);
            await insertValue(val);
        })
        console.log(`===========================================================================`);
        
        
        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.resultMessage = new Array();
        result.resultMessage.push(ex.toString());
        
        console.log(ex);
        res.status(216).json(result);
    }
})

warning.post("/v1/obsvthold/info/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.params.id !== "4773000001") throw `DsCode가 잘못됨(${req.params.id})`;
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || !auth[1] == token) throw "Token 잘못됨";

        result.resultCode = "101";
        result.body = await selectCri();
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.resultMessage = new Array();
        result.resultMessage.push(ex.toString());
        
        console.log(ex);
        res.status(216).json(result);
    }
})

warning.post("/v1/obsvthold/insert/:id/:cdDistObsv", async (req, res) => 
{
    console.log("임계치 등록");
    let result = new Object();

    try
    {
        if (req.params.cdDistObsv === undefined) throw "장비번호가 없음";
        if (req.params.id !== "4773000001") throw `DsCode가 잘못됨(${req.params.id})`;
        if (req.headers["authorization"] === undefined) throw "Token 없음";

        let body = req.body;
        let auth = req.headers["authorization"].split(' ');
        let cdDistObsv;
        
        if (!auth[0] == "Bearer" || !auth[1] == token) throw "Token 잘못됨";
        if (isNaN(cdDistObsv = parseInt(req.params.cdDistObsv)) === true) throw "장비번호가 Int형식이 아님";

        await body.forEach(async (val) => 
        {
            val.dsCode = req.params.id;
            val.cdDistObsv = cdDistObsv;

            await insertCri(val);
        })

        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.resultMessage = new Array();
        result.resultMessage.push(ex.toString());
        
        console.log(ex);
        res.status(216).json(result);
    }
})

warning.post("/v1/obsvthold/update/:id/:cdDistObsv", async (req, res) => 
{
    console.log("임계치 수정");
    let result = new Object();

    try
    {
        if (req.params.cdDistObsv === undefined) throw "장비번호가 없음";
        if (req.params.id !== "4773000001") throw `DsCode가 잘못됨(${req.params.id})`;
        if (req.headers["authorization"] === undefined) throw "Token 없음";

        let body = req.body;
        let auth = req.headers["authorization"].split(' ');
        let cdDistObsv;
        
        if (!auth[0] == "Bearer" || !auth[1] == token) throw "Token 잘못됨";
        if (isNaN(cdDistObsv = parseInt(req.params.cdDistObsv)) === true) throw "장비번호가 Int형식이 아님";

        await body.forEach(async (alt) => 
        {
            alt.dsCode = req.params.id;
            alt.cdDistObsv = cdDistObsv;

            await insertCri(alt);
        })

        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.resultMessage = new Array();
        result.resultMessage.push(ex.toString());
        
        console.log(ex);
        res.status(216).json(result);
    }
})

warning.post("/v1/dsalmord/hist/:id", async (req, res) => 
{
    console.log("경보 조회");
    let result = new Object();

    try
    {
        if (req.params.id !== "4773000001") throw `DsCode가 잘못됨(${req.params.id})`;

        let auth = req.headers["authorization"].split(' ');
        
        if (!auth[0] == "Bearer" || !auth[1] == token) throw "Token 잘못됨";

        result.resultCode = "101";
        result.body = await selectAlt();
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.resultMessage = new Array();
        result.resultMessage.push(ex.toString());
        
        console.log(ex);
        res.status(216).json(result);
    }
})

warning.post("/v1/dsalmord/insert/:id", async (req, res) => 
{
    let result = new Object();
    
    try
    {
        if (req.params.id !== "4773000001") throw `DsCode가 잘못됨(${req.params.id})`;
        
        let body = req.body;
        let auth = req.headers["authorization"].split(' ');
        
        if (!auth[0] == "Bearer" || !auth[1] == token) throw "Token 잘못됨";
        
        body.dsCode = req.params.id;
        await insertAlt(body);
        
        console.log(`===========================================================================`);
        console.log(`경보 ${(body.almGb == "1" ? "발령" : "해제")} :: Alert_cdDistObsv = ${body.cdDistObsv} // Alert_Level = ${body.almCode}`);
        console.log(`===========================================================================`);

        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.resultMessage = new Array();
        result.resultMessage.push(ex.toString());
        
        console.log(ex);
        res.status(216).json(result);
    }
})

module.exports = warning;