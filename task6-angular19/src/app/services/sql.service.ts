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
      // Initialize the sql.js library
      this.SQL = await initSqlJs({
        locateFile: (file) => `assets/${file}`,
      });

      // Create an in-memory SQLite database
      this.db = new this.SQL.Database();

      // Check if IndexedDB already has data
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

      // Check if IndexedDB stores have any data
      const userCount = await idb.count(this.USER_STORE_NAME);
      const taskCount = await idb.count(this.TASK_STORE_NAME);

      if (userCount > 0 || taskCount > 0) {
        // If data exists in IndexedDB, load it into SQLite
        this.initializeDatabase();
        await this.loadDataFromIndexedDBToSqlite();
      } else {
        // If no data in IndexedDB, initialize the SQLite database and save it to IndexedDB
        this.initializeDatabase();
        await this.saveDatabaseToIndexedDB();
      }
    } catch (error) {
      console.error('Error initializing sql.js:', error);
    }
  }

  // Create Tables SQLite database
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

  // Load data from IndexedDB to SQLite
  private async loadDataFromIndexedDBToSqlite(): Promise<void> {
    if (!this.db || !this.SQL) {
      return;
    }
    try {
      const idb = await openDB(this.DB_NAME, 1);

      //load userTable data from indexedDB to sqlite
      const userTable = idb
        .transaction(this.USER_STORE_NAME, 'readonly')
        .objectStore(this.USER_STORE_NAME);
      const users = await userTable.getAll();

      if (users.length > 0) {
        for (const user of users) {
          this.db.run(
            `
              INSERT INTO userTable (id, firstName, lastName, email, password) VALUES (?, ?, ?, ?, ?);
              `,
            [user.id, user.firstName, user.lastName, user.email, user.password],
          );
        }
      }

      //load taskTable data from indexedDB to sqlite
      const taskTable = idb
        .transaction(this.TASK_STORE_NAME, 'readonly')
        .objectStore(this.TASK_STORE_NAME);
      const tasks = await taskTable.getAll();

      if (tasks.length > 0) {
        for (const task of tasks) {
          this.db.run(
            `
              INSERT INTO taskTable (id, description, createdAt, dueDate, completed, completedAt, userId)
              VALUES (?, ?, ?, ?, ?, ?, ?);
            `,
            [
              task.id,
              task.description,
              task.createdAt,
              task.dueDate,
              task.completed,
              task.completedAt,
              task.userId,
            ],
          );
        }
      }
      console.log('Successfully loaded data from IndexedDB to SQLite.');
    } catch (error) {
      console.log('Error loading data from IndexedDB:', error);
    }
  }

  // Save SQLite database to IndexedDB
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
      const userStore = idb
        .transaction('userTable', 'readwrite')
        .objectStore('userTable');
      for (const userRow of userRows) {
        const [id, firstName, lastName, email, password] = userRow;
        await userStore.put({ id, firstName, lastName, email, password });
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
      console.log('Successfully saved SQLite database to IndexedDB.');
    } catch (error) {
      console.error('Error saving SQLite database to IndexedDB:', error);
    }
  }

  // Add a new task
  public async addTask(task: Task): Promise<Task | null> {
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

  // Update a task
  public async updateTask(taskId: number, updatedTask: Task): Promise<void> {
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

  // Delete a task
  public async deleteTask(taskId: number, userId: number): Promise<Boolean> {
    console.log(
      'delete task from sql Service, taskId:',
      taskId,
      'userId',
      userId,
    );
    if (this.db) {
      try {
        this.db.exec(
          `
          DELETE FROM taskTable WHERE id = ? and userId = ?;
        `,
          [taskId, userId],
        );

        const idb = await openDB(this.DB_NAME, 1);
        const taskTable = idb
          .transaction(this.TASK_STORE_NAME, 'readwrite')
          .objectStore(this.TASK_STORE_NAME);
        await taskTable.delete(taskId);
        console.log('Task deleted successfully from SQLite.');
        return true;
      } catch (error) {
        console.error('Error deleting task:', error);
        return false;
      }
    } else {
      return false;
    }
  }

  // Get all tasks of a user
  public async getAllUserTasks(userId: number): Promise<Task[]> {
    if (this.db) {
      const result = this.db.exec(`SELECT * FROM taskTable WHERE userId = ?;`, [
        userId,
      ]);
      const tasks: Task[] = [];
      if (result[0]?.values) {
        for (const value of result[0].values) {
          const task: Task = {
            id: String(value[0]),
            description: String(value[1]),
            createdAt: String(value[2]),
            dueDate: String(value[3]),
            completed: Boolean(value[4]),
            completedAt: value[5] ? String(value[5]) : null,
            userId: String(value[6]),
            MarkTaskToCompleted: () => {},
          };
          tasks.push(task);
        }
      }
      return tasks;
    }
    return [];
  }

  // //add user
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

  //get user by email
  public async getUserByEmail(email: string): Promise<User | null> {
    if (this.db) {
      const result = this.db.exec(
        `SELECT * FROM userTable WHERE email = ? LIMIT 1;`,
        [email],
      );
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
