import { useState } from "react";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import { LinkContainer } from "react-router-bootstrap";
import OmokCell from "./OmokCell";
import { Omok } from "../api/types";
import styles from "./OmokBoard.module.css";

export default function OmokBoard() {
  const [board, setBoard] = useState(
    new Array<Omok[] | undefined>(19)
      .fill(undefined)
      .map(() => new Array<Omok>(19).fill(Omok.EMPTY)),
  );
  const [history, setHistory] = useState(Array<[number, number]>());
  const [isWhiteTurn, setIsWhiteTurn] = useState(false);

  function addOmok(rowNum: number, colNum: number): void {
    if (board[rowNum][colNum] !== Omok.EMPTY) {
      return;
    }
    const omok = isWhiteTurn ? Omok.WHITE : Omok.BLACK;
    setBoard(board.with(rowNum, board[rowNum].with(colNum, omok)));
    setIsWhiteTurn(!isWhiteTurn);
    setHistory(history.concat([[rowNum, colNum]]));
  }

  function undo() {
    if (history.length === 0) {
      return;
    }
    const coord = history.at(-1);
    if (coord === undefined) {
      return;
    }
    const [rowNum, colNum] = coord;
    setHistory(history.slice(0, history.length - 1));
    setBoard(board.with(rowNum, board[rowNum].with(colNum, Omok.EMPTY)));
    setIsWhiteTurn(!isWhiteTurn);
  }

  return (
    <Container fluid="md" className={styles.container}>
      <Row>
        <table className={styles.board}>
          <tbody>
            {board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((value, colIndex) => (
                  <OmokCell
                    key={colIndex}
                    value={value}
                    onCellClick={() => {
                      addOmok(rowIndex, colIndex);
                    }}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Row>
      <Row>
        <Col className={"d-flex justify-content-center"}>
          <Button disabled={history.length === 0} onClick={undo}>
            무르기
          </Button>
        </Col>
        <Col className="d-flex justify-content-center">
          <LinkContainer to="/">
            <Button variant="danger">홈으로</Button>
          </LinkContainer>
        </Col>
      </Row>
    </Container>
  );
}
