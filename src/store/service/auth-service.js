import { auth } from "@firebase-config";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Service } from "./service";

export class AuthService extends Service {
  constructor(db) {
    super(db);
  }
  async login(email, password) {
    const user = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("user", JSON.stringify({ id: user.user?.uid, email }));
    return { id: user.user?.uid, email };
  }

  async logout() {
    await signOut(auth);
    localStorage.removeItem("user");
    return null;
  }
}
