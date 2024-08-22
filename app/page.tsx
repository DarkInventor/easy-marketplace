"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  ShoppingCartIcon,
  MenuIcon,
  XIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { ArrowRight, ShoppingBag } from "lucide-react";
import CompanyLogoSection from "@/components/company-logo";
import DealsSection from "@/components/deals-section";
import CategorySection from "@/components/category-section";
import TestimonialSection from "@/components/testimonial-section";
import FeaturesSection from "@/components/features-section";
import CTASignUpSection from "@/components/cta-section";
import SiteFooter from "@/components/site-footer";
import ProductPage from "@/components/product-section";

const products = [
  {
    id: 1,
    name: "Project Management Pro",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    name: "Code Editor Deluxe",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    name: "Database Manager Ultimate",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    name: "Cloud Storage Solution",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    name: "Secure VPN Service",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    name: "AI-Powered Analytics",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
];

const categories = [
  { name: "Marketing Tools", icon: "📈" },
  { name: "Design Software", icon: "🎨" },
  { name: "AI Solutions", icon: "🤖" },
  { name: "Project Management", icon: "📅" },
  { name: "Communication Tools", icon: "💬" },
  { name: "Analytics Platforms", icon: "📊" },
];

const deals = [
  {
    id: 7,
    name: "AI Assistant Pro",
    price: 79.99,
    originalPrice: 129.99,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tag: "New Product",
  },
  {
    id: 8,
    name: "Cloud Sync Ultimate",
    price: 49.99,
    originalPrice: 89.99,
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tag: "Deal of the Day",
  },
  {
    id: 9,
    name: "Marketing Automation Suite",
    price: 159.99,
    originalPrice: 249.99,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tag: "Monthly Special",
  },
  {
    id: 10,
    name: "Collaboration Platform",
    price: 29.99,
    originalPrice: 59.99,
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    tag: "New Deal",
  },
];

export default function ECommerceApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("landing");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // @ts-ignore
  const addToCart = (product) => {
    // @ts-ignore
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      // @ts-ignore
      setCart(
        // @ts-ignore
        cart.map((item) =>
          // @ts-ignore
          item.id === product.id
            ? // @ts-ignore
              { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // @ts-ignore
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // @ts-ignore
  const removeFromCart = (productId) => {
    // @ts-ignore
    setCart(cart.filter((item) => item.id !== productId));
  };

  // @ts-ignore
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      // @ts-ignore
      removeFromCart(productId);
    } else {
      // @ts-ignore
      setCart(
        // @ts-ignore
        cart.map((item) =>
          // @ts-ignore
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // @ts-ignore
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  // @ts-ignore
  const totalPrice = cart.reduce(
    // @ts-ignore
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const renderHeader = () => (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a
            className="mr-6 flex items-center space-x-2"
            href="#"
            onClick={() => setCurrentPage("landing")}
          >
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">ShopEase</span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="#"
              onClick={() => setCurrentPage("products")}
            >
              Products
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/#categories-section"
            >
              Categories
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="#"
            >
              Deals
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/about"
            >
              About
            </a>
          </nav>
        </div>
        <button
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isMenuOpen}
          aria-controls="radix-:R1mcq:"
          data-state={isMenuOpen ? "open" : "closed"}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </button>
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm md:hidden">
            <div className="fixed left-0 top-0 bottom-0 w-full max-w-xs p-6 bg-background shadow-lg">
              <div className="flex flex-col space-y-4">
                <a
                  className="text-sm font-medium text-primary"
                  href="#"
                  onClick={() => {
                    setCurrentPage("products");
                    setIsMenuOpen(false);
                  }}
                >
                  Products
                </a>
                <a
                  className="text-sm font-medium text-primary"
                  href="/#categories-section"
                >
                  Categories
                </a>
                <a
                  className="text-sm font-medium text-primary"
                  href="#"
                >
                  Deals
                </a>
                <a
                  className="text-sm font-medium text-primary"
                  href="/#about"
                >
                  About
                </a>
              </div>
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <Button
              variant="ghost"
              className="mr-6 text-base hover:bg-transparent focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="sr-only">Home</span>
            </Button>
          </nav>
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div>
              <Button
                variant="outline"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCartIcon className="h-4 w-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLandingPage = () => (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-28 xl:py-28 bg-white dark:bg-black overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_700px] items-center">
            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none text-black dark:text-white">
                Shop with Ease, Anytime, Anywhere
              </h1>
              <p className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl mx-auto lg:mx-0">
                Discover a world of products at your fingertips. From fashion to
                electronics, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  className="inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black shadow transition-colors hover:bg-gray-800 dark:hover:bg-gray-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400"
                  onClick={() => setCurrentPage("products")}
                >
                  Shop Now
                  <ShoppingBag className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="inline-flex items-center justify-center border-black text-black dark:border-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="relative mx-auto lg:order-last">
              {/* Animated background */}
              <div className="absolute -inset-4 rounded-xl opacity-50 blur-2xl" />
              <img
                alt="Hero"
                className="relative z-10 w-full h-[auto] max-w-[700px] aspect-[4/3] object-cover object-center"
                height="750"
                src="/easy-transparent3.png"
                width="700"
              />

              {/* Floating elements */}
              <div className="absolute -top-4 -left-4 w-6 h-6 bg-black dark:bg-white rounded-full" />
              <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-black dark:bg-white rounded-full" />

              {/* Animated lines */}
              <div
                className="absolute inset-0 z-0" // Set z-index behind the image
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1), rgba(0,0,0,0.05) 70%, transparent 70%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <CompanyLogoSection />
      <DealsSection deals={deals} addToCart={addToCart} />

      <CategorySection categories={categories} />

      <TestimonialSection />

      <FeaturesSection />

      <CTASignUpSection />
    </main>
  );

  const renderCart = () => (
    <>
      {isCartOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-background shadow-lg p-6 overflow-y-auto z-50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCartOpen(false)}
              >
                <XIcon className="h-6 w-6" />
              </Button>
            </div>
            {cart.length === 0 ? (
              <p className="text-muted-foreground">Your cart is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    // @ts-ignore
                    key={item.id}
                    className="flex items-center justify-between mb-4"
                  >
                    <div className="flex items-center">
                      <img
                        // @ts-ignore
                        src={item.image}
                        // @ts-ignore
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                      <div>
                        {/* @ts-ignore */}
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {/* @ts-ignore */}
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          //@ts-ignore
                          updateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      {/* @ts-ignore */}
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          //@ts-ignore
                          updateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-2"
                        //@ts-ignore
                        onClick={() => removeFromCart(item.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="mt-6 border-t pt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <Button className="w-full">Proceed to Checkout</Button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );

  return (
    <div className="flex flex-col min-h-screen">
      {renderHeader()}
      {currentPage === "landing" ? (
        renderLandingPage()
      ) : (
        <ProductPage products={products} addToCart={addToCart} />
      )}
      {renderCart()}
      <SiteFooter />
    </div>
  );
}
