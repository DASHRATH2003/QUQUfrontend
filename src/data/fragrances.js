import regent1 from '../assets/regent1.jpeg';
import oxford from '../assets/oxfordblue.jpeg';
import midnight from '../assets/midnight.jpeg';
import nacture from '../assets/nacture.jpeg';
import middush from '../assets/Midashrush.jpeg';
import creamCloud from '../assets/creamcloud.png';
import velvetHeel from '../assets/velvet.png';
import cottonCandyKiss from '../assets/cotton.png';
import crushAmour from '../assets/crush.png';
import lumiereBelle from '../assets/lumiere.png';
import sugarOud from '../assets/sugarguid.png';
import parisianMuse from '../assets/parisian.png';

export const fragranceCollections = {
  mens: [
    {
      id: 'm1',
      name: 'Regent No.1',
      description: 'An iconic blend of fruits and smoky woods.',
      fullDescription: 'A bold yet refined scent that opens with juicy pineapple and crisp bergamot, softens with floral birch and rose, and settles into a smoky vanilla and musk base.',
      notes: {
        top: ['Pineapple', 'Bergamot', 'Apple'],
        heart: ['Birch', 'Jasmine', 'Rose'],
        base: ['Oakmoss', 'Vanilla', 'Musk']
      },
      family: 'Fruity Woody',
      vibe: ['Sophisticated', 'Powerful', 'Timeless'],
      image: regent1,
      price: 19.98,
      isBestseller: true,
      rating: 4.8,
      reviews: 256,
      color: 'Black'
    },
    {
      id: 'm2',
      name: 'Oxford Blue',
      description: 'Fresh citrus and spice with a modern edge.',
      fullDescription: 'Bright and invigorating at first whiff, this fragrance evolves into a warm, spicy heart and finishes with woody incense and soft patchouli.',
      notes: {
        top: ['Grapefruit', 'Lemon', 'Mint', 'Pink Pepper'],
        heart: ['Ginger', 'Jasmine', 'Nutmeg'],
        base: ['Incense', 'Cedar', 'Patchouli', 'Sandalwood']
      },
      family: 'Aromatic Woody',
      vibe: ['Clean', 'Confident', 'Refined'],
      image: oxford,
      price: 8.99,
      color: 'Oxford Blue'
    },
    {
      id: 'm3',
      name: 'Midnight Nomad',
      description: 'Crisp bergamot meets smoky woods.',
      fullDescription: 'This magnetic scent opens with a burst of citrus and pepper, leading into rugged earth tones and a modern musky finish.',
      notes: {
        top: ['Bergamot', 'Pepper'],
        heart: ['Lavender', 'Vetiver', 'Patchouli', 'Geranium'],
        base: ['Cedar', 'Ambroxan', 'Labdanum']
      },
      family: 'Aromatic Fresh',
      vibe: ['Adventurous', 'Rugged', 'Alluring'],
      image: midnight,
      price: 8.99,
      color: 'Midnight Blue'
    },
    {
      id: 'm4',
      name: 'Nocturne Elixir',
      description: 'Sweet vanilla and smoky warmth collide.',
      fullDescription: 'A deep, sensual fragrance that blends cool mint and lavender with a rich, sweet core of vanilla and honeyed tobacco.',
      notes: {
        top: ['Lavender', 'Mint'],
        heart: ['Vanilla', 'Benzoin'],
        base: ['Honey', 'Tobacco', 'Tonka Bean']
      },
      family: 'Oriental Sweet',
      vibe: ['Bold', 'Seductive', 'Addictive'],
      image: nacture,
      price: 9.99,
      color: 'Deep Purple'
    },
    {
      id: 'm5',
      name: 'Midas Rush',
      description: 'Energizing citrus, spices, and leather.',
      fullDescription: 'Explosive citrus and mint meet a spicy heart of cinnamon and rose, layered over a masculine base of leather and amber.',
      notes: {
        top: ['Blood Mandarin', 'Mint', 'Grapefruit'],
        heart: ['Cinnamon', 'Rose', 'Spices'],
        base: ['Amber', 'Leather', 'Patchouli', 'Woody Notes']
      },
      family: 'Spicy Leather',
      vibe: ['Daring', 'Energetic', 'Irresistible'],
      image: middush,
      price: 8.99,
      color: 'Gold'
    }
  ],
  womens: [
    {
      id: 'w1',
      name: 'Velvet Heel',
      description: 'Red berries, blooming rose, warm vanilla.',
      fullDescription: 'This modern floral scent opens with juicy litchi and red currant, centering around a lush rose and grounded in creamy vanilla and vetiver.',
      notes: {
        top: ['Litchi', 'Rose', 'Vetiver'],
        heart: ['Rose'],
        base: ['Vanilla', 'Vetiver']
      },
      family: 'Floral Fruity',
      vibe: ['Elegant', 'Playful', 'Bold'],
      image: velvetHeel,
      price: 7.99,
      rating: 4.6,
      reviews: 178,
      color: 'Ruby Red'
    },
    {
      id: 'w2',
      name: 'Crush Amour',
      description: 'A fruity floral explosion with passion fruit and jasmine.',
      fullDescription: 'A vibrant blend featuring passion fruit, jasmine, and musk for a romantic and enchanting experience.',
      notes: {
        top: ['Passion Fruit'],
        heart: ['Jasmine'],
        base: ['Musk']
      },
      family: 'Fruity Floral',
      vibe: ['Romantic', 'Fresh', 'Enchanting'],
      image: crushAmour,
      price: 7.99,
      rating: 4.7,
      reviews: 156,
      color: 'Pink'
    },
    {
      id: 'w3',
      name: 'Lumiere Belle',
      description: 'Elegant praline, vanilla, and iris blend.',
      fullDescription: 'A luminous, feminine scent blending elegant florals with sweet praline and warm vanilla for a lasting impression.',
      notes: {
        top: ['Praline'],
        heart: ['Vanilla'],
        base: ['Iris']
      },
      family: 'Floral Gourmand',
      vibe: ['Radiant', 'Romantic', 'Uplifting'],
      image: lumiereBelle,
      price: 8.99,
      rating: 4.8,
      reviews: 203,
      color: 'Pearl White'
    },
    {
      id: 'w4',
      name: 'Parisian Muse',
      description: 'Sophisticated bergamot, jasmine, and patchouli.',
      fullDescription: 'A chic Parisian-inspired fragrance combining fresh bergamot with elegant jasmine and grounding patchouli.',
      notes: {
        top: ['Bergamot'],
        heart: ['Jasmine'],
        base: ['Patchouli']
      },
      family: 'Chypre Floral',
      vibe: ['Chic', 'Sophisticated', 'Timeless'],
      image: parisianMuse,
      price: 8.99,
      isBestseller: true,
      rating: 4.9,
      reviews: 245,
      color: 'Rose Gold'
    }
  ],
  sugar: [
    {
      id: 's1',
      name: 'Sugar Oud',
      description: 'Sweet vanilla orchid and amber blend.',
      fullDescription: 'A luxurious combination of vanilla orchid, brown sugar, and amber for a warm, inviting scent.',
      notes: {
        top: ['Vanilla Orchid'],
        heart: ['Brown Sugar'],
        base: ['Amber']
      },
      family: 'Gourmand Amber',
      vibe: ['Sweet', 'Warm', 'Luxurious'],
      image: sugarOud,
      price: 7.99,
      rating: 4.7,
      reviews: 167,
      color: 'Caramel'
    },
    {
      id: 's2',
      name: 'Cream Cloud',
      description: 'Dreamy lavender and whipped cream delight.',
      fullDescription: 'A heavenly blend of lavender, whipped cream, and musk creating a dreamy, comforting aroma.',
      notes: {
        top: ['Lavender'],
        heart: ['Whipped Cream'],
        base: ['Musk']
      },
      family: 'Sweet Floral',
      vibe: ['Dreamy', 'Comforting', 'Soft'],
      image: creamCloud,
      price: 7.99,
      isBestseller: true,
      rating: 4.8,
      reviews: 189,
      color: 'Cream'
    },
    {
      id: 's3',
      name: 'Cotton Candy Kiss',
      description: 'Sweet bergamot and cotton candy fusion.',
      fullDescription: 'A playful mix of bergamot, cotton candy, and strawberry for a delightfully sweet experience.',
      notes: {
        top: ['Bergamot'],
        heart: ['Cotton Candy'],
        base: ['Strawberry']
      },
      family: 'Sweet Fruity',
      vibe: ['Playful', 'Sweet', 'Fun'],
      image: cottonCandyKiss,
      price: 7.99,
      rating: 4.6,
      reviews: 145,
      color: 'Cotton Candy Pink'
    }
  ]
};

// Helper function to get bestsellers
export const getBestsellers = () => {
  const allProducts = [
    ...fragranceCollections.mens,
    ...fragranceCollections.womens,
    ...fragranceCollections.sugar
  ];
  return allProducts.filter(product => product.isBestseller);
}; 