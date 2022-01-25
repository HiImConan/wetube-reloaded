import express from "express";
import { watch, getEdit, postEdit, getUpload, postUpload, deleteVideo } from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(deleteVideo);
videoRouter.route("/upload").get(getUpload).post(postUpload);


export default videoRouter;

/*
87(1.5) + 264(5) + 184(3) + 76(1.5) + 45(1) + 119(2.5) + 31(0.5) + 53(1) + 72(1.5) + 20(0.5) + 105(2) + 102(2)
22시간
목 ~#7까지
운동 2시간 밥 4시간 = 6시간
금 ~#10까지
밥 4시간 = 6~8시간
토 ~#15까지
운동 2시간 밥 4시간 = 6시간
일 ~#17까지
밥 2시간 저녁약속 - 3~4시간
*/