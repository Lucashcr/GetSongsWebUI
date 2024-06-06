import type Hymnary from "./hymnary";

export default interface HymnariesListResponse {
  results: Hymnary[];
  count: number;
  next?: string;
  previous?: string;
}