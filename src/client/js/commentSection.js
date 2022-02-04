import fetch from "cross-fetch";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComment = document.getElementById("videoComment");
const deleteComment = document.getElementById("deleteComment");

const addComment = (text, id) => {
  // constructing html element with JS not pug
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  const deleteButton = document.createElement("button");
  deleteButton.className = "fas fa-trash-alt";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(deleteButton);
  videoComments.prepend(newComment); // append - at the end, prepend - in front
};

const handleSubmit = async (event) => {
  event.preventDefault(); // just submit and prevent refresh or move to link.
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id; //which video browser is looking
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/add-comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // 이거 json 파일이야~ 라고 알려주는 말임
    },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDeleteButton = async () => {
  event.preventDefault();
  const commentId = videoComment.dataset.id;
  const response = await fetch(`/api/videos/${commentId}/delete-comment`, {
    method: "DELETE",
  });
  if (response.status === 201) {
    let willBeRemoved = document.getElementById(commentId);
    videoComment.remove(willBeRemoved);
  }
};

if (form) {
  form.addEventListener("submit", handleSubmit);
  if (videoComment) {
    deleteComment.addEventListener("click", handleDeleteButton);
  }
}
