import { Link } from "react-router-dom";

export default function SectionCard({ title, description, link, icon, backgroundImage }) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-lg w-72 mb-5
                 hover:scale-105 transition-all duration-300 
                 hover:shadow-[0_0_25px_#7B4019] group"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-300"></div>

      <div className="relative z-10 p-6 text-center flex flex-col items-center">
        <div className="text-4xl text-[#FFEEA9] mb-4">{icon}</div>
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-white mb-4">{description}</p>
        <Link
          to={link}
          className="inline-block bg-[#FFBF78] text-[#7B4019] px-4 py-2 rounded-xl font-semibold 
                    transition-transform transform hover:scale-110 
                    hover:shadow-lg"
        >
          Go to {title}
        </Link>
      </div>
    </div>
  );
}
