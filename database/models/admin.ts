import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose'

export type Permissions = {
    ms: string[] | "all",
    action: string[] | "all"
}

@modelOptions({options: {customName: "admins"}})
export class Admin {
    @prop({required:true, unique:true})
    public username!: string;

    @prop({required:true})
    public password!: string;

    @prop({required:true, default: {ms:"all", action:"all"} as Permissions})
    public permissions!: Permissions;
}

export const AdminModel = getModelForClass(Admin)