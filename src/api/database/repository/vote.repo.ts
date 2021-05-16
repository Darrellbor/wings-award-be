import { Types } from 'mongoose';
import { Vote, IVote } from '../models/vote.model';

class VoteRepo {
  public static async create(vote: IVote): Promise<IVote> {
    return await Vote.create(vote);
  }

  public static async findUnique(voteId: Types.ObjectId): Promise<IVote | null> {
    return await Vote.findById(voteId)
      .populate('votes.category', 'name')
      .populate('votes.nominee', 'name socialHandle');
  }

  public static async findAll(): Promise<IVote[] | null> {
    return await Vote.find()
      .populate('votes.category', 'name')
      .populate('votes.nominee', 'name socialHandle');
  }

  public static async updateUnique(
    voteId: Types.ObjectId,
    update: { confirmed: boolean }
  ): Promise<IVote | null> {
    return await Vote.findByIdAndUpdate(voteId, update);
  }
}

export default VoteRepo;
