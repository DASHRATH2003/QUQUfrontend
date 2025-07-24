import React from 'react';
import { Link } from 'react-router-dom';

const PerfumeGuide = () => {
  const perfumeNotes = [
    {
      type: 'Top Notes',
      description: 'The first impression of a fragrance that lasts 5-15 minutes',
      examples: ['Citrus', 'Herbs', 'Light Fruits', 'Fresh Spices'],
      icon: '🍊'
    },
    {
      type: 'Heart Notes',
      description: 'The main character of the fragrance that lasts 2-4 hours',
      examples: ['Floral', 'Spicy', 'Fruity', 'Green'],
      icon: '🌸'
    },
    {
      type: 'Base Notes',
      description: 'The foundation that lasts 5-10 hours',
      examples: ['Woody', 'Musky', 'Vanilla', 'Amber'],
      icon: '🌳'
    }
  ];

  const fragranceFamilies = [
    {
      name: 'Floral',
      description: 'Romantic and feminine scents based on flowers',
      examples: ['Rose', 'Jasmine', 'Lily', 'Peony'],
      suitableFor: 'Perfect for daytime wear and romantic occasions'
    },
    {
      name: 'Oriental',
      description: 'Warm and sensual scents with exotic spices',
      examples: ['Vanilla', 'Amber', 'Musk', 'Incense'],
      suitableFor: 'Ideal for evening wear and special occasions'
    },
    {
      name: 'Woody',
      description: 'Rich and sophisticated scents from trees and wood',
      examples: ['Sandalwood', 'Cedar', 'Vetiver', 'Patchouli'],
      suitableFor: 'Great for professional settings and formal events'
    },
    {
      name: 'Fresh',
      description: 'Clean and energizing scents inspired by nature',
      examples: ['Citrus', 'Marine', 'Green', 'Aquatic'],
      suitableFor: 'Perfect for summer and casual everyday wear'
    }
  ];

  const applicationTips = [
    {
      title: 'Pulse Points',
      tip: 'Apply to wrists, neck, behind ears, and inner elbows',
      reason: 'These warm areas help diffuse the scent throughout the day'
    },
    {
      title: 'Distance',
      tip: 'Hold bottle 6 inches away and spray 2-3 times',
      reason: 'Ensures even distribution without overwhelming'
    },
    {
      title: 'Layering',
      tip: 'Use matching shower gel and body lotion before perfume',
      reason: 'Creates a longer-lasting fragrance experience'
    },
    {
      title: 'Timing',
      tip: 'Apply after shower on slightly damp skin',
      reason: 'Helps lock in the fragrance for better longevity'
    }
  ];

  const storageAdvice = [
    {
      title: 'Temperature',
      advice: 'Store in a cool, dry place away from direct sunlight',
      why: 'Heat and light can break down the fragrance molecules'
    },
    {
      title: 'Container',
      advice: 'Keep in original bottle with cap tightly sealed',
      why: 'Prevents oxidation and maintains scent integrity'
    },
    {
      title: 'Location',
      advice: 'Avoid bathroom storage due to humidity',
      why: 'Moisture can alter the fragrance composition'
    },
    {
      title: 'Duration',
      advice: 'Best used within 3-5 years of opening',
      why: 'Fragrances can change over time'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          The Art of Perfume
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Discover the enchanting world of fragrances, from understanding notes and families 
          to mastering the perfect application technique.
        </p>
      </div>

      {/* Perfume Notes Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Understanding Perfume Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {perfumeNotes.map((note) => (
            <div key={note.type} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{note.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{note.type}</h3>
              <p className="text-gray-600 mb-4">{note.description}</p>
              <div className="flex flex-wrap gap-2">
                {note.examples.map((example) => (
                  <span key={example} className="bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full">
                    {example}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fragrance Families Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Fragrance Families</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {fragranceFamilies.map((family) => (
            <div key={family.name} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{family.name}</h3>
              <p className="text-gray-600 mb-4">{family.description}</p>
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-2">Common Notes:</h4>
                <div className="flex flex-wrap gap-2">
                  {family.examples.map((example) => (
                    <span key={example} className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full">
                      {example}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500 italic">{family.suitableFor}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Application Tips Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Perfect Application</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {applicationTips.map((tip) => (
            <div key={tip.title} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{tip.title}</h3>
              <p className="text-gray-600 mb-2">{tip.tip}</p>
              <p className="text-sm text-gray-500 italic">{tip.reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Storage Advice Section */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Proper Storage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {storageAdvice.map((advice) => (
            <div key={advice.title} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{advice.title}</h3>
              <p className="text-gray-600 mb-2">{advice.advice}</p>
              <p className="text-sm text-gray-500 italic">{advice.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center bg-pink-50 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Ready to Find Your Signature Scent?
        </h2>
        <p className="text-gray-600 mb-6">
          Explore our collection of carefully curated fragrances and discover the perfect match for you.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-pink-600 transition-colors duration-300"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default PerfumeGuide; 