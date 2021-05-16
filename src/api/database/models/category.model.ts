import { modelOptions, prop, getModelForClass } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

import INominee from './nominee.model';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'categories' } })
class ICategory extends Base {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public description!: string;

  @prop({ type: () => [INominee] })
  public Nominees!: INominee[];
}

const Category = getModelForClass(ICategory);

export { ICategory, Category };
