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

function getPostIdFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
}

function displayFullPost() {
  const postId = getPostIdFromUrl();
  const postRef = ref(db, `post/${postId}`);
  get(postRef)
    .then((snapshot) => {
      const post = snapshot.val();
      if (post) {
        // Display full content of the blog post
        document.getElementById("img").setAttribute("src", post.imageURL);
        document.getElementById("post-title").innerText = post.title;
        document.getElementById("post-content").innerText = post.postContent;
        btn = document.querySelector(".AllBlogs");
        btn.style.id = "AllBlogs";
      } else {
        // Handle case where post is not found
        console.log("Post not found");
      }
    })
    .catch((error) => {
      console.error("Error fetching post:", error);
    });
}

displayFullPost();
