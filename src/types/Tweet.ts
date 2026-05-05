export type Tweet = {
  id?: number;
  name?: string;
  username?: string;
  createdAt?: string;
  text: string;
  likes?: number;
  replies?: number;
  tag?: string;
};