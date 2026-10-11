export const categories = ['All', 'Meat', 'Vegetarian', 'Breakfast'];

export const dishes = [
  {
    id: 'doro-wat',
    name: 'Doro Wat',
    category: 'Meat',
    price: 18,
    tag: 'THE SUNDAY CLASSIC',
    description: 'Berbere-braised chicken, soft egg, and a slow-built sauce.',
    longDescription: 'Our signature chicken stew simmers low and slow with berbere, caramelized onions, niter kibbeh, and a little patience. Finished with a tender egg and served with soft injera for scooping every last bit.',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'kitfo',
    name: 'Kitfo',
    category: 'Meat',
    price: 21,
    tag: 'A BELOVED FAVORITE',
    description: 'Seasoned beef, mitmita, and warm clarified butter.',
    longDescription: 'A treasured Gurage dish of finely minced beef, warmed with mitmita and spiced clarified butter. We serve it with ayib and greens to bring a cool, bright balance to the gentle heat.',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'tibs',
    name: 'Awaze Tibs',
    category: 'Meat',
    price: 19,
    tag: 'SIZZLING FROM THE PAN',
    description: 'Tender beef, rosemary, peppers, and a little awaze heat.',
    longDescription: 'Tender pieces of beef are seared hot with rosemary, onions, and peppers, then tossed with our house awaze. Served sizzling, with the kind of aroma that calls everyone to the table.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'beyaynetu',
    name: 'Beyaynetu',
    category: 'Vegetarian',
    price: 16,
    tag: 'A LITTLE OF EVERYTHING',
    description: 'A generous spread of slow-simmered vegetarian stews.',
    longDescription: 'A colorful platter made for sharing: lentils, greens, chickpeas, and seasonal vegetables, each prepared with its own blend of warming spices and served together over fresh injera.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'shiro',
    name: 'Shiro Tegamino',
    category: 'Vegetarian',
    price: 14,
    tag: 'COMFORT IN A BOWL',
    description: 'Silky chickpea stew with garlic, ginger, and warm spices.',
    longDescription: 'A comforting, velvety chickpea stew whisked with garlic, ginger, and berbere, finished with a bright drizzle of olive oil. Naturally plant-based and especially good with injera.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85',
  },
  {
    id: 'firfir',
    name: 'Firfir',
    category: 'Breakfast',
    price: 12,
    tag: 'MORNING, THE ADDIS WAY',
    description: 'Torn injera tossed in a bright, gently spiced sauce.',
    longDescription: 'Soft pieces of injera soak up a lively tomato and berbere sauce, finished with fresh herbs. A satisfying start to the day, or a comforting plate any time you need one.',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85',
  },
];

export function findDish(id) {
  return dishes.find((dish) => dish.id === id);
}