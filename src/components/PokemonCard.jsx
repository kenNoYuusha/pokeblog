import { useNavigate } from "react-router-dom";
import { PokemonTagType } from "./PokemonTagType";
export const PokemonCard = ({ pokemon: { img, id, name, type } }) => {
  const navigate = useNavigate();
  const showDetails = () => {
    navigate(`/pokemon/${name}`);
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <figure
        className="bg-slate-50 p-4 rounded-lg shadow-md will-change-transform
                       hover:animate-wiggle hover:cursor-pointer
                       dark:bg-slate-900"
        onClick={showDetails}
      >
        <img
          className="w-full h-full object-contain object-center"
          src={img}
          alt={name}
        />
      </figure>

      <div className="self-start">
        <div className="flex gap-x-2 font-bold text-slate-900 dark:text-slate-50">
          <h2 className="capitalize">
            {name}
          </h2>
          <p className="-order-1 select-none text-slate-600 dark:text-slate-400">{`#${id}`}</p>
        </div>
        <div className="flex gap-1 mt-2 text-sm">
          {type.map((item) => (
            <PokemonTagType key={item.type.name} type={item.type.name} />
          ))}
        </div>
      </div>
    </div>
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
