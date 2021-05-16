import { prop, Ref, getModelForClass, modelOptions } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ICategory } from './category.model';

@modelOptions({ schemaOptions: { timestamps: true, collection: 'nominees' } })
class INominee extends Base {
  @prop({ ref: ICategory, required: true })
  public category!: Ref<ICategory>;

  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public image!: string;

  @prop()
  public socialHandle?: string;
}

const Nominee = getModelForClass(INominee);

export { Nominee, INominee };
