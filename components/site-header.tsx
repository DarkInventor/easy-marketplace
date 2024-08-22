import React from "react";
import { ShoppingCartIcon, MenuIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SiteHeaderProps {
  setCurrentPage: (page: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  totalItems: number;
  scrollToSection: (ref: React.RefObject<HTMLDivElement>) => void;
  categoriesRef: React.RefObject<HTMLDivElement>;
  dealsRef: React.RefObject<HTMLDivElement>;
  aboutRef: React.RefObject<HTMLDivElement>;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({
  setCurrentPage,
  isMenuOpen,
  setIsMenuOpen,
  totalItems,
  scrollToSection,
  categoriesRef,
  dealsRef,
  aboutRef,
}) => {
  return (
    <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <a
            className="mr-6 flex items-center space-x-2"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage("landing");
            }}
          >
            <ShoppingCartIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">ShopEase</span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage("products");
              }}
            >
              Products
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(categoriesRef);
              }}
            >
              Categories
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(dealsRef);
              }}
            >
              Deals
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(aboutRef);
              }}
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
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage("products");
                    setIsMenuOpen(false);
                  }}
                >
                  Products
                </a>
                <a
                  className="text-sm font-medium text-primary"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(categoriesRef);
                    setIsMenuOpen(false);
                  }}
                >
                  Categories
                </a>
                <a
                  className="text-sm font-medium text-primary"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(dealsRef);
                    setIsMenuOpen(false);
                  }}
                >
                  Deals
                </a>
                <a
                  className="text-sm font-medium text-primary"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(aboutRef);
                    setIsMenuOpen(false);
                  }}
                >
                  About
                </a>
              </div>
              <button
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                onClick={() => setIsMenuOpen(false)}
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Button
              variant="outline"
              size="icon"
              className="relative"
              onClick={() => {
                /* Handle cart opening logic here */
              }}
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
  );
};

export default SiteHeader;
