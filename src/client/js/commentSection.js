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

  /*
  const userAvatarDiv = document.createElement("div");
  userAvatarDiv.className = "video__comment-avatar";
  const userAvatarImg = document.createElement("img");
  const imgSrc = document.querySelector("imgsrc");
  userAvatarImg.srcset = `${imgSrc.src}`;
  userAvatarImg.crossOrigin = "crossorigin";
  userAvatarDiv.appendChild(userAvatarImg);
  newComment.appendChild(userAvatarDiv);
  */

  const commentTextareaDiv = document.createElement("div");
  commentTextareaDiv.className = "video__comment-textarea";
  const usernameSpan = document.createElement("span");
  usernameSpan.innerText = "걍해";
  const textSpan = document.createElement("span");
  textSpan.innerText = `${text}`;
  commentTextarea.appendChild(usernameSpan, textSpan);

  const deleteButtonDiv = document.createElement("div");
  deleteButtonDiv.className = "video__comment-buttons";
  const deleteButton = document.createElement("button");
  deleteButton.className = "fas fa-trash-alt";
  deleteButtonDiv.appendChild(deleteButton);

  newComment.appendChild(commentTextareaDiv);
  newComment.appendChild(deleteButtonDiv);
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
