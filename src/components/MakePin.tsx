import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Autocomplete, Button, IconButton, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { useEffect, useRef, useState } from "react";
import PinNavBar from "./PinNavBar";
import Profiletext from "./Profiletext";
import { SERVER_URL } from "../api/globals";
import { useNavigate } from "react-router-dom";
import { useUser } from "../api/user";
import Tooltip from "@mui/material/Tooltip";

function MakePin() {
  const options = ["보드선택", "보드<1>", "보드<2>", "확인용보드"];
  const [imgFile, setImgFile] = useState<string>("");
  const imgRef = useRef<HTMLInputElement>(null);
  const [seq, setSeq] = useState<number>(-1);
  useEffect(() => {
    console.log(seq);
  }, [seq]);
  const navigate = useNavigate();

  const saveImgFile = () => {
    let file: File | null = null;
    if (imgRef.current?.files != null && imgRef.current.files.length !== 0) {
      file = imgRef.current.files[0];
    }

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImgFile(reader.result);
        }
      };
    }
  };
  const deleteFileImage = () => {
    URL.revokeObjectURL(imgFile);
    setImgFile("");
  };
  const handleImageClick = () => {
    if (imgRef.current) {
      imgRef.current.click(); // input 클릭 이벤트를 발생시킵니다.
    }
  };

  const [selectedTags, setSelectedTags] = useState(Array<object>());
  const tagsRef = useRef<React.ReactElement>(null);

  interface Pin {
    pinSeq: number;
    pinTitle: string;
    pinDesc: string;
    image?: string;
    writer: string;
  }

  interface UpImage {
    imgSeq: number;
  }

  const [pinTitle, setpinTitle] = useState("");
  const [pinDesc, setpinDesc] = useState("");

  async function handleSubmit() {
    const { imgSeq } = await createImage();
    const imgUrl = `/upImages/${imgSeq}`;
    await uploadImage(imgSeq);
    const { pinSeq } = await createPin(imgUrl);
    await createTag(pinSeq);
    alert("핀이 생성되었습니다.");
    navigate("/feed");
  }

  const createImage = async () => {
    const response = await fetch(`${SERVER_URL}/upImages`, {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json() as Promise<UpImage>;
  };

  const uploadImage = async (id: number) => {
    if (!imgRef.current?.files) {
      throw new Error("No file selected");
    }
    const response = await fetch(`${SERVER_URL}/upImages/${id}/content`, {
      method: "PUT",
      body: imgRef.current.files[0],
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
    return response;
  };

  const createPin = async (imageUrl: string) => {
    const data = await fetch(`${SERVER_URL}/pins`, {
      method: "POST",
      body: JSON.stringify({
        pinTitle: pinTitle,
        pinDesc: pinDesc,
        image: imageUrl,
        writer: `${SERVER_URL}/members/${userId}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data.json() as Promise<Pin>;
  };

  //로그인 중인 userId 값 가지고 옴
  const [user] = useUser();
  const userId = user?.id;

  const createTag = async (seq: number) => {
    const tagIds = selectedTags.map((tag) => tag.reason);
    console.log("tagIds: ", tagIds);
    console.log("tag의 seq: ", seq);
    for (const tag of tagIds) {
      await fetch(`${SERVER_URL}/tags`, {
        method: "POST",
        body: JSON.stringify({
          tagId: {
            tagName: tag,
            pin: `${SERVER_URL}/pins/${seq}`,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //return data;
      // 여기에서 data를 사용하거나 필요한 작업 수행
    }
  };
  return (
    <Container>
      <PinNavBar />
      <Box>
        <div style={styles.mainscreen}>
          <div>
            <div style={styles.startmainscreen}>
              <div style={styles.fileupscreen}>
                <div style={styles.searchbar}>
                  <div style={styles.searchbutton}></div>
                  <div style={styles.searchbutton2}>
                    {!imgFile || !pinTitle ? (
                      <Tooltip title="이미지 파일과 제목을 입력하세요">
                        <span>
                          <Button
                            variant="contained"
                            color="error"
                            sx={{ ml: 27, mr: 1 }}
                            disabled={!imgFile || !pinTitle}
                          >
                            저장
                          </Button>
                        </span>
                      </Tooltip>
                    ) : (
                      <Button
                        variant="contained"
                        color="error"
                        sx={{ ml: 27, mr: 1 }}
                        onClick={() => {
                          if (imgFile && pinTitle) {
                            handleSubmit().catch((e) => {
                              console.error(e);
                            });
                          }
                        }}
                      >
                        저장
                      </Button>
                    )}
                  </div>
                </div>
                <div style={styles.fileandtext}>
                  <div style={styles.fileandtext2}>
                    <div style={styles.fileupload}>
                      <div style={styles.fileupload2}>
                        {imgFile && (
                          <>
                            <div style={styles.fileupload3img}>
                              <img
                                src={imgFile}
                                alt="업로드 할 이미지"
                                style={styles.imgStyle}
                              />
                            </div>
                            <div
                              style={{
                                position: "relative",
                                right: 30,
                                bottom: 580,
                                width: 50.97,
                                height: 50.97,
                                borderRadius: "50%",
                                backgroundColor: "lightgray",
                                zIndex: 1,
                              }}
                            >
                              <IconButton onClick={deleteFileImage}>
                                <DeleteForeverIcon fontSize={"large"} />
                              </IconButton>
                            </div>
                          </>
                        )}

                        <Box
                          component="div"
                          sx={{
                            display: imgFile ? "none !important" : "inherit",
                          }}
                          style={styles.fileupload3}
                        >
                          <div style={styles.inputpadding}>
                            <div style={styles.inputinline}>
                              <div style={styles.inputtext}>
                                <div style={styles.inputtext2}>
                                  <div
                                    style={{
                                      ...styles.visibleWrapper,
                                      pointerEvents: imgFile ? "none" : "auto",
                                    }}
                                    onClick={
                                      !imgFile ? handleImageClick : undefined
                                    }
                                  >
                                    {!imgFile && (
                                      <div style={styles.overlayText}>
                                        드래그하거나 클릭하여 업로드
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <input
                                aria-label="파일 업로드"
                                id="media-upload-input-5d6df17c-e614-4193-9f8c-6ca3ea8c0a82"
                                data-test-id="media-upload-input-5d6df17c-e614-4193-9f8c-6ca3ea8c0a82"
                                type="file"
                                accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp"
                                aria-hidden="true"
                                tabIndex={-1}
                                style={styles.fileupstyle}
                                ref={imgRef}
                                onChange={saveImgFile}
                              />
                            </div>
                          </div>
                        </Box>
                      </div>
                    </div>
                    <div style={styles.textbox}>
                      <div style={styles.textbox2}>
                        <div style={styles.titletext}>
                          <div style={styles.titletext2}>
                            <div style={styles.titletext2}>
                              <div style={styles.titletexttitle}>
                                <TextField
                                  id="standard-textarea"
                                  label="제목 입력"
                                  placeholder="모두의 이목을 끌 제목을 입력해보세요!"
                                  multiline
                                  value={pinTitle}
                                  onChange={(e) => setpinTitle(e.target.value)}
                                  variant="standard"
                                  fullWidth
                                  InputLabelProps={{ style: { fontSize: 20 } }}
                                  InputProps={{
                                    sx: {
                                      "& ::placeholder": {
                                        fontSize: 40,
                                      },
                                      fontSize: 30,
                                    },
                                  }}
                                />
                              </div>
                              <div></div>
                            </div>
                          </div>
                        </div>
                        <div style={styles.profileline}>
                          <Profiletext />
                        </div>
                        <div style={styles.explaintext}>
                          <TextField
                            id="standard-textarea"
                            placeholder="사람들에게 이 핀에 대해서 설명해 보세요!"
                            // multiline
                            variant="standard"
                            value={pinDesc}
                            onChange={(e) => setpinDesc(e.target.value)}
                            fullWidth
                            InputLabelProps={{ style: { fontSize: 20 } }}
                            InputProps={{
                              sx: {
                                "& ::placeholder": {
                                  fontSize: 20,
                                },
                                fontSize: 20,
                              },
                            }}
                          />
                        </div>
                        <div style={styles.tagdiv}>
                          {imgFile && (
                            <Autocomplete
                              multiple
                              id="tags-standard"
                              options={imIdiot}
                              getOptionLabel={(option) => option.reason}
                              getOptionDisabled={() => selectedTags.length > 4}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  variant="standard"
                                  label="태그"
                                  placeholder="태그를 적어보세요!"
                                />
                              )}
                              ref={tagsRef}
                              onChange={(_, value) => setSelectedTags(value)}
                              value={selectedTags}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Container>
  );
}
const imIdiot = [
  { reason: "오오티디", why: 123 },
  { reason: "OOTD", why: 123 },
  { reason: "일상코디", why: 123 },
  { reason: "일상패션", why: 123 },
  { reason: "데일리룩", why: 123 },
  { reason: "데일리코디", why: 123 },
  { reason: "오오티디룩", why: 123 },
  { reason: "패션핀", why: 123 },
  { reason: "신상룩", why: 123 },
  { reason: "전신샷", why: 123 },
  { reason: "미러샷", why: 123 },
  { reason: "패션", why: 123 },
  { reason: "오늘의코디", why: 123 },
  { reason: "패피", why: 123 },
  { reason: "패피남", why: 123 },
  { reason: "패피녀", why: 123 },
  { reason: "사진", why: 123 },
  { reason: "뷰티", why: 123 },
  { reason: "쇼핑", why: 123 },
  { reason: "운동선수", why: 123 },
  { reason: "축구", why: 123 },
  { reason: "야구", why: 123 },
  { reason: "코덕", why: 123 },
  { reason: "화장품", why: 123 },
  { reason: "화장품덕후", why: 123 },
  { reason: "코스메틱", why: 123 },
  { reason: "오늘의화장품", why: 123 },
  { reason: "뷰티팁", why: 123 },
  { reason: "뷰티꿀팁", why: 123 },
  { reason: "인생템", why: 123 },
  { reason: "발색", why: 123 },
  { reason: "발색짱", why: 123 },
  { reason: "뷰티템", why: 123 },
  { reason: "인생", why: 123 },
  { reason: "화장품추천", why: 123 },
  { reason: "코덕핀", why: 123 },
  { reason: "존예보스", why: 123 },
  { reason: "영롱보스", why: 123 },
  { reason: "블링블링", why: 123 },
  { reason: "흔녀", why: 123 },
  { reason: "흔남", why: 123 },
  { reason: "세졜예", why: 123 },
  { reason: "세젤귀", why: 123 },
  { reason: "selfcamera", why: 123 },
  { reason: "selfcam", why: 123 },
  { reason: "셀카", why: 123 },
  { reason: "일상", why: 123 },
  { reason: "라이프", why: 123 },
  { reason: "오늘", why: 123 },
  { reason: "데일리", why: 123 },
  { reason: "일상기록", why: 123 },
  { reason: "하루일과", why: 123 },
  { reason: "그냥", why: 123 },
  { reason: "소소", why: 123 },
  { reason: "사무실", why: 123 },
  { reason: "출근", why: 123 },
  { reason: "여행", why: 123 },
  { reason: "떠나고싶다", why: 123 },
  { reason: "여행에미치다", why: 123 },
  { reason: "일상을여행처럼", why: 123 },
  { reason: "여행후기", why: 123 },
  { reason: "여행사진", why: 123 },
  { reason: "여행지추천", why: 123 },
  { reason: "국내여행", why: 123 },
  { reason: "해외여행", why: 123 },
  { reason: "추억", why: 123 },
  { reason: "비행", why: 123 },
  { reason: "휴가", why: 123 },
  { reason: "봄", why: 123 },
  { reason: "여름", why: 123 },
  { reason: "가을", why: 123 },
  { reason: "겨울", why: 123 },
  { reason: "행복", why: 123 },
  { reason: "남자혼자", why: 123 },
  { reason: "웨딩", why: 123 },
  { reason: "자동차", why: 123 },
  { reason: "원숭이", why: 123 },
  { reason: "짱구", why: 123 },
  { reason: "음식", why: 123 },
  { reason: "한식", why: 123 },
  { reason: "양식", why: 123 },
  { reason: "중식", why: 123 },
  { reason: "일식", why: 123 },
  { reason: "맛집", why: 123 },
  { reason: "카페", why: 123 },
  { reason: "디저트", why: 123 },
  { reason: "아이스크림", why: 123 },
  { reason: "가수", why: 123 },
  { reason: "배우", why: 123 },
  { reason: "영화", why: 123 },
  { reason: "애니메이션", why: 123 },
  { reason: "드라마", why: 123 },
  { reason: "웹툰", why: 123 },
  { reason: "디즈니", why: 123 },
  { reason: "지브리", why: 123 },
  { reason: "마블영화", why: 123 },
  { reason: "액션영화", why: 123 },
  { reason: "고양이", why: 123 },
  { reason: "강아지", why: 123 },
  { reason: "동물", why: 123 },
  { reason: "짤", why: 123 },
  { reason: "물고기", why: 123 },
  { reason: "펭귄", why: 123 },
  { reason: "우주", why: 123 },
  { reason: "카메라", why: 123 },
  { reason: "돌고래", why: 123 },
  { reason: "친구", why: 123 },
  { reason: "과일", why: 123 },
  { reason: "고기", why: 123 },
  { reason: "간식", why: 123 },
  { reason: "빵", why: 123 },
  { reason: "인테리어", why: 123 },
  { reason: "헤어스타일", why: 123 },
  { reason: "헤어", why: 123 },
  { reason: "커트", why: 123 },
  { reason: "염색", why: 123 },
  { reason: "펌", why: 123 },
  { reason: "드라이", why: 123 },
  { reason: "여자헤어", why: 123 },
  { reason: "남자헤어", why: 123 },
  { reason: "헤어스타일추천", why: 123 },
  { reason: "야경", why: 123 },
  { reason: "일본", why: 123 },
  { reason: "서울", why: 123 },
  { reason: "제주도", why: 123 },
  { reason: "한국", why: 123 },
  { reason: "바다", why: 123 },
  { reason: "산", why: 123 },
  { reason: "숲", why: 123 },
  { reason: "자연", why: 123 },
];

// 일상을여행처럼 여행후기 여행사진 여행앓이 추억 비행 휴가 행복 야경 봄 여름 가을 겨울 2박3일 1박2일 남자혼자 여자혼자 여행사 국내여행 해외여행 게스트하우스 설렘 패키지여행 리조트 펜션 가볼만한곳 강원도 호캉스 동남아 유럽 여친 남친 사랑꾼 데이트 연애중 커플샷 기념일 사랑해 연애 남친몬 여친몬 핑크빛 내사랑
// 공부
// 공핀 노트필기 스터디플래너 공부 자극 목표
// 자기개발 열공 시험공부 공부계획 시간관리 스터디메이트 고3 공부인증 공시생일기 책상
// 맛집
// 먹방 먹핀 맛있다 푸드핀 또먹고싶다 맛집 먹방투어 맛집투어 카페투어 카페핀 디저트핀 오늘뭐먹지 존맛탱 맛집탐방 핵존맛 먹깃리스트 혼술 혼밥
// 헬스
// 건강핀 건강 다이어트 헬스핀 운동중 몸짱
// 몸매 피트니스 오운완 바디핀 웨이트 훈녀 훈남 훈훈핀 바디프로필 바디체크 다이어터 눈바디 헬린이 벌크업 힙업 헬스장
const styles: Record<string, React.CSSProperties> = {
  Body: {
    margin: 0,
  },
  mainscreen: {
    paddingTop: 55.972,
    boxSizing: "border-box",
    display: "block",
  },
  startmainscreen: {
    top: 55.972,
    boxSizing: "border-box",
    display: "flex",
    backgroundColor: "#fff8fa",
    position: "fixed",
    flexDirection: "column",
    left: "0",
    bottom: "0",
    right: "0",
    padding: 100,
    alignItems: "center",
  },
  fileupscreen: {
    textAlign: "center",
    boxSizing: "border-box",
    position: "relative",
    flexDirection: "column",
    display: "flex",
    height: 700,
    backgroundColor: "white",
    borderRadius: 16,
    width: 900,
    justifyContent: "center",
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
  },
  searchbar: {
    marginBottom: 15,
    boxSizing: "border-box",
    display: "flex",
  },
  searchbutton: {
    minWidth: 320,
    minHeight: 40,
    alignItems: "center",
    margin: 0,
    display: "flex",
  },
  searchbutton2: {
    minWidth: 250,
    minHeight: 40,
    alignItems: "center",
    margin: 0,
    display: "flex",
    paddingLeft: 210,
  },
  scrollbutton: {
    alignItems: "center",
    backgroundColor: "rgb(239, 239, 239)",
    border: "none",
    cursor: "pointer",
    display: "flex",
    flexGrow: 1,
    height: 40,
    justifyContent: "spaceBetween",
    minWidth: 0,
    width: 190,
    outline: 0,
    padding: "0px 0px 0px 14px",
    position: "relative",
    borderRadius: "8px 0px 0px 8px",
    pointerEvents: "auto",
  },
  scrollbutton2: {
    backgroundColor: "rgb(230, 0, 35)",
    border: "none",
    cursor: "pointer",
    flex: "0 0 auto",
    height: "40px",
    width: 60,
    outline: "0px",
    padding: "0px 14px",
    borderRadius: "0px 8px 8px 0px",
    pointerEvents: "auto",
  },
  fileandtext: {
    boxSizing: "border-box",
    display: "block",
  },
  fileandtext2: {
    paddingBottom: 40,
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
  },
  fileupload: {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    width: 300,
    height: 570,
  },
  fileupload2: {
    boxSizing: "border-box",
    display: "block",
    width: 300,
    height: "100%",
    flex: "1 1 auto",
  },
  fileupload3: {
    backgroundColor: "rgb(239, 239, 239)",
    boxShadow: "none",
    height: "100%",
    borderRadius: 8,
    boxSizing: "border-box",
    display: "block",
    position: "relative",
  },
  fileupload3img: {
    boxShadow: "none",
    height: "100%",
    borderRadius: 8,
    boxSizing: "border-box",
    display: "block",
    position: "relative",
  },
  fileupstyle: {
    cursor: "pointer",
    height: "100%",
    opacity: 0,
    position: "absolute",
    width: "100%",
    left: 0,
    top: 0,
    fontSize: 0,
  },
  inputpadding: {
    height: "100%",
    borderRadius: "12px",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
    paddingLeft: 12,
    paddingRight: 12,
    paddingBottom: 12,
    paddingTop: 12,
    width: "100%",
    display: "block",
  },
  inputinline: {
    border: "2px dashed rgb(218, 218, 218)",
    borderRadius: 6,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "border-box",
    marginBottom: 4,
    marginTop: 4,
    flexDirection: "column",
    display: "flex",
  },
  inputtext: {
    width: 270,
    boxSizing: "border-box",
    paddingLeft: 48,
    paddingRight: 48,
    marginTop: 16,
    display: "block",
  },
  inputtext2: {
    wordBreak: "break-all",
    textAlign: "center",
    fontWeight: 600,
    fontSize: 14,
    color: "#111",
    display: "block",
  },
  textbox: {
    minHeight: 510,
    width: "100%",
    flex: "1 1 auto",
    boxSizing: "border-box",
    paddingLeft: 40,
    display: "block",
  },
  textbox2: {
    height: 570,
    width: 480,
    boxSizing: "border-box",
    position: "absolute",
    display: "block",
  },
  titletext: {
    boxSizing: "border-box",
    marginTop: 32,
    width: "100%",
    display: "block",
  },
  titletext2: {
    boxSizing: "border-box",
    marginTop: 32,
    width: "100%",
    display: "block",
  },
  titletext3: {
    boxSizing: "border-box",
    width: "100%",
    flexDirection: "column",
    display: "flex",
  },
  titletexttitle: {
    boxSizing: "border-box",
    position: "relative",
    width: "100%",
    display: "block",
    backgroundColor: "white",
  },
  titletextarea: {
    backgroundColor: "white",
    width: 480,
    color: "black",
  },
  profileline: {
    boxSizing: "border-box",
    marginTop: 16,
    width: "100%",
    display: "block",
  },
  explaintext: {
    flex: "1 1 auto",
    minHeight: 0,
    minWidth: 0,
    boxSizing: "border-box",
    marginTop: 24,
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  inputWrapper: {
    position: "relative",
    display: "inline-block",
  },
  inputStyle: {
    opacity: 0,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  imgStyle: {
    width: "100%", // 혹은 필요한 크기로 조절
    height: "auto", // 비율 유지
    maxHeight: 570,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
    borderRadius: 16,
  },
  overlayText: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 2,
  },
  tagdiv: {
    paddingTop: 30,
    paddingBottom: 10,
  },
};

export default MakePin;
