import Link from "next/link";
import Image from "next/image";
import Button from "@/components/button";
import Arrow from "../public/icons/downArrow.svg";
const Home: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-evenly">
      <div className="flex flex-col items-center">
        <p className="font-semibold text-[48px] leading-[67.2px]">EveryLens</p>
        <p className="mt-[42px] text-[16px] leading-[22px]">
          Post anonymously on lens with PolygonID 🌿
        </p>
      </div>
      <div className="flex flex-row justify-center items-end gap-x-[24px]">
        <div className="felx flex-col items-center">
          <div className="flex flex-row">
            First time user?
            <Image src={Arrow} alt="arrow" className="w-[16px' h-[64px]" />
          </div>
          <Link href="/create">
            <Button className="w-[256px] h-[64px] rounded-[6px] text-[16px] font-normal">
              Create
            </Button>
          </Link>
        </div>
        <Link href="/create">
          <Button className="w-[256px] h-[64px] rounded-[6px] text-[16px] font-normal">
            Post
          </Button>
        </Link>
      </div>
    </main>
  );
};
export default Home;
