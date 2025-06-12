'use client';

export const Loader = () => {
  return (
    <div className="w-full flex items-center justify-center h-screen bg-[#171717]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid" />
    </div>
  );
};

export default Loader;
