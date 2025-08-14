
import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-trace-forest text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Image
            src="/trace-wordmark.png"
            alt="Trace"
            width={80}
            height={27}
            className="h-7 w-auto filter brightness-0 invert"
          />
          <span className="ml-4 text-sm">&copy; {new Date().getFullYear()} Trace. All rights reserved.</span>
        </div>
        <nav className="flex space-x-6">
          <Link href="/privacy-policy" className="text-sm hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-sm hover:underline">
            Terms of Service
          </Link>
          <Link href="/contact" className="text-sm hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}
