import bcrypt from 'bcrypt'
import { Admin, AdminModel, Permissions } from '../database/models/admin'

interface Credentials {
    username: string, password: string, permissions?: Permissions
}

export async function checklogin(c: Credentials): Promise<boolean> {
    let u = await AdminModel.findOne({username: c.username}).catch(err=>{
        throw err;
    })
    return await bcrypt.compare(c.password, u!.password) === true
}

export async function getPermissions(c: Credentials): Promise<Permissions> {
    if(await checklogin(c) === false) throw new Error("Credentials are not correct!");

    let u = await AdminModel.findOne({username:c.username}).catch((err)=>{throw err});
    return u!.permissions;
}

export async function register(cc:Credentials, new_c: Credentials) {
    if(await checklogin(cc) === false) throw new Error("Credentials are not correct!");

    AdminModel.insertMany(new_c as Admin).catch(err=>{throw err});
    return true;
}

function comparePermissions(perm_needed: Permissions, perm: Permissions): boolean {

    function compareAction(ac_n: string[] | "all", ac: string[] | "all"): boolean {
        let success = true;
        if(ac_n === "all") {
            return ac === "all";
        }else {
            ac_n.forEach((e)=>{
                if(!ac.includes(e)) {
                    success = false;
                }
            })
        }
        return success;
    }

    let failed = false;
    if(perm_needed.ms !== "all") {
        perm_needed.ms.forEach(element => {
            if(!perm.ms.includes(element)) {
                failed = true;
            }
        });
        if (failed) return !failed;
        return compareAction(perm_needed.action, perm.action);
    }else {
        if(perm.ms === "all") {
            return compareAction(perm_needed.action, perm.action);
        }else {
            return false;
        }
    }
}

export async function requirePermission(perm_needed: Permissions, c: Credentials): Promise<boolean> {
    if(await checklogin(c) === false) throw new Error("Credentials are not correct!");
    return comparePermissions(perm_needed, await getPermissions(c))
}