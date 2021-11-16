<template>
  <transition name="todo" appear>
    <li>
      <label>
        <input
          type="checkbox"
          :checked="todoObj.done"
          @change="handleCheck(todoObj.id)"
        />
        <!-- 下面这个代码 可以实现一样的功能 但是不要这样写！！修改了props的属性 -->
        <!-- <input type="checkbox" v-model="todoObj.done" /> -->
        <span v-show="!todoObj.isEdit"> {{ todoObj.title }}</span>
        <input
          type="text"
          :value="todoObj.title"
          v-show="todoObj.isEdit"
          @blur="handleBlur(todoObj, $event)"
          @keyup.enter="handleEnter"
          ref="inputTitle"
          style="outline: none; margin-left: 5px"
        />
      </label>
      <button class="btn btn-danger" @click="handleTodo(todoObj.id)">
        删除
      </button>
      <button
        class="btn btn-edit"
        @click="handleEdit(todoObj)"
        v-show="!todoObj.isEdit"
      >
        编辑
      </button>
    </li>
  </transition>
</template>

<script>
export default {
  name: "Item",
  props: ["todoObj"],
  methods: {
    handleCheck(id) {
      // 触发全局事件总线
      this.$bus.$emit("checkTodo", id);
    },
    handleTodo(id) {
      if (confirm("确认删除吗？")) {
        this.$bus.$emit("deleteTodo", id);
      }
    },
    handleEdit(todo) {
      this.$set(todo, "isEdit", true);
      this.$nextTick(function () {
        this.$refs.inputTitle.focus();
      });
    },
    handleBlur(todo, e) {
      if (!e.target.value.trim()) {
        alert("输入不能为空");
        return;
      }
      this.$bus.$emit("editTodo", todo, e.target.value);
      todo.isEdit = false;
    },
    handleEnter(e) {
      e.target.blur();
    },
  },
};
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
  margin-left: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover {
  background-color: #ddd;
}
li:hover button {
  display: block;
}
.todo-enter-active {
  animation: todoAnimate 0.5s linear;
}
.todo-leave-active {
  animation: todoAnimate 0.5s linear reverse;
}
@keyframes todoAnimate {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>