// Function to create a new post
function createPost() {
  // Get values from input fields
  var title = document.getElementById("title").value;
  var content = document.getElementById("content").value;
  var imageUrl = document.getElementById("imageUrl").value;

  // Get file input
  var fileInput = document.getElementById("fileInput");
  var file = fileInput.files[0];
  var fileUrl = "";

  // If file is selected, create URL for it
  if (file) {
    fileUrl = URL.createObjectURL(file);

    // Show image preview
    var imagePreview = document.getElementById("imagePreview");
    imagePreview.src = fileUrl;
    imagePreview.style.display = "block"; // Show the image preview
  }

  // Create a post object
  var post = {
    title: title,
    content: content,
    imageUrl: imageUrl || fileUrl, // Use imageUrl if provided, otherwise use fileUrl
  };

  // Validate input
  if (!title.trim() || !content.trim()) {
    alert("Please fill in all fields.");
    return;
  }

  // Save the post
  savePost(post);
}

// Function to check if a string is a valid URL
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// Function to save the post to localStorage
function savePost(post) {
  // Get existing posts from localStorage or initialize an empty array
  var posts = JSON.parse(localStorage.getItem("posts")) || [];

  // Add the new post to the array
  posts.push(post);

  // Save the updated posts array back to localStorage
  localStorage.setItem("posts", JSON.stringify(posts));

  // Clear input fields
  document.getElementById("title").value = "";
  document.getElementById("content").value = "";
  document.getElementById("imageUrl").value = "";

  // Refresh the posts display
  displayPosts();
}

// Function to display posts
function displayPosts() {
  var posts = JSON.parse(localStorage.getItem("posts")) || [];
  var postsContainer = document.getElementById("posts");
  postsContainer.innerHTML = "";

  posts.forEach(function (post, index) {
    var postDiv = document.createElement("div");
    postDiv.classList.add("post");
    postDiv.innerHTML = "<h2>" + post.title + "</h2>";
    if (post.imageUrl && isValidUrl(post.imageUrl)) {
      postDiv.innerHTML +=
        '<img src="' + post.imageUrl + '" alt="Post Image"><br>';
    } else if (post.imageUrl) {
      postDiv.innerHTML +=
        '<p>Image URL: <a href="' +
        post.imageUrl +
        '" target="_blank">' +
        post.imageUrl +
        "</a></p>";
    }
    postDiv.innerHTML += "<p>" + post.content + "</p>";

    // Append delete button
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function () {
      deletePost(index);
    };
    postDiv.appendChild(deleteButton);

    postsContainer.appendChild(postDiv);
  });
}

// Function to delete a post
function deletePost(index) {
  var posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.splice(index, 1); // Remove the post at the specified index
  localStorage.setItem("posts", JSON.stringify(posts));
  displayPosts(); // Refresh the posts display
}

// Initial display of posts when the page loads
displayPosts();
