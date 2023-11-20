import "./ProfileOwnership.css";

export default function ProfileOwnership() {
  return (
    <div>
      <div className="profile-ownership">
        <strong>소유권이 표시된 계정</strong>
      </div>
      <p>
        계정 소유권을 표시하면 분석을 모니터링할 수 있고 회원님의 사이트
        <br />
        에서 만든 모든 핀에 회원님의 이름 또는 브랜드가 표시됩니다.
      </p>
      <a href="https://help.pinterest.com/ko/business/article/claim-your-website">
        <strong>자세히 알아보기</strong>
      </a>
      <p>
        <i className="fa-solid fa-globe fa-flip"></i>
        <strong>웹사이트</strong>
        <button className="obutton">
          <strong>소유권 표시</strong>
        </button>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@900&family=Poppins:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        />
      </p>
    </div>
  );
}
