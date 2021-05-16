import { Types } from 'mongoose';
import { ICategory } from 'api/database/models/category.model';
import INominee from 'api/database/models/nominee.model';
import CategoryRepo from '../api/database/repository/category.repo';

class Category {
  public static async Create(category: ICategory): Promise<ICategory> {
    return await CategoryRepo.create(category);
  }

  public static async AddNominees(
    categoryId: Types.ObjectId,
    nominees: INominee[]
  ): Promise<ICategory | null> {
    return await CategoryRepo.createNominees(categoryId, nominees);
  }

  public static async fetchAllCategories(): Promise<ICategory[] | null> {
    return await CategoryRepo.findAll();
  }
}

export default Category;
