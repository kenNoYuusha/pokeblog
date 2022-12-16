export const PokemonTagType = ({ type }) => {
  switch (type) {
    case "grass":
      return (
        <p
          className="px-3 py-[1px] bg-grass font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "poison":
      return (
        <p
          className="px-3 py-[1px] bg-poison font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "fire":
      return (
        <p
          className="px-3 py-[1px] bg-fire font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "flying":
      return (
        <p
          className="px-3 py-[1px] bg-flying font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "water":
      return (
        <p
          className="px-3 py-[1px] bg-water font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "bug":
      return (
        <p
          className="px-3 py-[1px] bg-bug font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "normal":
      return (
        <p
          className="px-3 py-[1px] bg-normal font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "electric":
      return (
        <p
          className="px-3 py-[1px] bg-electric font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "ground":
      return (
        <p
          className="px-3 py-[1px] bg-ground font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "fairy":
      return (
        <p
          className="px-3 py-[1px] bg-fairy font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "fighting":
      return (
        <p
          className="px-3 py-[1px] bg-fighting font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "psychic":
      return (
        <p
          className="px-3 py-[1px] bg-psychic font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "rock":
      return (
        <p
          className="px-3 py-[1px] bg-rock font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "steel":
      return (
        <p
          className="px-3 py-[1px] bg-steel font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "ice":
      return (
        <p
          className="px-3 py-[1px] bg-ice font-bold 
                   text-black capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "ghost":
      return (
        <p
          className="px-3 py-[1px] bg-ghost font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "dragon":
      return (
        <p
          className="px-3 py-[1px] bg-dragon font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    case "dark":
      return (
        <p
          className="px-3 py-[1px] bg-dark font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
    default:
      return (
        <p
          className="px-3 py-[1px] bg-sky-700 font-bold 
                   text-white capitalize rounded-full shadow-sm"
        >
          {type}
        </p>
      );
  }
};
