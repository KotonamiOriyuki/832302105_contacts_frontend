# Frontend of Contacts System

---

832302105_contacts_frontend

This is the first assignment of Software Engineering of Maynooth International Engineering College, Fuzhou University.

## Basic Features

---
* Provides standard RESTful API style.
* Support Create, Edit, Delete, Get features of contacts
* Extend functions provided (User login, Add Friends)

## Technical Stack

---
* Language: JavaScript
* Engine: Vue3 (node.js)
* Templates and UI: ElementPlus
* Launcher and Building Tool: Vite
* Requsts Handler: axios

## Other Requirements

---
See the package.json
* Git or Github Desktop
* node.js
* vue 3.3.4
* vite 5.0.0
* elementplus 2.4.2
* axios 1.6.0

## Deploy to Local Machine

---
### 1. Clone the code
> git clone xxx\
> cd xxx

Alternatively, you can download the .zip file of this git repo.
### 2. Install dependencies
npm
> npm install

### 3. Launch
npm
> npm run dev

## Access the Backend Locally

---
The default backend address is 
> http://0.0.0.0:3000/

You can modify `vite.config.js`, Line 6:
> server: { port: 3000 }

To change the default settings.

# Appendix

---
## File Structure

---
> public\
> └ index.html   // default page and the container of javascript\
> src\
> ├ api.js   // handling the API call function\
> ├ main.js // container of contacts.vue\
> ├ contacts.vue   // default page of vue.js\
> ├ router.js // define the permission (logout user cannot visit specific page) and address redirection\
> views\
> ├ register.vue // register page\
> ├ login.vue // login page\
> ├ layout.vue // the aside bar and header design (components in main section are home.vue and profile.vue)\
> ├ home.vue // a list of contacts, supports create, edit, and delete operation\
> └ profile.vue // a page show your personal profile in a sheet, supports the editing operation.

