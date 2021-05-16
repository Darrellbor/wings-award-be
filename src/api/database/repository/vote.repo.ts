import { Types } from 'mongoose';
import { Vote, IVote } from '../models/vote.model';

class VoteRepo {
  public static async create(vote: IVote): Promise<IVote> {
    return await Vote.create(vote);
  }

  public static async findUnique(voteId: Types.ObjectId): Promise<IVote | null> {
    return await Vote.findById(voteId);
  }

  public static async findAll(): Promise<IVote[] | null> {
    return await Vote.find();
  }
}

export default VoteRepo;
