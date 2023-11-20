import "./ProfileAuthority.css";

export default function ProfileAuthority() {
  return (
    <div>
      <div className="profile-authority">
        <strong>소셜권한</strong>
      </div>
      <p>
        다른 사람들이 Pinterest에서 회원님과 어떻게 상호작용할지뿐만 아니라
        <br />
        Pinterest의 최신 기능에 따른 기타 권한을 선택하세요.
      </p>
      <p className="font2">
        <strong>언급</strong>
      </p>
      <p>@언급 허용 범위를 선택하세요.</p>
      <p>
        <input
          type="radio"
          id="myRadio"
          name="choice"
          value="regular"
          checked
        />
        <label>Pinterest 사용자 모두</label>
      </p>
      <p>
        <input type="radio" id="myRadio" name="choice" value="deep" checked />
        <label>팔로우하는 사람만</label>
      </p>
      <p>
        <input type="radio" id="myRadio" name="choice" value="deep" checked />
        <label>해제</label>
        <p className="font3">아무도 회원님을 @언급할 수 없습니다.</p>
      </p>
      <p className="font2">
        <strong>메시지</strong>
      </p>
      <p>
        메시지를 받은 편지함이나 요청으로 이동할지 또는 메시지를 전혀
        <br /> 받지 않을지 결정합니다.
      </p>
      <p>
        <input type="radio" id="myRadio" name="choice" value="deep" checked />
        <label>친구</label>
      </p>
      <p>
        <input type="radio" id="myRadio" name="choice" value="deep" checked />
        <label>팔로워</label>
      </p>
      <p>
        <input type="radio" id="myRadio" name="choice" value="deep" checked />
        <label>팔로잉</label>
      </p>
      <p>
        <input type="radio" id="myRadio" name="choice" value="deep" checked />
        <label>다른 사람 모두</label>
      </p>
      <p className="font2">
        <strong>댓글</strong>
      </p>
      <p>
        <strong>핀에 댓글 달기 허용</strong>
        <div id="check-container">
          <input id="check" type="checkbox" />
        </div>
        <p>
          새 핀과 기존 핀에 대해서는 기본적으로 댓글 사용이 <br />
          켜져 있습니다.
        </p>
      </p>
      <p>
        <strong>내 핀 댓글 필터링</strong>
        <div id="check-container">
          <input id="check" type="checkbox" />
        </div>
        <p>특정 단어나 구문을 포함하여 생성한 핀에서 댓글 숨기기</p>
      </p>
      <p>
        <strong>다른 사용자 핀 댓글 필터링</strong>
        <div id="check-container">
          <input id="check" type="checkbox" />
        </div>
        <p>
          다른 사람의 핀에서 특정 단어나 구문을 포함하는 댓글을 <br /> 숨깁니다
        </p>
      </p>
    </div>
  );
}
