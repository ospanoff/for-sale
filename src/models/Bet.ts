import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

class Bet {
  constructor(readonly email: string, readonly amount: number) {}
}

export default Bet;

export const betConverter = {
  toFirestore(_item: WithFieldValue<Bet>): DocumentData {
    throw new Error("Not implemented");
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Bet {
    const data = snapshot.data(options);
    return new Bet(snapshot.id, data.amount);
  },
};
