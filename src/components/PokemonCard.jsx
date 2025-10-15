import { Link } from "react-router-dom";
import { PokemonTagType } from "./PokemonTagType";
import { useState } from "react";

export const PokemonCard = ({ pokemon: { img, id, name, type } }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setTimeout(() => {
      setIsImageLoaded(true)
    }, 300);
  };

  return (
    <Link
      to={`/pokedex/${name}`}
      className={`flex flex-col items-center group will-change-transform transition-all duration-500 ${isImageLoaded ? "opacity-100 translate-x-0": "opacity-0 -translate-x-4"}`}
    >
      <figure
        className="bg-slate-50 p-6 rounded-lg shadow-md dark:bg-zinc-900 group"
      >
        <img
          className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-110"
          src={img}
          alt={name}
          onLoad={handleImageLoad}
        />
      </figure>

      <div className="self-start">
        <div className="flex gap-x-2 font-bold text-slate-900 dark:text-slate-50">
          <h2 className="capitalize">{name}</h2>
          <p className="-order-1 select-none text-slate-600 dark:text-slate-400">{`#${id}`}</p>
        </div>
        <div className="flex gap-1 mt-2 text-sm">
          {type.map((item) => (
            <PokemonTagType key={item.type.name} type={item.type.name} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export const PokemonCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Image */}
      <div className="w-full bg-zinc-500 p-4 rounded-lg animate-pulse">
        <div className="w-full aspect-square"></div>
        {/* <p className="text-lg text-transparent">1</p> */}
      </div>
      {/* Description */}
      <div className="self-start">
        <h2 className="w-32 text-transparent bg-zinc-500 rounded-md animate-pulse">
          A
        </h2>

        <div className="flex gap-1 mt-2 text-sm">
          <p className="px-10 py-[1px] text-transparent bg-zinc-500 rounded-md animate-pulse">
            B
          </p>
          <p className="px-10 py-[1px] text-transparent bg-zinc-500 rounded-md animate-pulse">
            C
          </p>
        </div>
      </div>
    </div>
  );
};