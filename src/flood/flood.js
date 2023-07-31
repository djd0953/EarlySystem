const express = require("express");
const flood = express.Router();
const pool = require("../db.js");

const authT = async (id, token) =>
{
    let sql = `SELECT * FROM login WHERE id = ? AND token = ?`;
    let auth = [id, token];
    let rtv = true;

    const conn = await pool.getConnection(async connect => connect);
    const [rows] = await conn.query(sql, auth);

    if (rows.length > 0)
    {
        rtv = false;
    }

    conn.release();
    return rtv;
}

const login = async (id, pw) => 
{
    let sql = `SELECT * FROM login WHERE id = ? AND pw = ?`;
    let auth = [id, pw];
    let rtv = new Object();

    const conn = await pool.getConnection(async connect => connect);
    const [rows] = await conn.query(sql, auth);

    if (rows.length > 0)
    {
        let val = rows[0];

        rtv.token = val.token,
        rtv.rToken = val.rToken
    }
    else
    {
        rtv = null;
    }

    conn.release();
    return rtv;
}

const reLogin = async (id, token) => 
{
    let sql = `SELECT * FROM login WHERE id = ? AND rtoken = ?`;
    let auth = [id, token];
    let rtv = new Object();

    const conn = await pool.getConnection(async connect => connect);
    const [rows] = await conn.query(sql, auth);

    if (rows.length > 0)
    {
        let val = rows[0];

        rtv.token = val.token,
        rtv.rToken = val.rToken
    }
    else
    {
        rtv = null;
    }

    conn.release();
    return rtv;
}

const getSpotList = async (flCode) =>
{
    let sql = `SELECT * FROM spot WHERE flCode = ?`;
    let rtv = new Object();

    const conn = await pool.getConnection(async connect => connect);
    const [rows] = await conn.query(sql, [flCode]);

    if (rows.length > 0)
    {
        let val = rows[0];
        rtv = 
        {
            flCode : val.flCode,
            flName : val.flName,
            flAddr : val.flAddr,
            bdongCd : val.bdongCd,
            lat : val.lat,
            lon : val.lon,
            advsryWal : val.advsryWal,
            alarmWal : val.alarmWal,
            fludWal : val.fludWal,
            rm : val.rm,
            admCode : val.admCode,
            useYn : val.useYn,
            rgsDe : val.rgsDe,
            updDe : val.updDe
        };
    }
    else
    {
        rtv = new Array();
    }
    
    conn.release();
    return rtv;
};

const setSpotList = async (vo) =>
{
    let sql;

    let col = new Array();
    let val = new Array();

    if (vo.flCode !== undefined) { col.push("flCode"); val.push(`'${vo.flCode}'`); }
    if (vo.flName !== undefined) { col.push("flName"); val.push(`'${vo.flName}'`); }
    if (vo.flAddr !== undefined) { col.push("flAddr"); val.push(`'${vo.flAddr}'`); }
    if (vo.bdongCd !== undefined) { col.push("bdongCd"); val.push(`'${vo.bdongCd}'`); }
    if (vo.lat !== undefined) { col.push("lat"); val.push(vo.lat); }
    if (vo.lon !== undefined) { col.push("lon"); val.push(vo.lon); }
    if (vo.advsryWal !== undefined) { col.push("advsryWal"); val.push(vo.advsryWal); }
    if (vo.alarmWal !== undefined) { col.push("alarmWal"); val.push(vo.alarmWal); }
    if (vo.fludWal !== undefined) { col.push("fludWal"); val.push(vo.fludWal); }
    if (vo.rm !== undefined) { col.push("rm"); val.push(`'${vo.rm}'`); }
    if (vo.admCode !== undefined) { col.push("admCode"); val.push(`'${vo.admCode}'`); }
    if (vo.useYn !== undefined) { col.push("useYn"); val.push(`'${vo.useYn}'`); }

    sql = `INSERT INTO spot (${col.join(',')}) VALUES (${val.join(',')})`;
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
}

