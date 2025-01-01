import { Injectable } from '@angular/core';
import initSqlJs, { Database, SqlJsStatic } from 'sql.js';
import { openDB } from 'idb';
import { Task } from '../core/task';
import { User } from '../interface/interface';

@Injectable({
  providedIn: 'root',
})
export class SqlService {
  private SQL: SqlJsStatic | null = null;
  private db: Database | null = null;
  private readonly DB_NAME = 'TaskManagerDatabase';
  private STORE_NAME = 'database';

  constructor() {
    this.initSqlJs();
  }

  private async initSqlJs() {
    try {
      this.SQL = await initSqlJs({
        locateFile: (file) => `assets/${file}`,
      });
      await this.loadDatabaseFromIndexedDB();
    } catch (error) {
      console.error('Error initializing sql.js:', error);
    }
  }

  private async loadDatabaseFromIndexedDB(): Promise<void> {
    const db = await openDB(this.DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('database')) {
          db.createObjectStore('database');
        }
      },
    });

    const data = await db.get(this.STORE_NAME, 'database');
    if (data && this.SQL) {
      this.db = new this.SQL.Database(new Uint8Array(data));
    } else if (this.SQL) {
      this.db = new this.SQL.Database();
      this.initializeDatabase();
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
    }
  }

  private async saveDatabaseToIndexedDB(): Promise<void> {
    if (!this.db) return;

    const binaryArray = this.db.export();
    const db = await openDB(this.DB_NAME, 1);

    const blob = new Blob([binaryArray], { type: 'application/octet-stream' });
    await db.put(this.STORE_NAME, blob, 'database');
  }

  // Add a new task
  public async addTask(task: Task): Promise<void> {
    if (this.db) {
      this.db.run(
        `
        INSERT INTO taskTable (description, createdAt, dueDate, completed, completedAt, userId)
        VALUES (?, ?, ?, ?, ?, ?);
      `,
        [
          task.description,
          task.createdAt,
          task.dueDate,
          task.completed ? 1 : 0,
          task.completedAt,
          task.userId,
        ],
      );

      await this.saveDatabaseToIndexedDB();
    }
  }

  public async updateTask(taskId: number, updatedTask: Task): Promise<void> {
    if (this.db) {
      this.db.run(
        `
            UPDATE taskTable
            SET (dueDate = ?, completed = ?, completedAt = ?)
            WHERE id = ? and userId = ?;
          `,
        [
          updatedTask.dueDate,
          updatedTask.completed ? 1 : 0,
          updatedTask.completedAt,
          taskId,
          updatedTask.userId,
        ],
      );
      await this.saveDatabaseToIndexedDB();
    }
  }

  public async deleteTask(taskId: number, userId: number): Promise<void> {
    if (this.db) {
      this.db.run(
        `
        DELETE FROM taskTable WHERE id = ? and userId = ?;
      `,
        [taskId, userId],
      );
      await this.saveDatabaseToIndexedDB();
    }
  }

  public getAllTasks(userId: number): any[] {
    if (this.db) {
      const query = `SELECT * FROM taskTable WHERE userId = ?;`;

      const result = this.db.exec(query, [userId]);
      return result[0]?.values || [];
    }
    return [];
  }

  //add user
  public async addUser(user: User) {
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

  public async getUserByEmail(email: string): Promise<any | null> {
    if (this.db) {
      const result = this.db.exec(
        `SELECT * FROM userTable WHERE email = ? LIMIT 1;`,
        [email],
      );
      return result[0]?.values[0] || null;
    }
    return null;
  }
}
