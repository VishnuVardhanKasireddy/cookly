
import { Link } from "react-router-dom";
import {
  Carrot,
  SlidersHorizontal,
  ChefHat,
  Refrigerator,
  Sparkles,
  Settings2,
  Heart,
  Clock3,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Add your ingredients",
    description:
      "Enter the ingredients you already have in your kitchen.",
    icon: Carrot,
  },
  {
    number: "02",
    title: "Choose your preferences",
    description:
      "Select your preferred cuisine, servings, and cooking difficulty.",
    icon: SlidersHorizontal,
  },
  {
    number: "03",
    title: "Discover your recipe",
    description:
      "Let Cookly generate a delicious recipe tailored to your choices.",
    icon: ChefHat,
  },
];

const recipes = [
  {
    name: "Fresh Vegetable Salad",
    description: "A refreshing and healthy combination of fresh vegetables.",
    time: "15 min",
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=85",
  },
  {
    name: "Creamy Pasta",
    description: "A comforting pasta dish with a rich and creamy sauce.",
    time: "25 min",
    difficulty: "Medium",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=700&q=85",
  },
  {
    name: "Healthy Buddha Bowl",
    description: "A colorful bowl packed with nutritious ingredients.",
    time: "20 min",
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=700&q=85",
  },
];

const benefits = [
  {
    title: "Use what you have",
    description:
      "Make delicious meals without needing to buy a whole new set of ingredients.",
    icon: Refrigerator,
  },
  {
    title: "Discover new recipes",
    description:
      "Explore different dishes and find inspiration for your everyday cooking.",
    icon: Sparkles,
  },
  {
    title: "Make it your own",
    description:
      "Customize your recipes based on cuisine, servings, and difficulty.",
    icon: Settings2,
  },
  {
    title: "Save your favourites",
    description:
      "Keep your favourite recipes together and access them whenever you need.",
    icon: Heart,
  },
];

function HomePage() {
  return (
    <div className="overflow-hidden">

      {/* 1. Hero Section */}
      <section className="px-4 pt-16 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">

          <h1 className="mx-auto max-w-4xl font-serif text-4xl leading-[1.15] tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Good food starts with
            <br className="hidden sm:block" />
            <span className="text-green-800">
              {" "}what you already have.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
            Discover delicious recipes from the ingredients in your kitchen.
            Let Cookly turn everyday ingredients into something extraordinary.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="rounded-lg bg-green-800 px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-900"
            >
              Get Started →
            </Link>

            <Link
              to="/login"
              className="rounded-lg border border-gray-300 bg-white px-7 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              I already have an account
            </Link>
          </div>

          <div className="relative mx-auto mt-12 max-w-6xl sm:mt-16">
            <div className="absolute inset-x-10 -top-6 h-32 rounded-full bg-green-100/60 blur-3xl" />

            <img
              src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1800&q=90"
              alt="A colorful spread of freshly prepared food"
              className="relative h-[260px] w-full rounded-t-2xl object-cover shadow-xl sm:h-[360px] lg:h-[440px]"
            />
          </div>
        </div>
      </section>

      {/* 2. How Cookly Works */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-green-800">
              Simple process
            </span>

            <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
              How Cookly works
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              From ingredients to a delicious meal, all it takes is three
              simple steps.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50">
                      <Icon
                        size={28}
                        strokeWidth={1.7}
                        className="text-green-800"
                      />
                    </div>

                    <span className="text-sm font-bold tracking-wider text-green-800">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-bold text-gray-900">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. Recipe Showcase */}
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-green-800">
                Get inspired
              </span>

              <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Something delicious awaits
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
                Here are just a few ideas of what you can create with Cookly.
              </p>
            </div>

            <Link
              to="/ingredients"
              className="text-sm font-semibold text-green-800 transition hover:text-green-900"
            >
              Create your own recipe →
            </Link>
          </div>

          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <article
                key={recipe.name}
                className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  loading="lazy"
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900">
                    {recipe.name}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {recipe.description}
                  </p>

                  <div className="mt-5 flex items-center gap-4 text-xs font-medium text-gray-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 size={14} strokeWidth={1.8} />
                      {recipe.time}
                    </span>

                    <span>•</span>
                    <span>{recipe.difficulty}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Why Cookly */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-green-800">
              Why Cookly?
            </span>

            <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
              Make everyday cooking easier
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
              Less time wondering what to cook. More time enjoying what you make.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div key={benefit.title}>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50">
                    <Icon
                      size={24}
                      strokeWidth={1.7}
                      className="text-green-800"
                    />
                  </div>

                  <h3 className="mt-5 font-bold text-gray-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. Final Call to Action */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-green-900 px-6 py-14 text-center sm:px-12 sm:py-20">

          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Your next favourite meal starts here.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-green-100 sm:text-base">
            Open your kitchen, bring your ingredients, and let Cookly
            inspire your next delicious creation.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex rounded-lg bg-white px-7 py-3.5 text-sm font-bold text-green-900 transition hover:bg-green-50"
          >
            Get Started →
          </Link>

        </div>
      </section>

    </div>
  );
}

export default HomePage;
