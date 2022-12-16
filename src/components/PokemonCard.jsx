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
        <img className="object-contain object-center" src={img} alt={name} />
        <figcaption className="font-bold text-lg text-slate-900 dark:text-slate-50">{`#${id}`}</figcaption>
      </figure>

      <div className="self-start">
        <h3 className="text-xl font-bold text-slate-900 capitalize dark:text-slate-50">
          {name}
        </h3>
        <div className="flex gap-1 mt-2">
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
      <div className="w-full h-auto bg-zinc-500 p-4 rounded-lg animate-pulse">
        <div className="w-full aspect-square"></div>
        <p className="text-lg text-transparent">1</p>
      </div>
      {/* Description */}
      <div className="self-start">
        <h3 className="w-32 text-xl text-transparent bg-zinc-500 rounded-md animate-pulse">
          A
        </h3>

        <div className="flex gap-1 mt-2">
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
