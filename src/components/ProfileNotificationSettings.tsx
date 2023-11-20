import "./ProfileNotificationSettings.css";

export default function ProfileNotificationSettings() {
  return (
    <div>
      <div className="profile-notificationsettings">
        <strong>알림</strong>
      </div>
      <p>
        중요한 변경사항이 있으면 항상 알려드립니다. 이외에도 어떤 항목에 <br />
        대해 소식을 받고 싶은지 선택하세요.
        <a href="https://help.pinterest.com/ko/article/edit-notification-settings">
          <strong>자세히 알아보기</strong>
        </a>
      </p>
      <div>
        <p className="pfont">
          <strong>Pinterest에서</strong>
        </p>
        <p>앱 또는 사이트에 표시할 알림을 선택하세요.</p>
        <a href="https://help.pinterest.com/ko/article/edit-notification-settings">
          <strong>자세히 알아보기</strong>
        </a>
        <button className="nbutton">
          <strong>수정</strong>
        </button>
      </div>
      <div>
        <p>
          <br />
        </p>
      </div>
      <div>
        <p className="pfont">
          <strong>이메일로</strong>
        </p>
        <p>이메일로 받을 알림을 선택하세요.</p>
        <a href="https://help.pinterest.com/ko/article/edit-notification-settings">
          <strong>자세히 알아보기</strong>
        </a>
        <button className="nbutton">
          <strong>수정</strong>
        </button>
      </div>
      <div>
        <p>
          <br />
        </p>
      </div>
      <div>
        <p className="pfont">
          <strong>푸시 알림으로</strong>
        </p>
        <p>휴대폰 또는 컴퓨터에서 받을 알림을 선택하세요.</p>
        <a href="https://help.pinterest.com/ko/article/edit-notification-settings">
          <strong>자세히 알아보기</strong>
        </a>
        <button className="nbutton">
          <strong>수정</strong>
        </button>
      </div>
    </div>
  );
}