const setAlt = async (vo) =>
{
    let sql;

    let col = new Array();
    let val = new Array();

    if (vo.flCode !== undefined) { col.push("flCode"); val.push(`'${vo.flCode}'`); }
    if (vo.cdDistWal !== undefined) { col.push("cdDistWal"); val.push(vo.cdDistWal); }
    if (vo.almCode !== undefined) { col.push("almCode"); val.push(`'${vo.almCode}'`); }
    if (vo.almDe !== undefined) { col.push("almDe"); val.push(`'${vo.almDe}'`); }
    if (vo.almGb !== undefined) { col.push("almGb"); val.push(`'${vo.almGb}'`); }
    if (vo.almNote !== undefined) { col.push("almNote"); val.push(`'${vo.almNote}'`); }

    sql = `INSERT INTO flalmord (${col.join(',')}) VALUES (${val.join(',')})`;
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
}

const getGateList = async (where = "1=1") =>
{
    let sql = `SELECT * FROM carintrcp WHERE ${where}`;
    let rtv = new Array();

    const conn = await pool.getConnection(async connect => connect);
    const [rows] = await conn.query(sql);

    if (rows.length > 0)
    {
        await rows.forEach((val) => 
        {
            let obj = 
            {
                flCode : val.flCode,
                cdDistIntrcp : val.cdDistIntrcp,
                nmDistIntrcp : val.nmDistIntrcp,
                gbIntrcp : val.gbIntrcp,
                commSttus : val.commSttus,
                intrcpSttus : val.intrcpSttus,
                lat : val.lat,
                lon : val.lon,
                rm : val.rm,
                useYn : val.useYn,
                rgsDe : val.rgsDe,
                updDe : val.updDe
            };

            rtv.push(obj);
        });
    }
    else
    {
        rtv = new Array();
    }
    
    conn.release();
    return rtv;
}

const setGateList = async (vo) =>
{
    let sql;

    let col = new Array();
    let val = new Array();

    if (vo.flCode !== undefined) { col.push("flCode"); val.push(`'${vo.flCode}'`); }
    if (vo.cdDistIntrcp !== undefined) { col.push("cdDistIntrcp"); val.push(vo.cdDistIntrcp); }
    if (vo.nmDistIntrcp !== undefined) { col.push("nmDistIntrcp"); val.push(`'${vo.nmDistIntrcp}'`); }
    if (vo.gbIntrcp !== undefined) { col.push("gbIntrcp"); val.push(`'${vo.gbIntrcp}'`); }
    if (vo.modIntrcp !== undefined) { col.push("modIntrcp"); val.push(`'${vo.modIntrcp}'`); }
    if (vo.lat !== undefined) { col.push("lat"); val.push(vo.lat); }
    if (vo.lon !== undefined) { col.push("lon"); val.push(vo.lon); }
    if (vo.rm !== undefined) { col.push("rm"); val.push(`'${vo.rm}'`); }
    if (vo.useYn !== undefined) { col.push("useYn"); val.push(`'${vo.useYn}'`); }

    sql = `INSERT INTO carintrcp (${col.join(',')}) VALUES (${val.join(',')})`;
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
}

const updateGate = async (set, where) =>
{
    let sql = `UPDATE carintrcp SET ${set} WHERE ${where}`;

    const conn = await pool.getConnection(async connect => connect);
    await conn.query(sql);
    conn.release();
}

const getBoardList = async (where = "1=1") =>
{
    let sql = `SELECT * FROM board WHERE ${where}`;
    let rtv = new Array();

    const conn = await pool.getConnection(async connect => connect);
    const [rows] = await conn.query(sql);

    if (rows.length > 0)
    {
        await rows.forEach((val) => 
        {
            let obj = 
            {
                flCode : val.flCode,
                cdDistBoard : val.cdDistBoard,
                nmDistBoard : val.nmDistBoard,
                commSttus : val.commSttus,
                msgBoard : val.msgBoard,
                lat : val.lat,
                lon : val.lon,
                rm : val.rm,
                useYn : val.useYn,
                rgsDe : val.rgsDe,
                updDe : val.updDe
            };

            rtv.push(obj);
        });
    }
    else
    {
        rtv = new Array();
    }
    
    conn.release();
    return rtv;
}

