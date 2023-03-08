window.todoStore = {
	todos: JSON.parse(localStorage.getItem("todo-store")) || [],
	save() {
		localStorage.setItem("todo-store", JSON.stringify(this.todos));
	},
};
window.todos = function () {
	return {
		...todoStore,
		newTodo: "",
		editedTodo: null,
		filter: "all",
		get active() {
			return this.todos.filter((todo) => !todo.completed);
		},
		get completed() {
			return this.todos.filter((todo) => todo.completed);
		},
		get filteredTodos() {
			return {
				all: this.todos,
				active: this.active,
				completed: this.completed,
			}[this.filter];
		},
		get allComplete() {
			return this.todos.length === this.completed.length;
		},
		addTodo() {
			if (!this.newTodo) return;

			this.todos.push({
				id: Date.now(),
				body: this.newTodo,
				completed: false,
			});
			this.save();
			this.newTodo = "";
		},
		editTodo(todo) {
			todo.cachedBody = todo.body;
			this.editedTodo = todo;
		},
		editComplete(todo) {
			if (todo.body.trim() === "") {
				this.deleteTodo(todo);
			}
			this.editedTodo = null;
			this.save();
		},
		cancelEdit(todo) {
			todo.body = todo.cachedBody;
			this.editedTodo = null;
			delete todo.cachedBody;
		},
		deleteTodo(todo) {
			let position = this.todos.indexOf(todo);
			this.todos.splice(position, 1);
			this.save();
		},
		toggleTodoCompletion(todo) {
			todo.completed = !todo.completed;
			this.save();
		},
		toggleAllComplete() {
			let allComplete = this.allComplete;
			this.todos.forEach((todo) => (todo.completed = !allComplete));
			this.save();
		},
		clearCompletedTodos() {
			this.todos = active;
			this.save();
		},
	};
};
