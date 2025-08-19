import conf from "../.conf/conf"
import { Client, Account, ID } from "appwrite";

class AppwriteAuth {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
  }
  async createAccount(email, password, name) {
    try {
      const userAcccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAcccount) {
        return await this.login({ email, password });
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }

  async getCurrentUser() {
    try {
      await this.account.get();
    } catch {
      console.log("Error getting Account info", error);
    }
  }

  async logout(){
    try{
        await this.account.deleteSession("current")
    } catch{
      console.log("Error getting logging out", error);
    }
  }

}

const authService = new AppwriteAuth();
export default authService;
