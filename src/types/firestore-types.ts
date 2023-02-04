export interface FirestoreEntity {
    uid: string;
}

export interface Places extends FirestoreEntity {
    id: string;
    name: string;
}