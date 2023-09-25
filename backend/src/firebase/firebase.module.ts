import { Module, Global } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

const serviceAccount: ServiceAccount = require('./secrets/last-project-6fb33-firebase-adminsdk-vkui9-f0ef6cebcc.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'gs://last-project-6fb33.appspot.com',
});
const bucket = admin.storage().bucket();

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_BUCKET',
      useValue: bucket,
    },
  ],
  exports: ['FIREBASE_BUCKET'],
})
export class FirebaseModule {}
