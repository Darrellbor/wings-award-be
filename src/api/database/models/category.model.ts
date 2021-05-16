import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'categories',
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
})
class ICategory extends Base {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public description!: string;
}

const Category = getModelForClass(ICategory);

export { ICategory, Category };
