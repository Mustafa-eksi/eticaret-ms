export function authLogin(req: any, res:any) {
    if(req.session.auth) throw new Error("Can't login while logged in.");
    
}