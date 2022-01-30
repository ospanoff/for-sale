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

export const bettorConverter = {
  toFirestore(_item: WithFieldValue<Bettor>): DocumentData {
    throw new Error("Not implemented");
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Bettor {
    const data = snapshot.data(options);
    return new Bettor(snapshot.id, data.email, data.amount);
  },
};
