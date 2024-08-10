import { RecordModel } from "pocketbase";

type PBUserRecord = {
  access_token: string;
  avatar: string;
  bio: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  github_login: string;
  id: string;
  updated: string;
  username: string;
  verified: boolean;
  expand: PBUserRecordExpand;
};

type TUserSignUpFormFields = Pick<
  PBUserRecord,
  "email" | "emailVisibility" | "username" | "avatar" | "github_login"
> & {
  password: string;
  confirmPassword: string;
};

type Movie = {
  user: string;
  title: string;
  year: number;
  poster: string;
};
type RMovie = RecordModel & Movie;
