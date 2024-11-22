import type { CommitCreate } from "@skyware/jetstream";
import type { WantedCollection } from "../lib/types.js";

type StandardAlgoArgs = {
  record: CommitCreate<WantedCollection>["record"];
};
export function standardAlgo({ record }: StandardAlgoArgs) {
  const score = 0;
}
