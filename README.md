# Sweet Shop Management System

Welcome to the Sweet Shop Management System — a full-stack web application that helps you manage your sweet inventory with ease. This system is designed to  add sweets, view inventory, sorting, searching, purchasing, and restocking.

---

## 🚀 Project Overview

This system includes:

### ✅ Features

- Add sweets with category, name, price, and quantity.
- View all sweets in a responsive table.
- Search and sort sweets by name, category, or price.
- Purchase sweets (quantity decreases).
- Restock sweets (quantity increases).
- Error validation and category restriction.
- Tailwind CSS-based responsive UI.
- Proper folder structuring for scalability.

---

## 🛠️ Tech Stack

| Part       | Technology                      |
|------------|----------------------------------|
| Frontend   | React (Vite) + Tailwind CSS      |
| Backend    | Node.js + Express.js             |
| Database   | MongoDB                          |
| Testing    | Jest + Supertest (Optional)      |
| Versioning | Git + GitHub                     |

## 🧾 Folder Structure

<img width="360" height="604" alt="image" src="https://github.com/user-attachments/assets/02096a17-844a-4124-87f5-b5e0e8aa0b98" />
<img width="368" height="525" alt="image" src="https://github.com/user-attachments/assets/673b6c5d-40a5-4732-bf8b-f2f1f7d4d89b" />

## Photos

<img width="746" height="642" alt="image" src="https://github.com/user-attachments/assets/4a51d334-7d97-483d-b488-3510ccfa31e4" />
<img width="1321" height="633" alt="Screenshot 2025-07-16 154117" src="https://github.com/user-attachments/assets/0ea5a493-41d5-43d7-9186-e69831c912dc" />
<img width="1596" height="850" alt="Screenshot 2025-07-16 154252" src="https://github.com/user-attachments/assets/4e26d1c0-6d05-4867-8589-47d6ee63eb02" />

---

## UI Images

<img width="1876" height="810" alt="image" src="https://github.com/user-attachments/assets/595dccf3-a264-4b9f-958b-2a485af32622" />
<img width="1874" height="808" alt="image" src="https://github.com/user-attachments/assets/c3318585-208d-4ef2-a2b8-1132595b50fa" />
<img width="1869" height="817" alt="image" src="https://github.com/user-attachments/assets/bc039be7-6ae0-4a31-ab87-26f5a36a6bc5" />
sort price 
<img width="1881" height="806" alt="image" src="https://github.com/user-attachments/assets/e5f06d62-b95a-4ac4-aa33-7b3ec0c98dcf" />
<img width="1875" height="805" alt="image" src="https://github.com/user-attachments/assets/a8b2a4bd-a88a-46cb-8fd4-371369e7b1ac" />



## 🧠 Developer Notes (Project Evolution)

Initially, I started implementing this project using basic JavaScript with an in-memory object to manage sweet data. This helped me quickly prototype the functionality (like add, restock, purchase).

Later, I upgraded the backend to use **MongoDB**, allowing persistent data storage. I committed these changes progressively to maintain version history and demonstrate the learning curve.

After that, I restructured the project:
- Moved all backend-related files into a dedicated `Backend/` folder.
- Built a new frontend using **React + Tailwind** and placed it inside the `Frontend/` folder.

⚠️ **Note:** Some older backend files (like `setup.js`, `index.js`) may still appear outside the `Backend/` folder due to earlier commits. These are now logically part of the `Backend/` folder and will be cleaned/refactored in future commits.

This README and structure reflect my growth in organizing full-stack projects and learning to separate concerns cleanly.

## 🚀 How to Run This Project on Your PC

### 1. Clone the Repository

```
git clone https://github.com/YourUsername/Sweet-Shop-Management-System.git
cd Sweet-Shop-Management-System
```

## 2. Backend Setup

```
cd backend
npm install
npm run dev
```

Ensure MongoDB is running locally or provide your MongoDB Atlas URI in a .env file:

```bash
MONGO_URI=your_mongodb_connection_string
```
## 3. Frontend Setup

```
cd ../frontend
npm install
npm run dev
```

### Now visit http://localhost:5173 to view the app.

## 🧪 Testing Guidelines
You can test the following:

✅ Add a sweet with valid/invalid category (like "Chocolate", "Pastry", etc.)

✅ Purchase an item and check stock count

✅ Restock an item and verify update

✅ Search and sort items

✅ Try submitting invalid data (e.g., negative price, blank fields)

ℹ️ Errors and validations are handled at the backend using custom exception classes.

## 🤖 Learning Approach and AI Help
Throughout the development of this project, I used various AI tools to learn, debug, and implement features faster:

💡 ChatGPT – Frontend design, backend error handling, code architecture

💙 Loveable AI – Error diagnosis and UX suggestions

🌟 Claude – Code refactoring and logic testing


## 🔚 Conclusion

### 🧪 Test-Driven Development (TDD)
Backend was implemented using TDD practices with unit tests written before actual implementation.

Ensured reliable and maintainable code with proper error handling and edge case coverage.

### 📝 Conventional Commits
Followed Conventional Commits for structured commit messages:

feat: for new features

fix: for bug fixes

refactor: for code refactoring

test: for writing tests

## 👤 Author
Anuj Chauhan
GitHub: @Anuj-Chauhan19

If you have any suggestions or feedback, feel free to raise an issue or contact me.





