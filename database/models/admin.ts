import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose'

type Permissions = {
    ms: string[] | "all",
    action: string[] | "all"
}

@modelOptions({options: {customName: "admins"}})
class Admin {
    _doc: any

    @prop({required:true, unique:true})
    public username!: string;

    @prop({required:true})
    public password!: string;

    @prop({required:true, default: {ms:"all", action:"all"} as Permissions, type: Permissions})
    public permissions!: Permissions;
}

export const AdminModel = getModelForClass(Admin)