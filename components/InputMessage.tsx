import Image from "next/image";

const InputMessage = () => {
  return (
    <div
      className="bg-dark-blue-500 gap-2 p-2 flex items-center "
      // absolute bottom-0 w-full"
    >
      <Image
        className="cursor-pointer hover:bg-slate-600 p-1 rounded-xl "
        src="/attachment.png"
        alt="attachment"
        height={45}
        width={45}
      />
      <input
        className="text-white outline-none w-full bg-dark-blue-500"
        type="text"
        placeholder="Type your Message..."
      />
      <div className="cursor-pointer flex gap-2 items-center">
        <Image
          className="hover:bg-slate-600 p-1 rounded-xl "
          src="/voice.png"
          alt="voice"
          height={45}
          width={45}
        />
        <Image
          className="cursor-pointer hover:bg-slate-600 p-1 rounded-xl "
          src="/send.png"
          alt="send"
          height={45}
          width={45}
        />
      </div>
    </div>
  );
};

export default InputMessage;
