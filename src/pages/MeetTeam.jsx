import React from 'react';

const MeetTeam = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: '/images/team/placeholder.jpg',
      bio: 'With over 15 years in the fragrance industry, Sarah brings her passion for unique scents to every product.'
    },
    {
      name: 'Michael Chen',
      role: 'Head Perfumer',
      image: '/images/team/placeholder.jpg',
      bio: 'A master perfumer with experience creating scents for luxury brands worldwide.'
    },
    {
      name: 'Emma Williams',
      role: 'Creative Director',
      image: '/images/team/placeholder.jpg',
      bio: 'Emma leads our creative vision and ensures each product tells a unique story.'
    },
    {
      name: 'David Miller',
      role: 'Product Development',
      image: '/images/team/placeholder.jpg',
      bio: 'Specializing in sustainable packaging and eco-friendly product development.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-50 to-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-4">
            Meet Our Team
          </h1>
          <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
            The passionate individuals behind our unique fragrances
          </p>
        </div>
      </div>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400?text=Team+Member';
                  }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-pink-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Our Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to using eco-friendly ingredients and sustainable packaging in all our products.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                Constantly exploring new scent combinations and pushing the boundaries of perfumery.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-600">
                Using only the finest ingredients to create long-lasting, memorable fragrances.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Join Our Team Section */}
      <div className="bg-pink-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals to join our growing team.
            Check out our current openings or send us your resume.
          </p>
          <button className="bg-black text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-pink-600 transition-colors duration-300">
            View Openings
          </button>
        </div>
      </div>
    </div>
  );
};

export default MeetTeam; 