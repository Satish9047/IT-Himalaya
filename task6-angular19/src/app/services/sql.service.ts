import { Injectable } from '@angular/core';
import initSqlJs, { Database, SqlJsStatic } from 'sql.js';
import { openDB } from 'idb';
import { Task } from '../core/task';
import { User } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class SqlService {
  private SQL: SqlJsStatic | null = null; // sql.js library
  private db: Database | null = null; // SQLite database
  private readonly DB_NAME = 'TaskManagerDatabase';
  private USER_STORE_NAME = 'userTable';
  private TASK_STORE_NAME = 'taskTable';

  constructor() {
    this.initSqlJs();
  }

  private async initSqlJs() {
    try {
      this.SQL = await initSqlJs({
        locateFile: (file) => `assets/${file}`,
      });

      this.db = new this.SQL.Database();
      this.initializeDatabase();
      await this.saveDatabaseToIndexedDB();
    } catch (error) {
      console.error('Error initializing sql.js:', error);
    }
  }

  private initializeDatabase(): void {
    if (this.db) {
      this.db.run(`
        CREATE TABLE IF NOT EXISTS userTable (
          id INTEGER PRIMARY KEY,
          firstName TEXT,
          lastName TEXT,
          email TEXT UNIQUE,
          password TEXT
        );
      `);

      this.db.run(`
        CREATE TABLE IF NOT EXISTS taskTable (
          id INTEGER PRIMARY KEY,
          description TEXT,
          createdAt TEXT,
          dueDate TEXT,
          completed BOOLEAN,
          completedAt TEXT,
          userId INTEGER,
          FOREIGN KEY (userId) REFERENCES userTable (id)
        );
      `);

      this.db.run(`
        INSERT INTO userTable (firstName, lastName, email, password)
        Values (
          'admin',
          'admin',
          'admin@gmail.com',
          '123123123'
        );
      `);
    }
  }

  private async saveDatabaseToIndexedDB(): Promise<void> {
    if (!this.db) return;
    try {
      const idb = await openDB(this.DB_NAME, 1, {
        upgrade(db) {
          if (!db.objectStoreNames.contains('userTable')) {
            db.createObjectStore('userTable', { keyPath: 'id' });
          }
          if (!db.objectStoreNames.contains('taskTable')) {
            db.createObjectStore('taskTable', { keyPath: 'id' });
          }
        },
      });

      // step 2 - get the data from the sql.js database
      const userRows = this.db.exec('SELECT * FROM userTable')[0]?.values || [];
      const taskRows = this.db.exec('SELECT * FROM taskTable')[0]?.values || [];

      // step 3 -save the data into indexedDB
      //user
      const userStore = idb
        .transaction('userTable', 'readwrite')
        .objectStore('userTable');
      for (const userRow of userRows) {
        const [id, firstName, lastName, email, password] = userRow;
        userStore.put({ id, firstName, lastName, email, password });
      }

      // task
      const taskStore = idb
        .transaction('taskTable', 'readwrite')
        .objectStore('taskTable');
      for (const taskRow of taskRows) {
        const [
          id,
          description,
          createdAt,
          dueDate,
          completed,
          completedAt,
          userId,
        ] = taskRow;
        taskStore.put({
          id,
          description,
          createdAt,
          dueDate,
          completed,
          completedAt,
          userId,
        });
      }
    } catch (error) {
      console.error('Error saving SQLite database to IndexedDB:', error);
    }
  }

  // Add a new task
  public async addTask(task: Task): Promise<void> {
    console.log('add task', task);
    //   if (this.db) {
    //     this.db.run(
    //       `
    //       INSERT INTO taskTable (description, createdAt, dueDate, completed, completedAt, userId)
    //       VALUES (?, ?, ?, ?, ?, ?);
    //     `,
    //       [
    //         task.description,
    //         task.createdAt,
    //         task.dueDate,
    //         task.completed ? 1 : 0,
    //         task.completedAt,
    //         task.userId,
    //       ],
    //     );

    //     await this.saveDatabaseToIndexedDB();
    //   }
  }

  // public async updateTask(taskId: number, updatedTask: Task): Promise<void> {
  //   if (this.db) {
  //     this.db.run(
  //       `
  //           UPDATE taskTable
  //           SET (dueDate = ?, completed = ?, completedAt = ?)
  //           WHERE id = ? and userId = ?;
  //         `,
  //       [
  //         updatedTask.dueDate,
  //         updatedTask.completed ? 1 : 0,
  //         updatedTask.completedAt,
  //         taskId,
  //         updatedTask.userId,
  //       ],
  //     );
  //     await this.saveDatabaseToIndexedDB();
  //   }
  // }

  // public async deleteTask(taskId: number, userId: number): Promise<void> {
  //   if (this.db) {
  //     this.db.run(
  //       `
  //       DELETE FROM taskTable WHERE id = ? and userId = ?;
  //     `,
  //       [taskId, userId],
  //     );
  //     await this.saveDatabaseToIndexedDB();
  //   }
  // }

  // public getAllTasks(userId: number): any[] {
  //   if (this.db) {
  //     const query = `SELECT * FROM taskTable WHERE userId = ?;`;

  //     const result = this.db.exec(query, [userId]);
  //     return result[0]?.values || [];
  //   }
  //   return [];
  // }

  // //add user
  public async addUser(user: User) {
    console.log('add user', user);
    // return null;
    if (this.db) {
      this.db.run(
        `
          INSERT INTO userTable (firstName, lastName, email, password)
          VALUES (?, ?, ?, ?);
        `,
        [user.firstName, user.lastName, user.email, user.password ?? ''],
      );

      await this.saveDatabaseToIndexedDB();
      return true;
    }
    return false;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    console.log('get user by email', email);
    if (this.db) {
      const result = this.db.exec(
        `SELECT * FROM userTable WHERE email = ? LIMIT 1;`,
        [email],
      );
      console.log('result for getting the user by email', result[0]?.values[0]);
      if (result[0]?.values[0]) {
        const user: User = {
          id: String(result[0].values[0][0]),
          firstName: String(result[0].values[0][1]),
          lastName: String(result[0].values[0][2]),
          email: String(result[0].values[0][3]),
          password: String(result[0].values[0][4]),
        };
        return user;
      }
    }
    return null;
  }
}