const setBoardList = async (vo) =>
{
    let sql;

    let col = new Array();
    let val = new Array();

    if (vo.flCode !== undefined) { col.push("flCode"); val.push(`'${vo.flCode}'`); }
    if (vo.cdDistBoard !== undefined) { col.push("cdDistBoard"); val.push(vo.cdDistBoard); }
    if (vo.nmDistBoard !== undefined) { col.push("nmDistBoard"); val.push(`'${vo.nmDistBoard}'`); }
    if (vo.lat !== undefined) { col.push("lat"); val.push(vo.lat); }
    if (vo.lon !== undefined) { col.push("lon"); val.push(vo.lon); }
    if (vo.rm !== undefined) { col.push("rm"); val.push(`'${vo.rm}'`); }
    if (vo.useYn !== undefined) { col.push("useYn"); val.push(`'${vo.useYn}'`); }

    sql = `INSERT INTO board (${col.join(',')}) VALUES (${val.join(',')})`;
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
}

const updateBoard = async (set, where) =>
{
    let sql = `UPDATE board SET ${set} WHERE ${where}`;

    const conn = await pool.getConnection(async connect => connect);
    await conn.query(sql);
    conn.release();
}

const getWalList = async (where = "1=1") =>
{
    let sql = `SELECT * FROM wal WHERE ${where}`;
    let rtv = new Array();

    const conn = await pool.getConnection(async connect => connect);
    const [rows] = await conn.query(sql);

    if (rows.length > 0)
    {
        await rows.forEach((val) => 
        {
            let obj = 
            {
                flCode : val.flCode,
                cdDistWal : val.cdDistWal,
                nmDistWal : val.nmDistWal,
                gbWal : val.gbWal,
                lastColctDe : val.lastColctDe,
                lastColctWal : val.lastColctWal,
                lat : val.lat,
                lon : val.lon,
                rm : val.rm,
                useYn : val.useYn,
                rgsDe : val.rgsDe,
                updDe : val.updDe
            };

            rtv.push(obj);
        });
    }
    else
    {
        rtv = new Array();
    }
    
    conn.release();
    return rtv;
}

const setWalList = async (vo) =>
{
    let sql;

    let col = new Array();
    let val = new Array();

    if (vo.flCode !== undefined) { col.push("flCode"); val.push(`'${vo.flCode}'`); }
    if (vo.cdDistWal !== undefined) { col.push("cdDistWal"); val.push(vo.cdDistWal); }
    if (vo.nmDistWal !== undefined) { col.push("nmDistWal"); val.push(`'${vo.nmDistWal}'`); }
    if (vo.gbWal !== undefined) { col.push("gbWal"); val.push(`'${vo.gbWal}'`); }
    if (vo.lat !== undefined) { col.push("lat"); val.push(vo.lat); }
    if (vo.lon !== undefined) { col.push("lon"); val.push(vo.lon); }
    if (vo.rm !== undefined) { col.push("rm"); val.push(`'${vo.rm}'`); }
    if (vo.useYn !== undefined) { col.push("useYn"); val.push(`'${vo.useYn}'`); }

    sql = `INSERT INTO wal (${col.join(',')}) VALUES (${val.join(',')})`;
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
}

const updateWal = async (set, where) =>
{
    let sql = `UPDATE wal SET ${set} WHERE ${where}`;

    const conn = await pool.getConnection(async connect => connect);
    await conn.query(sql);
    conn.release();
}

const setValue = async (vo) =>
{
    let sql;

    let col = new Array();
    let val = new Array();

    if (vo.flCode !== undefined) { col.push("flCode"); val.push(`'${vo.flCode}'`); }
    if (vo.cdDistWal !== undefined) { col.push("cdDistWal"); val.push(vo.cdDistWal); }
    if (vo.colctDe !== undefined) { col.push("colctDe"); val.push(`'${vo.colctDe}'`); }
    if (vo.colctWal !== undefined) { col.push("colctWal"); val.push(vo.colctWal); }

    sql = `INSERT INTO walcolct (${col.join(',')}) VALUES (${val.join(',')})`;
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
}

flood.post("/:id/:pw", async (req, res) => 
{
    let result = new Object();

    try
    {
        let id = req.params.id;
        let pw = req.params.pw;

        let body = await login(id, pw);
        
        if (body !== null)
        {
            result.resultCode = 101;
            result.body = body
        }
        else
        {
            throw "Token 정보와 재해위험지구ID가 일치하지 않습니다.";
        }

        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = 213;
        result.body = new Array();
        result.body.push(ex.toString());

        res.status(213).json(result);
    }
})

