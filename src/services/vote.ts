import { Types } from 'mongoose';
import uniqid from 'uniqid';
import { IVote, voteItem } from 'api/database/models/vote.model';
import { ICategory } from 'api/database/models/category.model';
import VoteRepo from '../api/database/repository/vote.repo';
import CategoryRepo from '../api/database/repository/category.repo';
import { NotFoundError } from '../core/ApiError';
import { confirmationEmail } from '../templates/confirmation';

interface confirmedVotesInterface extends voteItem {
  category: {
    _id: Types.ObjectId;
    name: string;
    description: string;
  };
  nominee: {
    _id: Types.ObjectId;
    category: Types.ObjectId;
    name: string;
    image: string;
  };
}

interface VoteAnalyzedInterface {
  [key: string]: number | string;
}

class Vote {
  public static async Create(vote: IVote): Promise<IVote> {
    await confirmationEmail(vote.email);
    return await VoteRepo.create({ ...vote, signature: uniqid('SIG_') });
  }

  public static async fetchAllVotes(): Promise<IVote[] | null> {
    return await VoteRepo.findAll();
  }

  public static async updateVote(
    voteId: Types.ObjectId,
    update: { confirmed: boolean }
  ): Promise<IVote | null> {
    const vote = await VoteRepo.findUnique(voteId);
    if (!vote) throw new NotFoundError(`Vote with id ${voteId} not found!`);
    return await VoteRepo.updateUnique(voteId, update);
  }

  public static async voteAnalysis(): Promise<VoteAnalyzedInterface[]> {
    const votes = <IVote[]>await VoteRepo.findAll();
    const categories = <ICategory[]>await CategoryRepo.findAll();

    if (votes.length < 0) throw new NotFoundError(`There are no votes available to analyse`);

    let confirmedVotes: confirmedVotesInterface[] = [];
    const voteAnalyzed = [];

    for (let i = 0; i < votes?.length; i++) {
      const vote = votes[i];
      if (vote.confirmed) {
        confirmedVotes = [...confirmedVotes, ...(vote.votes as confirmedVotesInterface[])];
        confirmedVotes.concat(vote.votes as confirmedVotesInterface[]);
      }
    }

    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const voteByPerson: VoteAnalyzedInterface = {};

      for (let j = 0; j < confirmedVotes.length; j++) {
        const confirmedVote = confirmedVotes[j];
        if (category.name === confirmedVote.category.name) {
          voteByPerson[confirmedVote.nominee.name]
            ? <number>voteByPerson[confirmedVote.nominee.name] + 1
            : (voteByPerson[confirmedVote.nominee.name] = 1);
        }
      }

      voteByPerson['CategoryName'] = category.name;
      voteAnalyzed.push(voteByPerson);
    }
    return voteAnalyzed;
  }
}

export default Vote;
