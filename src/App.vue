<template>
  <div id="root">
    <div class="todo-container">
      <div class="todo-wrap">
        <MyHeader @recieve="recieve" />
        <List :todos="todos" />
        <MyFooter :todos="todos" @clearAllDone="clearAllDone" />
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import List from "./components/List.vue";
import MyFooter from "./components/MyFooter.vue";

export default {
  name: "App",
  components: { MyHeader, List, MyFooter },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  methods: {
    // 这里是父亲给孩子传一个receive，然后孩子再调用，父亲就可以收到这个参数了
    recieve(todo) {
      this.todos.unshift(todo);
    },
    // 勾选or取消勾选
    checkTodo(id) {
      this.todos.forEach((todo) => {
        if (todo.id === id) {
          todo.done = !todo.done;
        }
      });
    },
    deletetodo(id) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== id;
      });
    },
    editTodo(todo, val) {
      todo.title = val;
    },
    clearAllDone() {
      this.todos = this.todos.filter((todo) => {
        return todo.done === false;
      });
    },
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
  mounted() {
    this.$bus.$on("checkTodo", this.checkTodo);
    this.$bus.$on("deleteTodo", this.deletetodo);
    this.$bus.$on("editTodo", this.editTodo);
  },
};
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}
.btn-edit {
  color: #fff;
  background-color: dodgerblue;
  border: 1px solid rgb(26, 123, 219);
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}
.btn-edit:hover {
  color: #fff;
  background-color: rgb(14, 72, 129);
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>

