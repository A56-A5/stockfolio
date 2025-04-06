import Navbar from '../components/layout/navbar'; // Adjust if needed

const Stocklet = () => {
  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-10">
        <div className="text-center text-white space-y-6 max-w-2xl">
          <h1 className="text-4xl font-bold text-green-400">Talk to Stocklet</h1>
          <p className="text-gray-400">
            Stocklet is your smart financial buddy who helps you learn investing, avoid scams, and get confident in the stock market.
          </p>
          <p className="text-sm text-gray-600">Start chatting below 👇</p>

          <div className="w-full max-w-md h-[600px] mx-auto rounded-xl overflow-hidden border border-gray-700 shadow-lg">
            <iframe
              src="https://cdn.botpress.cloud/webchat/v2.3/shareable.html?configUrl=https://files.bpcontent.cloud/2025/04/06/08/20250406082016-TDCKN89M.json"
              title="Stocklet Chatbot"
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                backgroundColor: 'transparent',
              }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stocklet;
