import cx from "clsx";
import Image from "next/image";
interface PostCardProps {
  name?: string;
  content: string;
  url?: string[];
  className?: string;
}
const PostCard: React.FC<PostCardProps> = ({
  content,
  url,
  className,
  name,
}) => {
  return (
    <div
      className={cx(
        "p-[20px] flex flex-col border-2 border-solid border-black",
        className
      )}
    >
      {name && <div className="mb-[5px] font-medium">{name} : </div>}
      <div>{content}</div>
      {url &&
        url.map((e, i) => (
          <img
            className="w-[256px] h-[180px]"
            src={e}
            alt="post media"
            key={`${i}-media`}
            // width={256}
            // height={180}
          />
        ))}
    </div>
  );
};

export default PostCard;
