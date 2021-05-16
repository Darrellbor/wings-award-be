import { Types } from 'mongoose';
import { Category, ICategory } from '../models/category.model';
import { INominee, Nominee } from '../models/nominee.model';

class CategoryRepo {
  public static async create(category: ICategory): Promise<ICategory> {
    return await Category.create(category);
  }

  public static async createNominees(
    categoryId: Types.ObjectId,
    nominees: INominee[]
  ): Promise<INominee[] | null> {
    const createdNominees: INominee[] = [];

    for (let i = 0; i < nominees.length; i++) {
      const nominee = nominees[i];
      createdNominees.push(await Nominee.create({ ...nominee, category: categoryId }));
    }

    return createdNominees;
  }

  public static async findUnique(categoryId: Types.ObjectId): Promise<ICategory | null> {
    return await Category.findById(categoryId);
  }

  public static async findAll(): Promise<ICategory[] | null> {
    return await Category.find().lean();
  }

  public static async findNominees(categoryId: Types.ObjectId): Promise<INominee[] | null> {
    return await Nominee.find({ category: categoryId });
  }
}

export default CategoryRepo;
