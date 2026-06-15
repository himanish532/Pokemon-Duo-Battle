export type ElementType = 'Fire' | 'Water' | 'Ground' | 'Electric' | 'Ghost';

export interface Pokemon {
  name: string;
  pokedexId: number;
  imageUrl: string;
}

export const ELEMENT_TYPES: ElementType[] = ['Fire', 'Water', 'Ground', 'Electric', 'Ghost'];

export const POKEMON_DATABASE: Record<ElementType, Pokemon[]> = {
  Fire: [
    { name: 'Charizard', pokedexId: 6, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png' },
    { name: 'Moltres', pokedexId: 146, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/146.png' },
    { name: 'Magmar', pokedexId: 126, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/126.png' },
  ],
  Water: [
    { name: 'Blastoise', pokedexId: 9, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png' },
    { name: 'Gyarados', pokedexId: 130, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/130.png' },
    { name: 'Articuno', pokedexId: 144, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/144.png' },
  ],
  Electric: [
    { name: 'Zapdos', pokedexId: 145, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/145.png' },
    { name: 'Electabuzz', pokedexId: 125, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/125.png' },
    { name: 'Jolteon', pokedexId: 135, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png' },
  ],
  Ground: [
    { name: 'Venusaur', pokedexId: 3, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png' },
    { name: 'Bayleef', pokedexId: 153, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/153.png' },
    { name: 'Sceptile', pokedexId: 254, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/254.png' },
  ],
  Ghost: [
    { name: 'Gengar', pokedexId: 94, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/94.png' },
    { name: 'Gastly', pokedexId: 92, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/92.png' },
    { name: 'Haunter', pokedexId: 93, imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/93.png' },
  ],
};

// Matchups rules: key beats the list of values
export const MATCHUPS: Record<ElementType, ElementType[]> = {
  Fire: ['Ground', 'Electric'],
  Water: ['Fire', 'Ground'],
  Electric: ['Water', 'Ghost'],
  Ground: ['Electric', 'Ghost'],
  Ghost: ['Water', 'Fire'],
};

export interface GameRound {
  userType: ElementType;
  userPokemon: Pokemon;
  systemType: ElementType;
  systemPokemon: Pokemon;
  winner: 'user' | 'system' | 'tie';
}
