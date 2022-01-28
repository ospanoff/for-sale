import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";

class Bettor {
  constructor(
    readonly id: string,
    readonly email: string,
    readonly amount: number
  ) {}
}

export default Bettor;

export const itemBettorConverter = {
  toFirestore(item: WithFieldValue<Bettor>): DocumentData {
    return {
      email: item.email,
      amount: item.amount,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Bettor {
    const data = snapshot.data(options);
    return new Bettor(data.id, data.email, data.amount);
  },
};
