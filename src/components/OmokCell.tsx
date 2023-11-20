import { Omok } from "../api/types";

interface OmokCellProps {
  value: Omok;
  onCellClick: () => void;
}

export default function OmokCell({ value, onCellClick }: OmokCellProps) {
  let letter = "┼";
  if (value === Omok.WHITE) {
    letter = "○";
  } else if (value === Omok.BLACK) {
    letter = "●";
  }
  return <td onClick={onCellClick}>{letter}</td>;
}
