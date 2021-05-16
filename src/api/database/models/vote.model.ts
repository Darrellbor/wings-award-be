import { modelOptions, prop, Ref, getModelForClass } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { ICategory } from './category.model';
import { INominee } from './nominee.model';

export class voteItem extends Base {
  @prop({ ref: ICategory, required: true })
  public category!: Ref<ICategory>;

  @prop({ ref: INominee })
  public nominee?: Ref<INominee>;
}

@modelOptions({ schemaOptions: { timestamps: true, collection: 'votes' } })
class IVote extends Base {
  @prop({ required: true, unique: true, index: true })
  public email!: string;

  @prop({ default: false })
  public confirmed?: boolean;

  @prop({ required: true })
  public signature!: string;

  @prop({ type: () => [voteItem] })
  public votes?: voteItem[];
}

const Vote = getModelForClass(IVote);

export { IVote, Vote };
