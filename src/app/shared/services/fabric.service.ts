import {Injectable} from '@angular/core';
import {Canvas} from "fabric/fabric-impl";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/firestore";
import {AngularFireAuth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class FabricService {
  public canvas?: Canvas;

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth,) {
  }

  async SaveCanvas() {
    if (this.canvas) {
      this.canvas.toJSON()
      const uid: string | undefined = (await this.afAuth.currentUser)?.uid
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
      return userRef.set({canvas: this.canvas.toJSON()}, {
        merge: true
      })
    }
    return undefined
  }

  async LoadCanvas() {
    const uid: string | undefined = (await this.afAuth.authState.toPromise())?.uid
    console.log(uid)
    const {canvas} = (await this.afs.doc(`users/${uid}`).get().toPromise()).data() as any;
    return canvas
  }
}