flood.post("/v1/lo", async (req, res) => 
{
    console.log("토큰발행");
    let result = new Object();

    try
    {
        let body = req.body;
        if (body.dsCode == undefined || body.dsPwd == undefined) throw "ID 또는 비밀번호를 확인 바랍니다.";

        let queryRes = await login(body.dsCode, body.dsPwd);
        if (queryRes != null)
        {
            result.resultCode = "101";
            result.atoken = queryRes.token;
            res.json(result);
        }
        else
        {
            throw "ID 또는 비밀번호를 확인 바랍니다.";
        }

    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());

        res.status(216).json(result);
    }
})

flood.post("/v1/rl/:id", async (req, res) => 
{
    console.log("토큰재발행");
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer") throw "Token 잘못됨";

        let queryRes = await reLogin(req.params.id, auth[1])
        if (queryRes != null)
        {
            result.resultCode = "101";
            result.atoken = queryRes.token;
            result.rtoken = queryRes.rToken;
        }

    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());

        res.status(216).json(result);
    }

    res.send(JSON.stringify(result));
})

flood.post("/v1/spot/info/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || await authT(req.params.id, auth[1])) throw "Token 잘못됨";

        let query = await getSpotList(req.params.id);
        if (query == null) throw "Token 정보와 재해위험지구ID가 일치하지 않습니다.";

        result.resultCode = "101";
        result.body = query;

        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "213";
        result.body = new Array();
        result.body.push(ex.toString());
        
        res.status(213).json(result);
    }
})

flood.post("/v1/spot/update/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || await authT(req.params.id, auth[1])) throw "Token 잘못됨";
        if (auth.lat == null || auth.lon == null) throw "Lat, Lon 정보 없음";
        
        let body = req.body;
        body.flCode = req.params.id;

        console.log(`===========================================================================`);
        console.log(`Spot 수정 :: ${body.flName}`);
        await setSpotList(body);
        console.log(`===========================================================================`);
        
        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());
        
        res.status(216).json(result);
    }
})

flood.post("/v1/flalmord/insert/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || await authT(req.params.id, auth[1])) throw "Token 잘못됨";
        
        let body = req.body;
        body.flCode = req.params.id;

        console.log(`===========================================================================`);
        console.log(`경보 ${(body.almGb == "1" ? "발령" : "해제")} :: Value_cdDistWal = ${body.cdDistWal} // 단계 = ${body.almCode}`);
        await setAlt(body);
        console.log(`===========================================================================`);

        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());
        
        res.status(216).json(result);
    }
})

flood.post("/v1/carintrcp/info/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || await authT(req.params.id, auth[1])) throw "Token 잘못됨";

        let query = await getGateList();
        if (query == null) throw "Token 정보와 재해위험지구ID가 일치하지 않습니다.";

        result.resultCode = "101";
        result.body = query;

        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());
        
        res.status(216).json(result);
    }
})

flood.post("/v1/carintrcp/insert/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || await authT(req.params.id, auth[1])) throw "Token 잘못됨";
        
        let body = req.body;
        body.flCode = req.params.id;

        console.log(`===========================================================================`);
        console.log(`차단기 등록 :: Value_cdDistIntrcp = ${body.cdDistIntrcp}`);
        await setGateList(body);
        console.log(`===========================================================================`);

        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());
        
        res.status(216).json(result);
    }
})

flood.post("/v1/carintrcp/update/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || await authT(req.params.id, auth[1])) throw "Token 잘못됨";
        
        let body = req.body;
        body.flCode = req.params.id;

        console.log(`===========================================================================`);
        console.log(`차단기 수정 :: Value_cdDistIntrcp = ${body.cdDistIntrcp}`);
        await setGateList(body);
        console.log(`===========================================================================`);

        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());
        
        res.status(216).json(result);
    }
})

flood.post("/v1/carintrcpsttus/insert/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || await authT(req.params.id, auth[1])) throw "Token 잘못됨";
        
        let body = req.body;
        body.flCode = req.params.id;

        console.log(`===========================================================================`);
        await body.forEach(async (val) => 
        {
            console.log(`차단기 상태 변경 :: ${val.sttusDe}] Value_cdDistIntrcp = ${val.cdDistIntrcp} // Sttus = ${(val.intrcpSttus == "1" ? "UpLock" : "DownLock")}`);
            await updateGate(`commSttus = '${val.commSttus}', intrcpSttus = '${val.intrcpSttus}'`, `cdDistIntrcp = ${val.cdDistIntrcp}`);

        });
        console.log(`===========================================================================`);

        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());
        
        res.status(216).json(result);
    }
})

