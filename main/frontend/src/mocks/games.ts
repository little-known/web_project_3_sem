import type { Game } from "../types/game";

export const mockGames: Game[] = [
  {
    id: "1",
    title: "Hollow Knight: Silksong",
    coverImage:
      "https://via.placeholder.com/400x600/8b5cf6/ffffff?text=Hollow+Knight",
    screenshots: [
      "https://via.placeholder.com/1920x1080/1f2937/ffffff?text=Screenshot+1",
      "https://via.placeholder.com/1920x1080/374151/ffffff?text=Screenshot+2",
      "https://via.placeholder.com/1920x1080/4b5563/ffffff?text=Screenshot+3",
      "https://via.placeholder.com/1920x1080/6b7280/ffffff?text=Screenshot+4",
    ],
    description:
      "Главная героиня — Хорнет — принцесса-защитница Халлоунеста, знакомая по первой игре. Её похищают и переносят в далёкое королевство Фарлум. Вместо мрачных подземелий — коралловые леса, покрытые мхом гроты и сияющие цитадели. Путь Хорнет лежит к вершине королевства, где скрываются древние тайны, связанные с её происхождением и прошлым. Помимо основной истории, игрокам предлагают побочные задания: охоту на редких существ, раскрытие древних загадок, поиски утраченных сокровищ и помощь жителям Фарлума.",
    platforms: ["PC", "PS", "Xbox"],
    genres: ["Метроидвание", "Платформер"],
    rating: 9.7,
    releaseDate: "xx.xx.2025",
    isFavorite: false,
  },
  {
    id: "2",
    title: "Elden Ring: Shadow of the Erdtree",
    coverImage:
      "https://via.placeholder.com/400x600/ef4444/ffffff?text=Elden+Ring",
    screenshots: [
      "https://via.placeholder.com/1920x1080/1f2937/ffffff?text=Screenshot+1",
      "https://via.placeholder.com/1920x1080/374151/ffffff?text=Screenshot+2",
    ],
    description:
      "Новое дополнение к культовой игре Elden Ring. Исследуйте новые земли, сражайтесь с могущественными боссами и раскройте тайны мира.",
    platforms: ["PC", "PS", "Xbox"],
    genres: ["Action", "RPG"],
    rating: 9.5,
    releaseDate: "xx.xx.2025",
    isFavorite: false,
  },
  {
    id: "3",
    title: "The Legend of Zelda: Echoes of Wisdom",
    coverImage: "https://via.placeholder.com/400x600/3b82f6/ffffff?text=Zelda",
    screenshots: [
      "https://via.placeholder.com/1920x1080/1f2937/ffffff?text=Screenshot+1",
    ],
    description:
      "Новая часть легендарной серии Zelda с уникальным геймплеем и захватывающим сюжетом.",
    platforms: ["PC"],
    genres: ["Action", "RPG"],
    rating: 9.3,
    releaseDate: "xx.xx.2025",
    isFavorite: false,
  },
  {
    id: "4",
    title: "Avowed",
    coverImage: "https://via.placeholder.com/400x600/10b981/ffffff?text=Avowed",
    screenshots: [
      "https://via.placeholder.com/1920x1080/1f2937/ffffff?text=Screenshot+1",
    ],
    description:
      "Фэнтезийный RPG от создателей Pillars of Eternity. Погрузитесь в мир магии и приключений.",
    platforms: ["PC", "Xbox"],
    genres: ["RPG"],
    rating: 8.9,
    releaseDate: "xx.xx.2025",
    isFavorite: false,
  },
  {
    id: "5",
    title: "Frostpunk 2",
    coverImage:
      "https://via.placeholder.com/400x600/06b6d4/ffffff?text=Frostpunk",
    screenshots: [
      "https://via.placeholder.com/1920x1080/1f2937/ffffff?text=Screenshot+1",
    ],
    description:
      "Продолжение популярной стратегии о выживании в постапокалиптическом мире.",
    platforms: ["PC", "PS", "Xbox"],
    genres: ["Strategy"],
    rating: 8.7,
    releaseDate: "xx.xx.2025",
    isFavorite: false,
  },
  {
    id: "6",
    title: "Metroid Prime 4",
    coverImage:
      "https://via.placeholder.com/400x600/f59e0b/ffffff?text=Metroid",
    screenshots: [
      "https://via.placeholder.com/1920x1080/1f2937/ffffff?text=Screenshot+1",
    ],
    description:
      "Долгожданное продолжение серии Metroid Prime. Исследуйте космос и сражайтесь с инопланетными формами жизни.",
    platforms: ["PC", "PS"],
    genres: ["Метроидвание", "Action"],
    rating: 9.1,
    releaseDate: "xx.xx.2025",
    isFavorite: false,
  },
];
