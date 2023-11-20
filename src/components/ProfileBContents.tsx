import "./ProfileBContents.css";

export default function ProfileBContents() {
  return (
    <div>
      <div className="profile-bcontents">
        <strong>브랜드 콘텐츠</strong>
      </div>
      <p>
        Pinterest 브랜드 콘텐츠 프로그램은 후원 기회를 위해 크리에이터와
        <br />
        브랜드를 연결하는 서비스입니다.
      </p>
      <div>
        <p>
          <br />
        </p>
      </div>
      <div>
        <p className="bcfont">
          <strong>브랜드 콘텐츠 가입</strong>
        </p>
        <p>
          <button className="bcbutton">
            <strong>가입하기</strong>
          </button>
          Pinterest는 회원님과 브랜드의 연결을 위해 <br />
          최선의 노력을 다할 것이지만 가입으로 브<br />
          랜드 연결이 보장되지는 않습니다.
        </p>
      </div>
    </div>
  );
}
