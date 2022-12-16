export const PokemonError = ({ error: { name, message } }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{message}</p>
    </div>
  );
};
