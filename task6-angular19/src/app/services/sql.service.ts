import { openDB } from 'idb';
import { Injectable } from '@angular/core';
import initSqlJs, { Database, SqlJsStatic } from 'sql.js';

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

  private async loadDataFromIndexedDBToSqlite(): Promise<void> {
    try {
    } catch (error) {
      console.log('Error loading data from IndexedDB:', error);
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
        await userStore.put({ id, firstName, lastName, email, password });
      }

      const existingTasksIds = await idb
        .getAll('taskTable')
        .then((tasks) => tasks.map((task) => task.id));
      await this.deleteTaskNotInSqlite(
        idb as unknown as IDBDatabase,
        existingTasksIds,
        taskRows,
      );

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
        await taskStore.put({
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

  private async deleteTaskNotInSqlite(
    idb: IDBDatabase,
    existingTaskIDs: number[],
    taskRows: any[],
  ) {
    const taskTable = idb
      .transaction('taskTable', 'readwrite')
      .objectStore('taskTable');

    // delete tasks
    const taskIdsInSQLite = taskRows.map((taskRow) => taskRow.id);

    for (const taskId of existingTaskIDs) {
      if (!taskIdsInSQLite.includes(taskId.toString())) {
        taskTable.delete(taskId);
      }
    }
  }

  // Add a new task
  public async addTask(task: Task): Promise<Task | null> {
    console.log('add task', task);
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
      const result = this.db.exec('SELECT last_insert_rowid() as id;');
      const taskId = result[0]?.values[0][0];
      if (taskId === undefined || taskId === null) {
        throw new Error('Failed to retrieve the ID of the inserted task.');
      }
      const savedTask: Task = {
        ...task,
        id: taskId.toString(),
        MarkTaskToCompleted: task.MarkTaskToCompleted,
      };
      await this.saveDatabaseToIndexedDB();
      return savedTask;
    } else {
      return null;
    }
  }

  public async updateTask(taskId: number, updatedTask: Task): Promise<void> {
    console.log('update task from sql Service', updatedTask);
    if (this.db) {
      this.db.run(
        `
            UPDATE taskTable
            SET dueDate = ?, completed = ?, completedAt = ?
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

  public async deleteTask(taskId: number, userId: number): Promise<Boolean> {
    console.log(
      'delete task from sql Service, taskId:',
      taskId,
      'userId',
      userId,
    );
    if (this.db) {
      const result = this.db.run(
        `
        DELETE FROM taskTable WHERE id = ? and userId = ?;
      `,
        [taskId, userId],
      );
      const res = this.db.exec('SELECT * FROM taskTable');
      console.log('taskTable after deleting the the specific row', res);
      console.log('delete Task result', result);
      await this.saveDatabaseToIndexedDB();
      return true;
    } else {
      return false;
    }
  }

  private async getAllTasksIdFromIndexedDB(
    idb: IDBDatabase,
  ): Promise<number[]> {
    return new Promise((resolve, reject) => {
      const taskTable = idb
        .transaction('taskTable', 'readwrite')
        .objectStore('taskTable');
    });
    const taskIds: number[] = [];
  }

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
