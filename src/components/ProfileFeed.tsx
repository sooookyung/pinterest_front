import "./ProfileFeed.css";

export default function ProfileFeed() {
  return (
    <div>
      <div className="profile-feed">
        <strong>홈피드 조정</strong>
      </div>
      <p>
        Pinterest를 자신에 맞게 본인. Pinterest가 아이디어를 추천하기 위해
        <br />
        사용하는 세부 정보를 편집해 보세요. 본 세부 정보는 공개적으로 표<br />
        시되지 않습니다.
      </p>
      <button className="button4">
        <strong>팔로잉</strong>
      </button>
      <button className="button5">
        <strong>팔로워</strong>
      </button>
    </div>
  );
}
