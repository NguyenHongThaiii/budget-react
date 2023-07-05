export class Service {
  db = null;
  constructor(db) {
    this.db = db;
  }
  get getDb() {
    return this.db;
  }
}
