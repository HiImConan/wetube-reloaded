import fetch from "cross-fetch";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoComment = document.getElementById("videoComment");
const deleteComment = document.getElementById("deleteComment");

const addComment = (text, id) => {
  // constructing html element with JS not pug
  // 댓글 리스트 엘리먼트 불러오기
  const videoCommentsList = document.querySelector(".video__comments ul");
  // 새로운 코멘트 엘리먼트 생성하기V41010101
  const newComment = document.createElement("li");
  // 새로운 코멘트의 주소는 이 비디오의 주소와 동일
  newComment.dataset.id = id;
  // 기존 코멘트 클래스 네임과 같은 네임 부여
  newComment.className = "video__comment";

  // 유저 아바타 섹션 구현하기
  const userAvatarDiv = document.createElement("div");
  userAvatarDiv.className = "video__comment-avatar";
  const userAvatarImg = document.createElement("img");
  const imgSrc = document.querySelector("#imgsrc");
  userAvatarImg.src = `${imgSrc.src}`;
  userAvatarImg.crossOrigin = "crossorigin";
  userAvatarDiv.appendChild(userAvatarImg);

  const commentTextareaDiv = document.createElement("div");
  commentTextareaDiv.className = "video__comment-textarea";
  const usernameSpan = document.createElement("span");
  usernameSpan.className = ".video__comment-username";
  const usernameId = document.querySelector(".video__comment-username");
  usernameSpan.innerText = usernameId.innerText;
  const textSpan = document.createElement("span");
  textSpan.className = ".video__comment-textbox";
  textSpan.innerText = `${text}`;
  commentTextareaDiv.appendChild(usernameSpan);
  commentTextareaDiv.appendChild(textSpan);

  const deleteButtonDiv = document.createElement("div");
  deleteButtonDiv.className = "video__comment-buttons";
  const deleteButton = document.createElement("button");
  deleteButton.className = "fas fa-trash-alt";
  deleteButtonDiv.appendChild(deleteButton);

  newComment.appendChild(userAvatarDiv);
  newComment.appendChild(commentTextareaDiv);
  newComment.appendChild(deleteButtonDiv);
  videoCommentsList.prepend(newComment); // append - at the end, prepend - in front
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
