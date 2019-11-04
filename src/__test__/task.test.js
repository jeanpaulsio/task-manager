import request from "supertest";
import app from "../app";
import Task from "../models/task";
import { taskOne, setupDatabase } from "./fixtures/db";

beforeEach(setupDatabase);

test("Should create a task", async () => {
  const response = await request(app)
    .post("/tasks")
    .send({ description: "test task" })
    .expect(201);
  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("Should fetch all tasks", async () => {
  const response = await request(app)
    .get("/tasks")
    .send()
    .expect(200);
  expect(response.body.length).toEqual(3);
});

test("Should fetch a single task", async () => {
  const response = await request(app)
    .get(`/tasks/${taskOne._id}`)
    .send()
    .expect(200);

  expect(response.body.description).toEqual(taskOne.description);
  expect(response.body.completed).toEqual(taskOne.completed);
});

test("Should update a task", async () => {
  const response = await request(app)
    .patch(`/tasks/${taskOne._id}`)
    .send({ description: "updated description", completed: true })
    .expect(200);
  expect(response.body.description).toEqual("updated description");
  expect(response.body.completed).toEqual(true);
});

test("Should delete a task", async () => {
  expect((await Task.find({})).length).toEqual(3);

  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .send()
    .expect(200);
  expect(response.body.description).toEqual(taskOne.description);

  expect((await Task.find({})).length).toEqual(2);
});
