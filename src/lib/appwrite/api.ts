import { INewUser } from "@/types";
import { account } from "./config";
import { ID } from "appwrite";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(ID.unique(), user.email, user.name, user.password);

    return newAccount;
  } catch (error) {
    console.log(error);
  }
}
