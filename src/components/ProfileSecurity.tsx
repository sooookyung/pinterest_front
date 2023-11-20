import "./ProfileSecurity.css";

export default function ProfileSecurity() {
  return (
    <div className="profile-security">
      <div>
        <strong>보안</strong>
      </div>

      <p>
        이중 인증 켜기, 연결된 기기 목록 확인하기 등의 추가 보안 기능을 <br />
        포함하여 계정, 핀, 보드를 안전하게 보호하세요
      </p>

      <a href="https://help.pinterest.com/ko/article/protect-your-account">
        <strong>자세히 알아보기</strong>
      </a>

      <p className="font1">
        <strong>이중인증</strong>
      </p>
      <p>
        이렇게 하면 계정 보안이 더욱 강화됩니다. 로그인할 때마다 비밀번호와
        <br /> 함께 휴대폰 문자로 전송된 비밀 코드를 입력해야 합니다.
      </p>
      <a href="https://help.pinterest.com/ko/article/two-factor-authentication">
        <strong>자세히 알아보기</strong>
      </a>
      <p>
        <input type="checkbox" name="indicator" />
        로그인 시 코드 필요
      </p>
      <p>
        <strong className="font1">로그인 옵션</strong>
      </p>
      <p>소셜 계정을 사용하여 Pinterest에 로그인하세요.</p>
      <a href="https://help.pinterest.com/ko/article/link-your-social-media?source=settings_page">
        <strong>자세히 알아보기</strong>
      </a>
      <p>
        <input type="checkbox" name="indicator" />
        로그인에 Facebook 계정 사용
      </p>
      <p>
        <input type="checkbox" name="indicator" />
        사용자의 Google 계정을 로그인에 사용
      </p>
      <p className="font1">
        <strong>앱 로그인</strong>
      </p>
      <p>
        회원님의 Pinterest 프로필로 로그인한 모든 곳을 추적하고 Pinterest를{" "}
        <br />더 이상 사용하지 않는 앱에서 액세스를 삭제하세요.
      </p>
      <a href="https://help.pinterest.com/ko/article/link-your-social-media?source=settings_page">
        <strong>자세히 알아보기</strong>
      </a>
      <p>승인된 앱이 없습니다.</p>
    </div>
  );
}
