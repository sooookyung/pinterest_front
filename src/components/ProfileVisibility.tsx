import "./ProfileVisibility.css";

export default function ProfileVisibility() {
  return (
    <div className="profile-visibility">
      <div>
        <strong>프로필 가시성</strong>
      </div>
      <p>Pinterest 안팎에서 프로필을 조회하는 방법을 관리합니다.</p>
      <p>
        <strong>비공개 프로필</strong>
      </p>
      <p>
        프로필이 비공개인 경우 승인된 사용자만 프로필, 핀, 보드, <br />
        팔로워 및 팔로우 목록을 볼 수 있습니다.
        <div id="check-container">
          <input id="check" type="checkbox"></input>
        </div>
        <a href="https://help.pinterest.com/ko/article/make-your-profile-private">
          <strong>자세히 알아보기</strong>
        </a>
      </p>
      <p>
        <strong>개인정보 보호 검색</strong>
      </p>
      <p>검색 엔진에서 프로필 및 보드를 숨깁니다(예: Google).</p>
      <div id="check-container">
        <input id="check" type="checkbox"></input>
      </div>
      <a href="https://help.pinterest.com/ko/article/update-your-search-privacy">
        <strong>자세히 알아보기</strong>
      </a>
    </div>
  );
}
