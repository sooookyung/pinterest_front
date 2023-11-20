import "./ProfileData.css";

export default function ProfileData() {
  return (
    <div>
      <div className="profile-data">
        <strong>개인정보 및 데이터</strong>
      </div>
      <p>
        Pinterest가 광고주와 공유하고 표시되는 광고 및 추천을 개선하는 데<br />
        사용하는 데이터를 관라하세요.
        <a href="https://help.pinterest.com/ko/article/update-your-search-privacy">
          <strong>자세히 알아보기</strong>
        </a>
      </p>
      <div>
        <p className="dfont">
          <strong>광고 맞춤 설정</strong>
        </p>
        <p>
          <input type="checkbox" name="indicator" />
          방문한 사이트의 정보를 사용하세요. Pinterest에서 회원님이 방<br />
          문한 사이트의 데이터를 사용하여 Pinterest 광고를 개선할 수 있<br />
          도록 허용합니다.
          <a href="https://help.pinterest.com/ko/article/personalization-and-data">
            <strong>자세히 알아보기</strong>
          </a>
        </p>
        <p>
          <input type="checkbox" name="indicator" />
          파트너 정보를 활용해 보세요. Pinterest가 파트너의 정보를 사용
          <br />
          하여 Pinterest에 표시되는 광고를 개선할 수 있도록 허용합니다.
          <br />
          <a href="https://help.pinterest.com/ko/article/personalization-and-data">
            <strong>자세히 알아보기</strong>
          </a>
        </p>
        <p>
          <input type="checkbox" name="indicator" />
          Pinterest 관련 광고입니다. Pinterest가 회원님의 활동을 사용하
          <br />여 다른 사이트나 앱에 표시되는 Pinterest 광고를 개선할 수 있도
          <br />록 허용합니다.
          <a href="https://help.pinterest.com/ko/article/third-party-analytics-or-advertising-providers-pinterest-uses-or-allows">
            <strong>자세히 알아보기</strong>
          </a>
        </p>
        <p>
          <input type="checkbox" name="indicator" />
          광고 보고를 위한 활동입니다. Pinterest가 광고 성과 보고를 위해
          <br />
          회원님의 활동을 공유할 수 있도록 허용합니다.
          <a href="https://help.pinterest.com/ko/article/ads-performance-reporting">
            <strong>자세히 알아보기</strong>
          </a>
        </p>
      </div>
      <div>
        <p>
          <br />
        </p>
      </div>
      <div>
        <p className="dfont">
          <strong>데이터 및 계정 삭제</strong>
        </p>
        <p>
          데이터 및 계정 삭제
          <button className="dbutton">
            <strong>데이터 삭제</strong>
          </button>
        </p>
      </div>
      <div>
        <p>
          <br />
        </p>
      </div>
      <div>
        <p className="dfont">
          <strong>데이터 요청하기</strong>
        </p>
        <p>
          Pinterest에서 회원님에 대해 수집한 정보의 <br />
          사본을 요청할 수 있습니다. Pinterest의 제3자 <br />
          제공업체인 SendSafely로부터 이메일을 받은 <br />후 요청을 완료하게
          됩니다.
          <a href="https://help.pinterest.com/ko/article/download-your-pinterest-data">
            <strong>자세히 알아보기</strong>
          </a>
          <button className="dbutton">
            <strong>요청하기</strong>
          </button>
        </p>
      </div>
    </div>
  );
}
