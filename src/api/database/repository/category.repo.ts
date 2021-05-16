import { Types } from 'mongoose';
import { Category, ICategory } from '../models/category.model';
import INominee from '../models/nominee.model';

class CategoryRepo {
  public static async create(category: ICategory): Promise<ICategory> {
    return await Category.create(category);
  }

  public static async createNominees(
    categoryId: Types.ObjectId,
    nominees: INominee[]
  ): Promise<ICategory | null> {
    return await Category.findByIdAndUpdate(categoryId, { Nominees: nominees });
  }

  public static async findUnique(categoryId: Types.ObjectId): Promise<ICategory | null> {
    return await Category.findById(categoryId);
  }

  public static async findAll(): Promise<ICategory[] | null> {
    return await Category.find();
  }
}

export default CategoryRepo;
