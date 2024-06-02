import "./Tag.css";

interface TagProps {
  number: number;
  handleSelectNumber: (number: number) => void;
  handleClick: (open: boolean) => void;
}

export default function Tag(props: TagProps) {
  return (
    <div
      className="tag"
      onClick={() => {
        props.handleSelectNumber(props.number);
        props.handleClick(true);
      }}
    >
      <p className="tag-txt">{props.number}</p>
    </div>
  );
}
