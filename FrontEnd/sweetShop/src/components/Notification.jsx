
export default function Notification({ message, type }) {
  if (!message) return null;

  const baseStyle = "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-6 py-3 rounded-md text-white text-xl font-semibold shadow-lg z-50";

  const color = type === "success" ? "bg-green-500" : "bg-red-500";

  return (
    <div className={`${baseStyle} ${color} animate-fade`}>
      {message}
    </div>
  );
}
