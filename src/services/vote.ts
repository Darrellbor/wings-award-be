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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

class Vote {
  public static async Create(vote: IVote): Promise<IVote> {
    const signature = uniqid('SIG_');
    const castedVote = await VoteRepo.create({ ...vote, signature });
    await confirmationEmail(vote.email, signature, castedVote._id);
    return castedVote;
  }

  public static async findOneVote(params: {
    email: string;
    signature: string;
  }): Promise<IVote | null> {
    return await VoteRepo.findOne(params);
  }

  public static async fetchAllVotes(): Promise<IVote[] | null> {
    return await VoteRepo.findAll({});
  }

  public static async updateVote(
    voteId: Types.ObjectId,
    update: { confirmed: boolean }
  ): Promise<IVote | null> {
    const vote = await VoteRepo.findUnique(voteId);
    if (!vote) throw new NotFoundError(`Vote with id ${voteId} not found!`);
    return await VoteRepo.updateUnique(voteId, update);
  }

  public static async unconfirmedVotes(sendEmails?: boolean): Promise<IVote[] | void> {
    const votes = await VoteRepo.findAll({ confirmed: false });
    if (votes?.length === 0) throw new NotFoundError(`There are no unconfirmed votes to remind`);

    if (votes && sendEmails) {
      for (const vote of votes) {
        setTimeout(async () => {
          await confirmationEmail(vote.email, vote.signature, vote._id);
        }, 10000);
      }

      return votes;
    } else if (votes) {
      return votes;
    }
  }

  public static async voteAnalysis(): Promise<VoteAnalyzedInterface[]> {
    const votes = <IVote[]>await VoteRepo.findAll({});
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
        if (confirmedVote && confirmedVote.category) {
          if (category.name === confirmedVote.category.name) {
            voteByPerson[confirmedVote.nominee.name]
              ? voteByPerson[confirmedVote.nominee.name]++
              : (voteByPerson[confirmedVote.nominee.name] = 1);
          }
        }
      }

      voteByPerson['CategoryName'] = category.name;
      voteAnalyzed.push(voteByPerson);
    }
    return voteAnalyzed;
  }
}

export default Vote;
