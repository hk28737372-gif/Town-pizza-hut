export default function About() {
  return (
    <div className="bg-cream min-h-screen pb-20">
      <div className="bg-ink text-white py-16 text-center shadow-inner">
        <h1 className="text-5xl font-serif font-bold mb-4 text-accent">About Us</h1>
        <p className="opacity-80 max-w-xl mx-auto">The Name of Quality - Discover the story behind Town Pizza-Hut.</p>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 mb-12">
          <h2 className="text-3xl font-serif font-bold text-primary mb-6">Our Story</h2>
          <div className="prose prose-lg text-gray-600">
            <p className="mb-4">
              Welcome to <strong>Town Pizza-Hut</strong>, a family restaurant dedicated to serving the finest fast food in Swat. We believe in quality, freshness, and bringing families together over delicious meals.
            </p>
            <p className="mb-4">
              What started as a single branch at Township Chowk has now expanded to multiple locations including Sersanai Chowk and our newest addition at Khwaza Khela Chowk. Our growth is a testament to the love and trust our customers have placed in our "Name of Quality".
            </p>
            <p>
              Whether you are craving a crispy Zinger Burger, a perfectly baked Town Signature Pizza, or some spicy BBQ wings, we guarantee an experience that satisfies. We also offer elegant birthday halls to make your special moments memorable.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-accent/10 rounded-3xl p-8 border border-accent/20">
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">Our Vision</h3>
            <p className="text-gray-700">
              To be the most loved family restaurant in the region, recognized for uncompromising quality, exceptional taste, and a welcoming environment for families.
            </p>
          </div>
          <div className="bg-primary/5 rounded-3xl p-8 border border-primary/10">
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">Our Values</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Quality Ingredients First</li>
              <li>Customer Satisfaction</li>
              <li>Hygiene & Cleanliness</li>
              <li>Fast & Reliable Delivery</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
