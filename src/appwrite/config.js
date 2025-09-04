import conf from "../.conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

class AppwritePost {
  client = new Client();
  database;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectID);
    this.database = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, content, featuredImage, status, userID, slug }) {
    try {
      return await this.database.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        ID.unique(),
        {
          title,
          content,
          featuredImage,
          status,
          userID,
          slug,
        }
      );
    } catch (error) {
      console.log("Error Creating the Post", error);
    }
  }

  async updatePost({ title, content, featuredImage, status, slug }, id) {
    try {
      console.log("Updating document with ID:", id);
      console.log("Update data:", { title, content, featuredImage, status, slug });
      
      return await this.database.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        id,
        {
          title,
          content,
          featuredImage,
          status,
          slug,
        }
      );
    } catch (error) {
      console.error("Failed to Update the Document", error);
      throw error; // Re-throw the error so it can be caught by the caller
    }
  }

  async getPost(id) {
    try {
      console.log("Fetching post with ID:", id);
      const post = await this.database.getDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        id
      );
      
      // Make sure the post has a slug field (important for editing)
      if (post && !post.slug) {
        console.log("Post has no slug field, adding it using $id:", post.$id);
        post.slug = post.$id;
      }
      
      return post;
    } catch (error) {
      console.error("Failed to Get the Post", error);
      throw error; // Re-throw the error so it can be caught by the caller
    }
  }

  async deletePost(id) {
    try {
      return await this.database.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        id
      );
    } catch (error) {
      console.log("Failed to Delete Post", error);
    }
  }

  async getPosts() {
    try {
      return await this.database.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        [Query.equal("status", "active")]
      );
    } catch (error) {
      console.log("Failed to Get Posts", error);
    }
  }

  // File Storage Service
  async uploadFile(file){
    try{
      return await this.bucket.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file
      );
    } catch(error){
      console.log("Failed to Upload File", error);
      return false;
    }
  }

  async deleteFile(fileID){
    try{
      return await this.bucket.deleteFile(
        conf.appwriteBucketID,
        fileID
      );
    } catch(error){
      console.log("Failed to Delete File", error);
      return false;
    }
  }

  getFilePreview(fileID){
    try{
      if (!fileID) return null;
      
      // Construct URL directly using the Appwrite endpoint
      return `${conf.appwriteEndpoint}/storage/buckets/${conf.appwriteBucketID}/files/${fileID}/preview?project=${conf.appwriteProjectID}`;
    } catch(error){
      console.log("Failed to Get File Preview", error);
      return null;
    }
  }

}

const PostService = new AppwritePost();

export default PostService;
