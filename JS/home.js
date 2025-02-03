import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getDatabase,
  get,
  ref,
  set,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAKoE7m49cheXf-CAdeAk9zYVe_OxX8H7o",
  authDomain: "blogbreeze-e6219.firebaseapp.com",
  databaseURL: "https://blogbreeze-e6219-default-rtdb.firebaseio.com",
  projectId: "blogbreeze-e6219",
  storageBucket: "blogbreeze-e6219.appspot.com",
  messagingSenderId: "806404218202",
  appId: "1:806404218202:web:f17ae91fea3315852d6763",
};
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const storage = getStorage(app);

function getPostData() {
  const user_ref = ref(db, "post/");
  let count = 0;
  get(user_ref).then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      if (count < 4) {
        const { title, postContent, imageURL } = childSnapshot.val();
        const id = childSnapshot.key;
        //   console.log(id);
        let container = document.getElementById("blog-container");
        let box = document.createElement("div");
        box.classList.add("box-1");
        container.appendChild(box);
        box.innerHTML = `
            <div>
              <div id="mainBox"><img src="${imageURL}" alt="Post Image" /></div>
              <h2>${title.substring(0, 80)}</h2>
              <p id="para">${
                postContent.substring(0) + "..."
              }<span class="more">${postContent.substring(350)}</span></p>
              <button class="read-btn">Read More</button>
            </div>
          `;

        // Hide content beyond the truncated part initially
        let moreContent = box.querySelector(".more");
        if (moreContent) {
          moreContent.style.display = "none";
        }

        // Add event listener to toggle display of additional content
        let readBtn = box.querySelector(".read-btn");
        if (readBtn) {
          readBtn.addEventListener("click", () => {
            window.location = `full_blog_post.html?id=${id}`;
          });
        }
        count++;
      }
    });
  });
}

getPostData();
