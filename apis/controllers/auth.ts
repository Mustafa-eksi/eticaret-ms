import { Permissions } from "../../database/models/admin";
import { Credentials, checklogin, register } from "../../logics/auth";
import { adminjoi, credentialsjoi } from "./joi/authjoi";

// TODO: return error message (and maybe abstract it so you can use it everywhere)

export async function authLogin(req: any, res:any) {
    if(req.session.user !== undefined) throw new Error("Can't login while logged in.");
    let val = credentialsjoi.validate(req.body);
    if(val.error) {
        return res.send({result:false, error_message: val.error.details[0].message})
    }
    res.send({result: await checklogin(val.value)});
}

export async function authRegister(req: any, res:any) {
    if(req.session.user !== undefined) throw new Error("Can't register while logged in.");
    let err = false, errmsg;
    let admin_val = await credentialsjoi.validateAsync(req.body.admin).catch(er=>{err=true; errmsg=er});
    let new_val = await adminjoi.validateAsync(req.body.new).catch(er => {err=true; errmsg=er});
    let reg = await register(admin_val as Credentials, new_val as Credentials).catch(er=>{err=true; errmsg=er});
    if(err) return res.send({result:false, error_message: errmsg!.details[0].message})
    res.send({result: reg});
}