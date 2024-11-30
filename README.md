Here’s the complete **README.md** with everything included, from installation to license, formatted for direct copy-pasting:

```markdown
# **Real-Time Collaborative Whiteboard**

A web-based whiteboard application that allows multiple users to draw, collaborate, and see each other’s changes in real time. The application features real-time synchronization, undo/redo functionality, and the ability to export drawings as an image.

---

## **Features**

- **Real-Time Collaboration:** Users can draw and see updates in real time across multiple tabs or devices.
- **Undo/Redo Functionality:** Revert or restore previous drawing actions.
- **Clear Canvas:** Clear the entire whiteboard for all users in real time.
- **Export as Image:** Download the current drawing as a PNG file.
- **User Count Display:** Shows the number of connected users.

---

## **Technologies Used**

- **Frontend:**
  - React.js
  - HTML5 Canvas
  - Socket.IO (client)
- **Backend:**
  - Node.js
  - Express.js
  - Socket.IO (server)

---

## **Installation and Setup**

### **1. Clone the Repository:**
```bash
git clone https://github.com/your-username/real-time-whiteboard.git
cd real-time-whiteboard
```

### **2. Install Dependencies:**

- **Frontend (React):**
  ```bash
  cd client
  npm install
  ```

- **Backend (Node.js):**
  ```bash
  cd server
  npm install
  ```

### **3. Run the Application:**

- **Start the Backend:**
  ```bash
  cd server
  node server.js
  ```

- **Start the Frontend:**
  ```bash
  cd client
  npm start
  ```

The application will be available at `http://localhost:3000`.

---

## **Usage Instructions**

1. Open the application in multiple tabs or devices.
2. Draw on the canvas using the mouse.
3. Use the toolbar to:
   - **Undo:** Revert the last action.
   - **Redo:** Restore an undone action.
   - **Clear Canvas:** Clear the whiteboard for all users.
   - **Export as Image:** Download the current drawing as a PNG file.

---

## **Project Structure**

```
real-time-whiteboard/
├── client/               # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── Canvas.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── Canvas.css
│   └── public/
├── server/               # Node.js backend
│   ├── server.js
│   └── package.json
└── README.md
```

---

## **Key Files**

- **`Canvas.js`:** Handles the drawing logic, real-time updates, undo/redo functionality, and export feature.
- **`server.js`:** Manages WebSocket connections, canvas state synchronization, and clear canvas events.

---

## **Future Enhancements**

- Add more drawing tools (shapes, text).
- Implement user authentication and private rooms.
- Allow saving and loading drawings from a database.

---

## **Contributing**

Contributions are welcome! Feel free to fork the repository and submit a pull request.

---

## **License**

This project is licensed under the MIT License.
```
