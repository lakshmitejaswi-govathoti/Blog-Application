import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getDatabase,
  get,
  ref,
  set,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const storage = getStorage(app);

const add_post_btn = document.querySelector("#post-btn");

function Add_Post(event) {
  event.preventDefault();
  const title = document.querySelector("#heading").value;
  const post_Content = document.querySelector("#article").value;
  const id = Date.now();
  const imageInput = document.querySelector("#banner-upload");
  const file = imageInput.files[0];

  const storageReference = storageRef(storage, "images/" + id); // Assuming you are using Firebase Storage
  uploadBytes(storageReference, file).then((snapshot) => {
    // Get the download URL for the image
    getDownloadURL(snapshot.ref).then((downloadURL) => {
      // Save post data along with the image URL to the database
      set(ref(db, "post/" + id), {
        title: title,
        postContent: post_Content,
        imageURL: downloadURL, // Saving the download URL of the image
      }).then(() => {
        // const imgDisplay = document.getElementById("banner");
        // const imgElement = document.createElement("img");
        // imgElement.src = downloadURL;
        // imgDisplay.appendChild(imgElement);
        document.querySelector("#heading").value = "";
        document.querySelector("#article").value = "";
        document.querySelector("#banner-upload").value = "";
        console.log("Post added successfully!");
        alert("posted successfully, now please refer all blogs");
      });
    });
  });
}
add_post_btn.addEventListener("click", Add_Post);
const waitHandle = document.createElement("p");
waitHandle.innerText = "please wait until message";
const btnContainer = document.querySelector("#blog-options");
const btn = document.querySelector("#post-btn");
btn.addEventListener("click", () => {
  console.log("wait");
  btnContainer.append(waitHandle);
});
