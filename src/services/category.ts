import { Types } from 'mongoose';
import { ICategory } from '../api/database/models/category.model';
import { INominee, Nominee } from '../api/database/models/nominee.model';
import CategoryRepo from '../api/database/repository/category.repo';

class Category {
  public static async Create(category: ICategory): Promise<ICategory> {
    return await CategoryRepo.create(category);
  }

  public static async AddNominees(
    categoryId: Types.ObjectId,
    nominees: INominee[]
  ): Promise<INominee[] | null> {
    return await CategoryRepo.createNominees(categoryId, nominees);
  }

  public static async fetchAllCategories(): Promise<ICategory[] | null> {
    const categories = <ICategory[]>await CategoryRepo.findAll();
    const finalCategories = [];

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const nominees = await Nominee.find({ category: category._id });
      const constructedCategory = { ...category, nominees };
      finalCategories.push(constructedCategory);
    }

    return finalCategories;
  }
}

export default Category;
