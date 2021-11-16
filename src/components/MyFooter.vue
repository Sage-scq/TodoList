<template>
  <div class="todo-footer" v-show="todos.length">
    <label>
      <input type="checkbox" :checked="isAll" @change="checkAll($event)" />
    </label>
    <span>
      <span>已完成{{ doneTotal }}</span> / 全部{{ todos.length }}
    </span>
    <button class="btn btn-danger" @click="clearAll">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name: "MyFooter",
  props: ["todos", "clearAllDone"],
  computed: {
    doneTotal() {
      return this.todos.filter((todo) => {
        return todo.done === true;
      }).length;
    },
    isAll() {
      return this.doneTotal === this.todos.length;
    },
  },
  methods: {
    checkAll(e) {
      this.todos.forEach((todo) => {
        todo.done = e.target.checked;
      });
    },
    clearAll() {
      this.$emit("clearAllDone");
    },
  },
};
</script>

<style scoped>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>