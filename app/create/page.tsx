import AuthConnect from "@/modules/authConnect";
const Create: React.FC = () => {
  return (
    <div className="flex flex-col">
      Here're some explainations of how EveryLens works
      <AuthConnect>
        <button>Claim</button>
      </AuthConnect>
    </div>
  );
};
export default Create;
