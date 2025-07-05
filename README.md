# Alison Full Stack Developer Assessment

## ✅ Features Implemented

### 📄 Pages

- **/numbers** – Add integers and view adjacent number pairs with their sums
- **/grades** – Submit class grades and analyze data

### ⚙️ Tech Stack & Tools

- **Next.js (App Router)**
- **React (Client & Server Components)**
- **Material UI (MUI)**
- **PostgreSQL (via Docker)**
- **Prisma** – _Used for schema creation only_
- **Raw SQL** – Used for **all** database operations
- **API Routes** – For data fetching and manipulation

---

## 📌 Assumptions & Decisions Made

- ✅ **Used Prisma for schema setup only**: All data operations (insert/fetch) are performed with raw SQL queries using the `postgres` package.
- ✅ **Used Next.js API Routes**: Provides clear separation of client and server responsibilities, along with easier unit testing and RESTful logic.
- ✅ **Added Input Validation**:
  - Number input allows positive/negative integers.
  - Grade input constrained to numeric range (0–100).
  - Class selection validated from predefined options.
- ✅ **Implemented Error Boundaries** to prevent UI crashes on unexpected errors.

---

## 🧪 Bonus Features

- [x] Input validation on both frontend and backend
- [x] Error boundaries
- [ ] Unit tests _(not implemented due to time constraints, but testable architecture is in place)_
- [ ] Performance optimization _(basic memoization added where applicable)_

---

## ⏱️ Time Spent

- The entire assessment was completed in **approximately 4 hours**.

---
