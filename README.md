# 🏘️ flatRentEase

A simple and user-friendly Angular web application that allows users to browse, list, and favorite rental flats using Firebase Authentication and Firestore as a backend.

---

## 👥 Team

**Team104**  
Developed as part of a student group project to demonstrate skills in Angular, Firebase, and full-stack development.

---

## 🔐 Test Users

You can use the following credentials to log in and test the app:

- [a@gmail.com](mailto:a@gmail.com) / **1234567**
- [abc@gmail.com](mailto:abc@gmail.com) / **1234567**

---

## 🧭 Pages in the App

| Page      | Description                                 |
|-----------|---------------------------------------------|
| `login`   | Allows users to authenticate with Firebase. |
| `list`    | Displays all available flats.               |
| `favorite`| Shows user's favorited flats.               |
| `profile` | Displays user profile and logout option.    |

---

## 🔥 Firestore

The app uses Firestore to store and retrieve flat listings and user favorites. The collections are:

- **flats** – stores information about listed flats (name, image, price, location, etc.)
- **users** – stores user-specific data including favorites.

---

## 🚀 Tech Stack

- **Angular 16+**
- **Firebase Authentication**
- **Cloud Firestore**
- **JavaScript**

---

## 🛠️ Features

- 🔐 User authentication with Firebase
- 🏠 Add and browse rental listings
- ❤️ Add flats to favorites
- 🧾 View and manage your own listings (optional)
- 🎯 Firestore integration with real-time data updates

---

## 📂 Project Structure

Key folders and files:

- `/src/app/` – main Angular components
- `/assets/` – static assets
- `app.config.ts` – environment configuration
- `firebase.ts` – Firebase initialization

---

## 🧪 How to Run Locally

```bash
npm install
ng serve
