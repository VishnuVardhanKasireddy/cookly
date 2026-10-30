import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8F9F7] text-gray-900">
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;