// filepath: /c:/Users/ADMIN/Desktop/canaville/Frontend/src/firebase.d.ts

declare module "../firebase" {
  import { Firestore } from "firebase/firestore";
  const db: Firestore;
  export { db };
}