flood.post("/v1/board/info/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || await authT(req.params.id, auth[1])) throw "Token 잘못됨";

        let query = await getBoardList();
        if (query == null) throw "Token 정보와 재해위험지구ID가 일치하지 않습니다.";

        result.resultCode = "101";
        result.body = query;

        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());
        
        res.status(216).json(result);
    }
})

flood.post("/v1/board/insert/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || await authT(req.params.id, auth[1])) throw "Token 잘못됨";
        
        let body = req.body;
        body.flCode = req.params.id;

        console.log(`===========================================================================`);
        console.log(`전광판 등록 :: Value_cdDistBoard = ${body.cdDistBoard}`);
        await setBoardList(body);
        console.log(`===========================================================================`);

        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());
        
        res.status(216).json(result);
    }
})

flood.post("/v1/board/update/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || await authT(req.params.id, auth[1])) throw "Token 잘못됨";
        
        let body = req.body;
        body.flCode = req.params.id;

        console.log(`===========================================================================`);
        console.log(`전광판 수정 :: Value_cdDistBoard = ${body.cdDistBoard}`);
        await setBoardList(body);
        console.log(`===========================================================================`);

        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());
        
        res.status(216).json(result);
    }
})

flood.post("/v1/boardsttus/insert/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || await authT(req.params.id, auth[1])) throw "Token 잘못됨";
        
        let body = req.body;

        console.log(`===========================================================================`);
        await body.forEach(async (val) => 
        {
            console.log(`전광판 상태 변경 :: ${val.sttusDe}] Value_cdDistBoard = ${val.cdDistBoard} // msg = ${val.msgBoard}`);
            await updateBoard(`commSttus = '${val.commSttus}', msgBoard = '${val.msgBoard}'`, `cdDistBoard = ${val.cdDistBoard}`);

        });
        console.log(`===========================================================================`);

        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());
        
        res.status(216).json(result);
    }
})

flood.post("/v1/wal/info/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || await authT(req.params.id, auth[1])) throw "Token 잘못됨";

        result.resultCode = "101";
        result.body = await getWalList();

        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());
        
        res.status(216).json(result);
    }
})

flood.post("/v1/wal/insert/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || await authT(req.params.id, auth[1])) throw "Token 잘못됨";
        
        let body = req.body;
        body.flCode = req.params.id;

        console.log(`===========================================================================`);
        console.log(`침수 센서 등록 :: Value_cdDistWal = ${body.cdDistWal}`);
        await setWalList(body);
        console.log(`===========================================================================`);

        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());
        
        res.status(216).json(result);
    }
})

flood.post("/v1/wal/update/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || await authT(req.params.id, auth[1])) throw "Token 잘못됨";
        
        let body = req.body;
        body.flCode = req.params.id;

        console.log(`===========================================================================`);
        console.log(`침수 센서 수정 :: Value_cdDistWal = ${body.cdDistWal}`);
        await setWalList(body);
        console.log(`===========================================================================`);

        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());
        
        res.status(216).json(result);
    }
})

flood.post("/v1/walcolct/insert/:id", async (req, res) => 
{
    let result = new Object();

    try
    {
        if (req.headers["authorization"] === undefined) throw "Token 없음";
        
        let auth = req.headers["authorization"].split(' ');
        if (!auth[0] == "Bearer" || await authT(req.params.id, auth[1])) throw "Token 잘못됨";
        
        let body = req.body;

        console.log(`===========================================================================`);
        await body.forEach(async (val) => 
        {
            val.flCode = req.params.id;

            console.log(`값 등록 :: ${val.colctDe}] Value_cdDistWal = ${val.cdDistWal} // Value = ${val.colctWal}`);
            await setValue(val);
            await updateWal(`lastColctDe = '${val.colctDe}', lastColctWal = ${val.colctWal}`, `cdDistWal = ${val.cdDistWal}`);
        });
        console.log(`===========================================================================`);

        result.resultCode = "101";
        res.json(result);
    }
    catch (ex)
    {
        result.resultCode = "216";
        result.body = new Array();
        result.body.push(ex.toString());
        
        res.status(216).json(result);
    }
})

module.exports = flood;