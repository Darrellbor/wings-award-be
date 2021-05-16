import { prop } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

class Nominees extends Base {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public image!: string;

  @prop()
  public socialHandle?: string;
}

export default Nominees;
