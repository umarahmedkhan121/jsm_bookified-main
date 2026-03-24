import Navbar from "@/components/Navbar";
import { CheckoutButton } from "@clerk/nextjs";

export default function SubscriptionsPage() {
  return (
    <main className="min-h-screen bg-[#fdfbf7]">
      <Navbar />
      <div className="pt-28 wrapper max-w-5xl pb-12 text-center">
        <h1 className="text-4xl font-bold font-serif mb-4">Upgrade Your Plan</h1>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          Choose the perfect plan to unlock more books, longer voice sessions, and premium AI reading features.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 text-left">
           {/* Free Tier */}
           <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
             <h3 className="font-bold text-2xl mb-2">Free</h3>
             <p className="text-4xl font-bold mb-6">$0<span className="text-base text-gray-500 font-normal">/mo</span></p>
             <ul className="space-y-4 mb-8 text-gray-600 font-medium">
               <li>✓ 1 Book Upload</li>
               <li>✓ 5 Voice Sessions / month</li>
               <li>✓ 5 Min per Session</li>
             </ul>
             <button className="w-full py-3 bg-gray-100 rounded-lg font-semibold text-gray-500 cursor-not-allowed">
               Current Plan
             </button>
           </div>

           {/* Standard Tier */}
           <div className="p-8 bg-black text-white border-black border rounded-2xl shadow-xl relative transform md:-translate-y-4">
             <span className="absolute top-0 right-8 -translate-y-1/2 bg-yellow-400 text-black text-xs font-extrabold px-4 py-1.5 rounded-full tracking-wide">
               POPULAR
             </span>
             <h3 className="font-bold text-2xl mb-2">Standard</h3>
             <p className="text-4xl font-bold mb-6">$9.99<span className="text-base text-gray-400 font-normal">/mo</span></p>
             <ul className="space-y-4 mb-8 text-gray-300 font-medium">
               <li>✓ 10 Book Uploads</li>
               <li>✓ 100 Voice Sessions / month</li>
               <li>✓ 15 Min per Session</li>
             </ul>
             
             {/* MAGIC CLERK BUTTON: Standard */}
             <CheckoutButton planId="standard">
               <button className="w-full py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-100 transition shadow-sm">
                 Upgrade to Standard
               </button>
             </CheckoutButton>
           </div>

           {/* Pro Tier */}
           <div className="p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
             <h3 className="font-bold text-2xl mb-2">Pro</h3>
             <p className="text-4xl font-bold mb-6">$19.99<span className="text-base text-gray-500 font-normal">/mo</span></p>
             <ul className="space-y-4 mb-8 text-gray-600 font-medium">
               <li>✓ 100 Book Uploads</li>
               <li>✓ Unlimited Sessions</li>
               <li>✓ 60 Min per Session</li>
               <li>✓ Priority Support</li>
             </ul>

             {/* MAGIC CLERK BUTTON: Pro */}
             <CheckoutButton planId="pro">
               <button className="w-full py-3 bg-black text-white rounded-lg font-bold hover:bg-gray-800 transition shadow-sm">
                 Upgrade to Pro
               </button>
             </CheckoutButton>
           </div>
        </div>
      </div>
    </main>
  );
}