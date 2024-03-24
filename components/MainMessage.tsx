const MainMessage = () => {
  return (
    <div>
      <div className="bg-dark-blue-500 p-6">
        <div className="flex items-center gap-3 ">
          <img src="/demo.png" alt="person" width={70} height={70} />
          <div className="text-white flex flex-col">
            <p className="text-xl">Christoper Campbell</p>
            <span className="text-gray-400">Last seen 02:55 pm</span>
          </div>
        </div>
        <div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div></div>
      <div></div>
    </div>
  );
};

export default MainMessage;
