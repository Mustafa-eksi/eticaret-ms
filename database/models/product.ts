import { prop, getModelForClass, modelOptions, Ref } from '@typegoose/typegoose'

@modelOptions({options: {customName: "products"}})
export class Product {
    @prop({required:true, unique:true})
    public index!: number;

    @prop({required:true})
    public image_count!: number;

    @prop({required:true})
    public urun_ismi!: string;

    @prop()
    public ozellikler?: any;

    @prop({required:true})
    public ana_kategori!: string;

    @prop({required:true})
    public ilgili_kategori!: string;

    @prop({required: true})
    public marka!: string;

    @prop({required: true})
    public fiyat!: number;
}

export const ProductModel = getModelForClass(Product)
