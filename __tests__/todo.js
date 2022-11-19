/* eslint-disable no-undef */

const todoList = require("../todo");
const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};
var dto = new Date();
const tod = formattedDate(dto);
const yesterday = formattedDate(
  new Date(new Date().setDate(dto.getDate() - 1))
);
const tomorrow = formattedDate(
  new Date(new Date().setDate(dto.getDate() + 1))
);
const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("TodoList Test Suite", () => {
  beforeAll(() => {
    add({
      title: "todo1",
      completed: false,
      dueDate: tod,
    });
    add({
      title: "todo2",
      completed: false,
      dueDate: yesterday,
    });
    add({
      title: "todo3",
      completed: false,
      dueDate: tomorrow,
    });
  });
  test("add", () => {
    const count = all.length;
    add({
      title: "todo4",
      completed: true,
      dueDate: tod,
    });
    expect(all.length).toBe(count + 1);
  });
  test("markAsComplete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("overdue_items", () => {
    let overdue_list = overdue();
    expect(overdue_list.length).toBe(1);
    expect(overdue_list[0]).toBe(all[1]);
  });
  test("dueToday_items", () => {
    let dueToday_list = dueToday();
    expect(dueToday_list.length).toBe(2);
    expect(dueToday_list[0]).toBe(all[0]);
    expect(dueToday_list[1]).toBe(all[3]);
  });
  test("dueLater_items", () => {
    let dueLater_list = dueLater();
    expect(dueLater_list.length).toBe(1);
    expect(dueLater_list[0]).toBe(all[2]);
  });
});
