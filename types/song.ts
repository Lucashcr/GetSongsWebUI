import type Artist from "./artist";
import type Category from "./category";

export default interface Song {
  id: string;
  name: string;
  slug: string;
  artist: Artist;
  category: Category;
  lyrics_url: string;
  preview_url: string;
}
