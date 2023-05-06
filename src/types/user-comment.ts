type UserRating =
  | 1
  | 2
  | 3
  | 4
  | 5;

export type UserComment = {
  text: string;
  publishData: Date;
  rating: UserRating;
  userId: number;
}
