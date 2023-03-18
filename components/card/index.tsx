interface CardProp {
  content?: string;
}
const Card: React.FC<CardProp> = ({ content }) => {
  return <div className="p-20px">{content}</div>;
};

export default Card;
