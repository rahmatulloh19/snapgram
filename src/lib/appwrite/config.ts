import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  url: "https://cloud.appwrite.io/v1",
  projectId: "6607ef424975c9ee8cc5",
  databaseId: "6607f8ad17b0626a12ee",
  storageId: "6607f84cf0faf82385e2",
  userCollectionId: "6607f8fa11e883e9460c",
  postCollectionId: "6607f8cc4c2ac5a5d84e",
  savesCollectionId: "6607f922e5ebd4ddc729",
};

export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
