import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "@firebase/auth";
import FirebaseAdminSdk from "../utils/firebase";

export interface EmailAuthInput {
  email: string;
  password: string;
}

/**
 * Handle authentication using Firebase
 */
export default class AuthRepository {
  auth: Auth;

  constructor() {
    this.auth = getAuth(FirebaseAdminSdk());
  }

  async registerWithEmailAndPassword({
    email,
    password,
  }: EmailAuthInput): Promise<UserCredential> {
    try {
      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throw error;
    }
  }

  async loginWithEmailAndPassword({
    email,
    password,
  }: EmailAuthInput): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      // Navigator.pushNamed(context!, Routes.initialRoute);
    } catch (e) {
      throw "Something went wrong ${e.toString}";
    }
  }
}
