import {Injectable} from '@angular/core';
import {Canvas} from "fabric/fabric-impl";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";
import {first} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FabricService {
  public canvas?: Canvas;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth,) {
  }

  async SaveCanvas() {
    if (this.canvas) {
      const uid: string | undefined = (await this.afAuth.currentUser)?.uid
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
      return userRef.set({canvas: JSON.stringify(this.canvas.toJSON())}, {
        merge: true
      })
    }
    return undefined
  }

  getUser(): Promise<any> {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async LoadCanvas() {
    const user = await this.getUser();
    if (user) {
      const uid = user.uid;
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
      const data = await userRef.get().toPromise();
      const canvas = data.data() as any;
      return canvas.canvas;
    }
    return undefined;
  }
}
