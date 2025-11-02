# Frontend Code Style Guide

This guide is based on the [Official Vue.js 3 Style Guide](https://vuejs.org/style-guide/ "Vue.js 3 Style Guide") and common JavaScript style.
## 1. General Code
### 1.1. Scope

* Applicable to all front-end code (JavaScript, HTML, and Vue)

### 1.2. Naming

* Avoid using meaningless names (e.g., `a_2`)
* Correct cases (e.g., `loginState`, `isFilling`)

## 2. Conventions

* **Component Files:** `camelCase` (e.g., `contact.vue`, `userProfile.vue`).
* **Components:** `kebab-case` (e.g., `<el-button>`).
* **Functions:** `camelCase` (e.g., `loadContacts`).
* **Variables:** `camelCase` (e.g., `loading`, `formRef`).
* **Constants:** `UPPERCASE_WITH_UNDERSCORES` (e.g., `API_BASE_URL`).
* **Props and Attributes:** `kebab-case` (e.g., `:data="contacts"`, `@click="save"`).

## 3. Formatting

### 3.1. General
* **Indentation:** Use 2 spaces instead of using tab.

* **Semicolons:** Use semicolons at the end of statements.

### 3.2. Imports
It should be on separate lines and grouped in the following order:

*  Vue/Router library imports (e.g., `vue`, `vue-router`).
* Third-party library imports (e.g., `element-plus`, `@element-plus/icons-vue`).
*  Local application/library imports (e.g., `from '../api'`, `from './components/...'`).


## 4. Component Structure

* **`<script setup>`:** Always use `<script setup>` for new components.
* **`<style scoped>`:** Always use the `scoped` for component styles. This could prevent global pollution.

### 4.1. Component Logic

* Use `ref` for primitive values (string, number, boolean) and single object/array references.
* Use `reactive` for complex objects that will be modified directly.
* Functions should be defined as `const functionName = () => {}`.

### 4.2. Lifecycle Hooks
* Use `onMounted`, `onUpdated`, etc. directly within `<script setup>`.

## 5. Application Logic and API
### 5.1. General
* **API Client:** All API requests should be centralized (e.g., in an `api.js` or `api/index.js` module).
* **Async/Await:** **Always** use `async/await` for handling asynchronous operations (e.g., API calls).
* **Error Handling:** All API calls must be wrapped in `try...catch` blocks to handle errors gracefully and provide user feedback (e.g., using `ElMessage.error()`).

### 5.2. Loading States
* Implement loading states (e.g., `loading = ref(false)`) for any action that involves an API call.
* Use this state to disable buttons (`:loading="loading"`) or show loading indicators (`v-loading="loading"S`) to prevent duplicate submissions.
